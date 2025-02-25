import { Op, where } from "sequelize";
import { PaginationAndOrderParams } from "../common/query.model";
import * as db from "../models/index";
const AuditLog = db.AuditLog;
function startOfTheDay(date: string) {
  return new Date(new Date(date).setHours(0, 0, 0, 0)).toISOString();
}
function endOfTheDay(date: string) {
  return new Date(new Date(date).setHours(23, 59, 59, 999)).toISOString();
}

interface AuditLogProps {
  userId: number | undefined;
  username?: string;
  activity: string;
  actionType?: string;
  data?: any;
}

export const addAuditlog = async ({
  userId,
  username,
  activity,
  actionType = "None",
  data = [],
}: AuditLogProps) => {
  try {
    const log: any = {
      username: username,
      timestamp: new Date(),
      activity: activity,
      actionType: actionType,
      CreatedBy: userId,
    };
    const detailsArr: any = [];
    if (data && actionType === "Create") {
      let excludeFields = ["createdAt", "updatedAt", "deletedAt", "id"];
      Object.keys(data.dataValues).forEach((field: string) => {
        if (!excludeFields.includes(field)) {
          detailsArr.push({
            fieldName: field,
            oldValue: "",
            newValue: data.dataValues[field],
          });
        }
      });
      log.details = JSON.stringify(detailsArr);
    }
    if (data && actionType === "Update") {
      let excludeFields = ["createdAt", "updatedAt", "deletedAt", "id"];
      let oldValue = data[1][0]._previousDataValues;
      let newValue = data[1][0].dataValues;
      Object.keys(oldValue).forEach((field) => {
        if (!excludeFields.includes(field)) {
          if (oldValue[field] !== newValue[field]) {
            detailsArr.push({
              fieldName: field,
              oldValue: oldValue[field],
              newValue: newValue[field],
            });
          }
        }
      });
      if (detailsArr.length === 0) {
        return;
      }
      log.details = JSON.stringify(detailsArr);
    }
    await AuditLog.create(log as any);
  } catch (e) {}
};

export const getAuditLogs = async (query: SearchOptions) => {
  try {
    const {
      page,
      pageSize,
      orderBy,
      orderDirection,
      startDate,
      endDate,
      username,
      actionType,
      activity,
    } = query;
    let whereClause: any = {};
    const paginationOption: any = {};
    let attributes = [
      "id",
      "username",
      "actionType",
      "activity",
      "details",
      "timestamp",
    ];
    let orderOptions = [];
    if (orderBy && orderDirection) {
      if (
        attributes.includes(orderBy) &&
        (orderDirection.toLocaleLowerCase() === "asc" ||
          orderDirection.toLocaleLowerCase() === "desc")
      ) {
        orderOptions.push([orderBy, orderDirection.toUpperCase()]);
      }
    }
    if (pageSize) {
      const limitNum = parseInt(pageSize);
      if (!isNaN(limitNum)) {
        paginationOption.limit = limitNum;
      }
    }
    if (page) {
      const offsetNum = parseInt(page);
      if (!isNaN(offsetNum) && offsetNum !== 0) {
        paginationOption.offset = (offsetNum - 1) * paginationOption.limit;
      }
    }
    if (startDate && endDate) {
      whereClause.timestamp = {
        [Op.between]: [startOfTheDay(startDate), endOfTheDay(endDate)],
      };
    }
    // if (username) {
    //   whereClause.username = { [Op.like]: `%${username}%` };
    // }
    if (actionType) {
      whereClause.actionType = { [Op.like]: `%${actionType}%` };
    }
    if (activity) {
      whereClause.activity = { [Op.like]: `%${activity}%` };
    }

    const includeOptions: any = [
      { model: db.User, as: "user", attributes: ["firstName", "lastName"] },
    ];

    if (username) {
      includeOptions[0].where = {
        [Op.or]: [
          { FirstName: { [Op.like]: `%${username}%` } },
          { LastName: { [Op.like]: `%${username}%` } },
        ],
      };
    }

    const { rows, count } = await AuditLog.findAndCountAll({
      ...paginationOption,
      order: orderOptions.length === 0 ? [["createdAt", "DESC"]] : orderOptions,
      attributes: attributes,
      where: whereClause,
      include: includeOptions, // Include User model with aliases
    });

    const data = rows.map((row: any) => {
      const user = row.user;
      const username = user
        ? `${user.firstName || ""} ${user.lastName || ""}`
        : row.username || "";
      return {
        ...row.get(),
        username: username,
      };
    });
    return { data, totalRecords: count };
  } catch (error) {
    console.log("error get log: ", error);
  }
};

export interface SearchOptions extends PaginationAndOrderParams {
  username: string;
  actionType: string;
  activity: string;
  startDate: string;
  endDate: string;
}
