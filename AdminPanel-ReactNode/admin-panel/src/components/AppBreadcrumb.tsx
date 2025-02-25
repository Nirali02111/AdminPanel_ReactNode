import React from "react";
import { useLocation } from "react-router-dom";
import { CBreadcrumb, CBreadcrumbItem } from "@coreui/react";
import { routes } from "../App";

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname;
  const findCurrentRoute: any = (currentPath: any, routes: any) => {
    for (const route of routes) {
      if (route.path === currentPath) {
        return route;
      }

      if (route.children) {
        const foundInChildren = findCurrentRoute(currentPath, route.children);
        if (foundInChildren) {
          return foundInChildren;
        }
      }
    }

    return null;
  };
  const getRouteName = (pathname: any, routes: any) => {
    const currentRoute = findCurrentRoute(pathname, routes);
    return currentRoute ? currentRoute.name : false;
  };

  const getBreadcrumbs = (location: any) => {
    const breadcrumbs: any[] = [];
    location
      .split("/")
      .reduce((prev: any, curr: any, index: any, array: any) => {
        let currentPathname = `${prev}/${curr}`;
        if (currentPathname.includes("edit")) {
          // currentPathname = currentPathname + '/:id';
          const routeName = getRouteName(currentPathname + "/:id", routes);

          routeName &&
            breadcrumbs.push({
              pathname: currentPathname,
              name: routeName,
              active: true,
            });
          return currentPathname;

          //  return currentPathname;
        }

        const routeName = getRouteName(currentPathname, routes);

        routeName &&
          breadcrumbs.push({
            pathname: currentPathname,
            name: routeName,
            active: index + 1 === array.length ? true : false,
          });
        return currentPathname;
      });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs(currentLocation);
  return (
    <>
      <CBreadcrumb className="m-0 ms-2">
        <CBreadcrumbItem href="/dashboard">Home</CBreadcrumbItem>
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <CBreadcrumbItem
              {...(breadcrumb.active
                ? { active: true }
                : { href: breadcrumb.pathname })}
              key={index}
            >
              {breadcrumb.name}
            </CBreadcrumbItem>
          );
        })}
      </CBreadcrumb>
    </>
  );
};

export default React.memo(AppBreadcrumb);
