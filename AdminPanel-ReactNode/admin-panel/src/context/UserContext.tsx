import React, { createContext, useState, useEffect } from "react";
import * as accountService from "../services/account.service";
import axios from "axios";

// Create a context
export const UserContext = createContext<any>(null);

export const UserProvider = ({ children }: any) => {
  const [loggedInUser, setLoggedInUser] = useState<any>(null);
  const [permissions, setPermissions] = useState<any>({});
  const [alertMessage, setAlertMessage] = useState("");
  const fetchPermissions = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_SERVER_URL}/v1/permissions`
      );
      if (res.data) {
        const updatedPermissions: any = {};
        res.data?.data?.forEach((permission: any) => {
          updatedPermissions[permission.name] = permission.id;
        });
        setPermissions(updatedPermissions);
      }
    } catch (error) {
      console.error("permission error", error);
    }
  };
  const logout = async () => {
    try {
      await accountService.logout();
      localStorage.clear();
      setLoggedInUser(null);
    } catch (e) {}
  };

  const loggedInData = () => {
    try {
      const getData = JSON.parse(localStorage.getItem("Userdata") ?? "");
      setLoggedInUser(getData);
    } catch (error) {
      console.error("Error parsing token:", error);
      setLoggedInUser(null);
    }
  };

  useEffect(() => {
    loggedInData();
    fetchPermissions();
  }, []);

  return (
    <UserContext.Provider
      value={{
        logout,
        loggedInUser,
        setLoggedInUser,
        permissions,
        alertMessage,
        setAlertMessage,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
