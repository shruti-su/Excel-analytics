import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenSidenav,
} from "@/components/context";
import { useAuth } from "@/components/auth/AuthContext";

export function Sidenav({ brandImg, brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const { user } = useAuth();
  console.log(user);

  return (
    <aside
      className={`${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } bg-primary dark:bg-primary-dark fixed inset-0 z-50  h-dvh w-60  shadow-2xl shadow-slate-700 transition-transform duration-300 xl:translate-x-0 border-r border-primary dark:border-primary-dark flex flex-col justify-between`}
    >
      <div>
        <div className={`relative`}>
          <Link to="/" className="px-8 py-6 text-center">
            <Typography variant="h6" className="text-black dark:text-white ">
              Excel Analytics
            </Typography>
          </Link>
          <IconButton
            variant="text"
            color="white"
            size="sm"
            ripple={false}
            className="absolute top-0 right-0 grid rounded-tl-none rounded-br-none xl:hidden"
            onClick={() => setOpenSidenav(dispatch, false)}
          >
            <XMarkIcon
              strokeWidth={3}
              className="w-6 h-6 text-black dark:text-white"
            />
          </IconButton>
        </div>
        <div className="m-4">
          {routes.map(({ layout, title, pages }, key) => (
            <ul key={key} className="flex flex-col gap-1 mb-4">
              {title && (
                <li className="mx-3.5 mt-4 mb-2">
                  <Typography
                    variant="small"
                    className="font-black uppercase opacity-75 text-secondary dark:text-secondary-dark"
                  >
                    {title}
                  </Typography>
                </li>
              )}
              {/* Filter pages to only show those with sidebar: true */}
              {pages
                .filter((page) => page.sidebar === true)
                .map(({ icon, name, path }) => (
                  <li key={name}>
                    <NavLink to={`/${layout}${path}`}>
                      {({ isActive }) => (
                        <Button
                          variant={isActive ? "gradient" : "text"}
                          color={isActive ? "gray" : "gray"} // Use a valid color prop
                          className={`flex items-center gap-4 px-4 capitalize ${
                            isActive
                              ? "bg-secondary dark:bg-secondary-dark text-gray-200"
                              : "text-gray-900 dark:text-gray-200"
                          }`}
                          fullWidth
                        >
                          {icon}
                          <Typography
                            color="inherit"
                            className="font-medium capitalize"
                          >
                            {name}
                          </Typography>
                        </Button>
                      )}
                    </NavLink>
                  </li>
                ))}
            </ul>
          ))}
        </div>
      </div>
      <div className="p-4 border-t border-gray-700">
        {user.role === "admin" ? (
          <Link to="/admin/profile">
            <div className="flex items-center gap-4">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="relative inline-block h-9 w-9 rounded-full object-cover object-center"
                />
              ) : (
                <div className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-indigo-500">
                  <span className="font-semibold text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <Typography
                  variant="h6"
                  className="font-semibold text-black dark:text-white"
                >
                  {user.name}
                </Typography>

                <Typography
                  variant="small"
                  className="font-normal text-black dark:text-gray-300"
                >
                  View Profile
                </Typography>
              </div>
            </div>
          </Link>
        ) : (
          <Link to="/dashboard/profile">
            <div className="flex items-center gap-4">
              {user.profilePicture ? (
                <img
                  src={user.profilePicture}
                  alt={user.name}
                  className="relative inline-block h-9 w-9 rounded-full object-cover object-center"
                />
              ) : (
                <div className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-purple-600 to-indigo-500">
                  <span className="font-semibold text-white">
                    {user.name?.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <Typography
                  variant="h6"
                  className="font-semibold text-black dark:text-white"
                >
                  {user.name}
                </Typography>

                <Typography
                  variant="small"
                  className="font-normal text-black dark:text-gray-300"
                >
                  View Profile
                </Typography>
              </div>
            </div>
          </Link>
        )}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/907931.jpg",
  brandName: "Material Tailwind React",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidenav.jsx";

export default Sidenav;
