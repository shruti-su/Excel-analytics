import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "/src/components/widgets/layout";
import routes from "/src/router.jsx"; // Assuming this path is correct and it exports the array
import {
  useMaterialTailwindController,
  setOpenConfigurator,
} from "/src/components/context";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  // Debugging: Check the routes array structure and content
  console.log("Dashboard: `routes` prop:", routes);

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      {/* Sidenav component should receive the full routes or filtered ones for navigation */}
      <Sidenav
        routes={routes.filter(r => r.layout === "dashboard")} // Pass only dashboard routes to Sidenav
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed z-40 rounded-full bottom-8 right-8 shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="w-5 h-5" />
        </IconButton>

        {/* This is where the main change happens */}
        <Routes>
          {routes.map(
            ({ layout, pages }) => {
              // Only process routes meant for the "dashboard" layout
              if (layout === "dashboard") {
                return pages.map(({ path, element }, key) => (
                  // IMPORTANT: For nested routes within a parent that uses "/*",
                  // the `path` prop here should be relative.
                  // For example, if parent is "/dashboard/*" and child path is "/home",
                  // then the full URL becomes "/dashboard/home".
                  // The `exact` prop is generally not needed in react-router-dom v6+
                  <Route key={key} path={path} element={element} />
                ));
              }
              return null; // Don't render anything for non-dashboard layouts
            }
          )}
          {/* Add a redirect for the base /dashboard path if you want /dashboard to go to /dashboard/home */}
          <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
          {/* Or an index route if you want to render a specific component at /dashboard */}
          {/* <Route index element={<Home />} /> */}

          {/* Optional: Add a catch-all for paths within /dashboard/* that don't match */}
          <Route path="*" element={<p>Dashboard Page Not Found (404)</p>} />
        </Routes>

        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/components/layout/dashboard.jsx";

export default Dashboard;