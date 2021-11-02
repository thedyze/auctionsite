import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useHistory } from "react-router-dom";

import { Disclosure, Menu } from "@headlessui/react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/outline";
import { LoginTemplate } from "../components/LoginForm";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

export const Sidebar = () => {

    const logout = async () => {
        await fetch("/logout");
        history.push("/");
        window.location.reload(false);
      };


    return(
        <Menu.Items className="fixed bg-white h-screen w-44 right-0 top-16">
            <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            onClick={logout}
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Log out
                          </a>
                        )}
                      </Menu.Item>
        </Menu.Items>
    );
}