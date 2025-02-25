import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LayoutProvider } from "./context/LayoutContext";
import DashboardLayout from "./layouts/DashboardLayout";
import { User } from "./pages/user/User";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/authentication/Login";
//import "./../src/assets/styles/style.scss";
import Usersave from "./pages/user/Usersave";
import { UserProvider } from "./context/UserContext";
import { Role } from "./pages/role/Role";
import RoleSave from "./pages/role/RoleSave";
import EmailTemplate from "./pages/emailTemplates/EmailTemplate";
import EmailTemplateSave from "./pages/emailTemplates/EmailTemplateSave";
import Cms from "./pages/cms/Cms";
import Cmssave from "./pages/cms/Cmssave";
import ApplicationConfig from "./pages/applicationConfig/ApplicationConfig";
import ApplicationConfigurationSave from "./pages/applicationConfig/ApplicationConfigurationSave";
import AuditLog from "./pages/audit-log/AuditLog";
import Profile from "./pages/profile/Profile";
import FAQ from "./pages/FAQ/FAQ";
import FAQSave from "./pages/FAQ/FAQSave";
import ChangePassword from "./pages/change-password/ChangePassword";
import ResetPassword from "./pages/authentication/ResetPassword";
import "sweetalert2/src/sweetalert2.scss";
import Page404 from "./pages/page404/Page404";
import Forbidden from "./pages/forbidden/Forbidden";

type CustomRoute = {
  path: string;
  element: JSX.Element;
  name: string;
  children?: CustomRoute[];
};

const renderRoutes = (routes: CustomRoute[]) => {
  return routes.map((route, index) => (
    <Route key={index} path={route.path} element={route.element}>
      {route.children &&
        route.children.map((childRoute, childIndex) => (
          <Route
            key={childIndex}
            path={childRoute.path}
            element={childRoute.element}
          />
        ))}
    </Route>
  ));
};



export const routes = [
  {
    path: "/",
    name: "Login",
    element: <Navigate to="/account/login" />,
  },
  {
    path: "/account/login",
    name: "Login",
    element: <Login />,
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    element: <Forbidden />,
  },
  {
    path: "*",
    name: "404 page not found",
    element: <Page404 />,
  },
  {
    path: "/reset-password/:id",
    name: "Reset Password",
    element: <ResetPassword />,
  },
  {
    path: "/",
    name: "Dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/user/add",
        name: "Add",
        element: <Usersave />,
      },
      {
        path: "/user/edit/:id",
        name: "Edit",
        element: <Usersave />,
      },
      {
        path: "/users",
        name: "Users",
        element: <User />,
      },
      {
        path: "/role",
        name: "Role",
        element: <Role />,
      },
      {
        path: "/role/add",
        name: "Add",
        element: <RoleSave />,
      },
      {
        path: "/role/edit/:id",
        name: "Edit",
        element: <RoleSave />,
      },
      {
        path: "/emailtemplate",
        name: "Email Template",
        element: <EmailTemplate />,
      },
      {
        path: "/emailtemplate/add",
        name: "Add",
        element: <EmailTemplateSave />,
      },
      {
        path: "/emailtemplate/edit/:id",
        name: "Edit",
        element: <EmailTemplateSave />,
      },
      {
        path: "/cmsmanagement",
        name: "CMS",
        element: <Cms />,
      },
      {
        path: "/cmsmanagement/add",
        name: "Add",
        element: <Cmssave />,
      },
      {
        path: "/cmsmanagement/edit/:id",
        name: "Edit",
        element: <Cmssave />,
      },
      {
        path: "/applicationconfiguration",
        name: "Application Configuration",
        element: <ApplicationConfig />,
      },
      {
        path: "/applicationconfiguration/add",
        name: "Add",
        element: <ApplicationConfigurationSave />,
      },
      {
        path: "/applicationconfiguration/edit/:id",
        name: "Edit",
        element: <ApplicationConfigurationSave />,
      },
      {
        path: "/auditlog",
        name: "Audit Log",
        element: <AuditLog />,
      },
      {
        path: "/profile",
        name: "User Profile",
        element: <Profile />,
      },
      {
        path: "/faq",
        name: "FAQ",
        element: <FAQ />,
      },
      {
        path: "/faq/add",
        name: "Add",
        element: <FAQSave />,
      },
      {
        path: "/faq/edit/:id",
        name: "Edit",
        element: <FAQSave />,
      },
      {
        path: "/change-password",
        name: "Change Password",
        element: <ChangePassword />,
      },
    ],
  },
];

const App: React.FC = () => {

  return (
    <div>
      <UserProvider>
        <LayoutProvider>
          <Router>
            <Routes>{renderRoutes(routes)}</Routes>
          </Router>
        </LayoutProvider>
      </UserProvider>
    </div>
  );
};

export default App;
