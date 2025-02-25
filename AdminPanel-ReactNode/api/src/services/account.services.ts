import * as db from "../models/index";
import { ErrorResponse } from "../common/response.model";
import { sendMail } from "../utils/mailSender";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import fs from "fs";
import path from "path";

const User = db.User;
const jwtSecret: string = process.env.jwt_secret || "secret";
const resetPasswordSecret = process.env.reset_password_secret || "reset secret";

export const login = async (reqBody: LoginBody) => {
  const { email, password } = reqBody;
  const user = await User.findOne({
    where: { email: email },
    include: { model: db.Role, as: "role", attributes: ["name"] },
  });
  if (!user) {
    throw new ErrorResponse(404, "Email not found");
  }
  //check user active or not
  if (user.dataValues.status !== "Active") {
    throw new ErrorResponse(401, "User account deactivated");
  }
  const matched = await bcrypt.compare(password, user.dataValues.password);
  const permissionsData = await db.Role.findByPk(user.dataValues.roleId, {
    include: {
      model: db.Permission,
      as: "permissions",
      attributes: ["id"],
      through: { attributes: [] }, // Exclude the association fields
    },
    attributes: [],
  });
  if (!matched) {
    throw new ErrorResponse(401, "Incorrect password");
  }
  const encryptionData: {
    userId: number;
    roleId: number;
    username: string;
    permissions: number[];
  } = {
    userId: user.dataValues.id,
    roleId: user.dataValues.roleId,
    username: user.dataValues.firstName + " " + user.dataValues.lastName,
    permissions: permissionsData?.dataValues.permissions.map(
      (ele: any) => ele.id
    ),
  };
  const token = jwt.sign(encryptionData, jwtSecret, {
    expiresIn: "24h",
  });

  return {
    token: token,
    user: {
      username: user.dataValues.firstName + " " + user.dataValues.lastName,
      role: user.dataValues.role.dataValues.name,
      userId: user.dataValues.id,
    },
  };
};
export const forgotPassword = async (bodyData: ForgotPasswordBody) => {
  const { email } = bodyData;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    throw new ErrorResponse(404, "This email is not registered");
  }
  const encryptionData: any = {
    userId: user.dataValues.id,
  };
  const token = jwt.sign(encryptionData, resetPasswordSecret, {
    expiresIn: "30m",
  });
  const resetPasswordLink = `${process.env.client_url}${process.env.reset_password_path}/${token}`;
  //send mail logic
  const template = await db.EmailTemplate.findOne({
    where: { key: "ForgotPasswordMail" },
  });
  let mailOptions = {
    to: email,
    subject: "Reset Password",
    from: "Admin Panel <rakeshs.evince@gmail.com>",
    html: `<h1>Reset password</h1>
        <p>${process.env.client_url}${process.env.reset_password_path}/${token}</p>
        `,
  };
  if (template) {
    mailOptions = {
      to: email,
      subject: template.dataValues.subject,
      from: `${template.dataValues.fromName} <${template.dataValues.fromEmail}>`,
      html: template.dataValues.body
        .replace("##RESETLINK##", resetPasswordLink)
        .replace("##SITEURL##", process.env.client_url + "/"),
    };
  }
  await sendMail(mailOptions);
  return null;
};
export const resetPassword = async (
  bodyData: ResetPasswordBody,
  token: string
) => {
  const decoded: any = jwt.verify(token, resetPasswordSecret);
  const encryptPassword = bcrypt.hashSync(bodyData.password, 10);
  const updatedProfileData = await db.User.update(
    { password: encryptPassword },
    { where: { id: decoded.userId } }
  );
  if (!updatedProfileData) {
    throw new ErrorResponse(400, "Invalid request");
  }
};
export const changePassword = async (
  userId: number,
  bodyData: ChangePasswordBody
) => {
  const profileData = await User.findOne({ where: { id: userId } });
  if (!profileData) {
    throw new ErrorResponse(400, "Invalid request");
  }
  const matched = await bcrypt.compare(
    bodyData.oldPassword,
    profileData.dataValues.password
  );
  if (!matched) {
    throw new ErrorResponse(400, "Incorrect old password");
  }
  const encryptPassword = await bcrypt.hash(bodyData.newPassword, 10);
  const updatedProfileData = await User.update(
    { password: encryptPassword },
    { where: { id: userId }, individualHooks: true }
  );
  if (!updatedProfileData) {
    throw new ErrorResponse(500, "Unable to update password");
  }
};
export const getProfile = async (userId: number) => {
  const profileData = await User.findOne({
    where: { id: userId },
    attributes: ["firstName", "lastName", "email", "profileImage"],
  });
  if (!profileData) {
    throw new ErrorResponse(400, "Invalid request");
  }
  return profileData.dataValues;
};
export const updateProfile = async (
  userId: number,
  bodyData: UpdateProfileBody
) => {
  if (bodyData.profileImage) {
    const oldImage = (
      await User.findOne({
        where: { id: userId },
        attributes: ["profileImage"],
      })
    )?.dataValues.profileImage;
    try {
      if (oldImage) {
        fs.unlinkSync(path.join(__dirname, "..", oldImage));
      }
    } catch (e) {
      console.log("no image found");
    }
  }
  const updatedProfileData = await User.update(bodyData, {
    where: { id: userId },
    individualHooks: true,
  });
  if (!updatedProfileData) {
    throw new ErrorResponse(400, "Invalid Request");
  }
};

//models for request body
interface LoginBody {
  email: string;
  password: string;
}
interface ChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}
interface UpdateProfileBody {
  firstName: string;
  lastName: string;
  email: string;
  profileImage: string;
}
interface ResetPasswordBody {
  password: string;
}
interface ForgotPasswordBody {
  email: string;
}
