import React, { useContext, useState } from "react";
// import { useSelector, useDispatch } from 'react-redux'

import {
  CNavItem,
  CSidebar,
  CSidebarNav,
  CSidebarToggler,
} from "@coreui/react";

import { AppSidebarNav } from "./AppSidebarNav";
import { LayoutContext } from "../context/LayoutContext";
import CIcon from "@coreui/icons-react";
import {
  cilSpeedometer,
  cilUser,
  cilAddressBook,
  cilEnvelopeClosed,
  cilLifeRing,
} from "@coreui/icons";
import { UserContext } from "../context/UserContext";
const image = "./assets/images/admin logo.jpg";
const AppSidebar = () => {
  const { sidebarOpen, sidebarUnfoldable, toggleSidebarUnfoldable } =
    useContext(LayoutContext);
  const { loggedInUser } = useContext(UserContext);
  const [isHovered, setIsHovered] = useState(false);

  const sidebarItems = [
    {
      component: CNavItem,
      to: "/dashboard",
      name: "Dashboard",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      badge: null,
      permission: "Dashboard_View",
    },
    {
      component: CNavItem,
      to: "/users",
      name: "Users",
      icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      badge: null,
      permission: "User_List",
    },
    {
      component: CNavItem,
      to: "/role",
      name: "Roles",
      icon: <CIcon icon={cilAddressBook} customClassName="nav-icon" />,
      badge: null,
      permission: "Role_List",
    },
    {
      component: CNavItem,
      to: "/emailtemplate",
      name: "Email Templates",
      icon: <CIcon icon={cilEnvelopeClosed} customClassName="nav-icon" />,
      badge: null,
      permission: "EmailTemplate_List",
    },
    {
      component: CNavItem,
      to: "/cmsmanagement",
      name: "CMS",
      icon: <CIcon icon={cilLifeRing} customClassName="nav-icon" />,
      badge: null,
      permission: "CMSManagement_List",
    },
    {
      component: CNavItem,
      to: "/faq",
      name: "FAQ",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      badge: null,
      permission: "FAQ_List",
    },
    {
      component: CNavItem,
      to: "/applicationconfiguration",
      name: "Application Config",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      badge: null,
      permission: "ApplicationConfiguration_List",
    },
    {
      component: CNavItem,
      to: "/auditlog",
      name: "AuditLogs",
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
      badge: null,
      permission: "AuditLogs_List",
    },
  ];

  return (
    <CSidebar
      position="fixed"
      unfoldable={sidebarUnfoldable}
      visible={sidebarOpen}
      onMouseEnter={() => setIsHovered(!isHovered)}
      onMouseLeave={() => setIsHovered(!isHovered)}
    >
      <div
        className={`d-none d-md-flex  align-items-center ${
          ((isHovered && sidebarUnfoldable) || !sidebarUnfoldable) && "p-3"
        }`}
      >
        {(isHovered && sidebarUnfoldable) || !sidebarUnfoldable ? (
          <>
            <img
              src={image}
              alt="Admin Panel Image"
              style={{ marginRight: "10px", height: "50px" }}
            />
            <h4>Admin Panel</h4>
          </>
        ) : (
          <>
            {" "}
            <img
              src={image}
              alt="Admin Panel Image"
              style={{
                marginRight: "10px",
                height: "50px",
                marginTop: "10px",
                marginLeft: "7px",
              }}
            />
          </>
        )}
      </div>

      {((isHovered && sidebarUnfoldable) || !sidebarUnfoldable) && (
        <span className="ps-3 pt-2">
          <h6>{loggedInUser?.user?.username}</h6>
          <p>{loggedInUser?.user?.role}</p>
        </span>
      )}

      <CSidebarNav>
        {/* <SimpleBar> */}
        <AppSidebarNav items={sidebarItems} />
        {/* </SimpleBar> */}
      </CSidebarNav>
      <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => toggleSidebarUnfoldable()}
      />
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
