import React, { useContext, useEffect, useState } from "react";
import { AppSidebar, AppHeader } from "../components/index";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { routes } from "../App";
const DashboardLayout = () => {

  const location = useLocation();
  useEffect(() => {
    const routeName = getRouteName(location.pathname);
    document.title = routeName ? `${routeName}-Admin Panel` : 'React App';
  }, [location]);


  const getRouteName = (pathname: string) => {
    let currentRouteName = null;

    routes.forEach((route) => {
      if (route.children) {
        route.children.forEach((childRoute) => {
          if (pathname.startsWith(childRoute.path)) {
            currentRouteName = childRoute.name;
          }
          if (pathname.includes("edit") && childRoute.path.includes("edit")) {
            currentRouteName = "Edit";
          }
        });
      } else if (pathname === route.path) {
        currentRouteName = route.name;
      }
    });

    return currentRouteName;
  };



  const { loggedInUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);
  if (isLoading) return <></>;
  else if (loggedInUser?.token)
    return (
      <div>
        <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div>
            <Outlet></Outlet>
          </div>
          {/* <AppFooter /> */}
        </div>
      </div>
    );
  else {
    return <Navigate to="/account/login" replace />;
  }
};

export default DashboardLayout;
