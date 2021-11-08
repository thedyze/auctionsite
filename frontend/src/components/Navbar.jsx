/* This example requires Tailwind CSS v2.0+ */

import { Disclosure, Menu } from "@headlessui/react";
import { BellIcon, UserCircleIcon } from "@heroicons/react/solid";
import { LoginTemplate } from "../components/LoginForm";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  let history = useHistory();

  const { currentUser } = useContext(UserContext);

  const logout = async () => {
    await fetch("/logout");
    history.push("/");
    window.location.reload(false);
  };

  const pathTo = (e) => {
    console.log("e", e.target.name, e.target.id);
    history.push(`/${e.target.name}`);
    
    e.target.id === "logo" && window.location.reload(false);
  };

  return (
    <Disclosure as="nav" className="bg-myGr-dark fixed w-screen -mt-16 z-10">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-white ">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <button
                    onClick={pathTo}
                    id="logo"
                    className="block lg:hidden h-8 w-auto"
                  >
                    logo
                  </button>
                </div>
                <div className="hidden sm:block sm:ml-6"></div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button type="button" className=" text-white">
                  <span className="sr-only">View notifications</span>
                  {currentUser ? (
                    <BellIcon className="h-7 w-7" aria-hidden="true" />
                  ) : (
                    <div></div>
                  )}
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative">
                  <div>
                    <Menu.Button className=" flex text-sm rounded-full ">
                      <UserCircleIcon
                        className="h-11 w-11"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>
                  <Menu.Items className="fixed bg-white border-l-2 border-b-2 border-myGr-dark   w-44 right-0 top-16">
                    {currentUser ? (
                      <div>
                        <Menu.Item>
                          <div
                            className="block px-4 py-2 text-sm text-myGr-dark text-center"
                            href="/myPage"
                          >
                            {currentUser.email}
                          </div>
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              name="buying"
                              onClick={pathTo}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 text-center"
                              )}
                            >
                              Buying
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              name="selling"
                              onClick={pathTo}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 text-center"
                              )}
                            >
                              Selling
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              onClick={logout}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700 text-center"
                              )}
                            >
                              Log out
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    ) : (
                      <Menu.Item>
                        <LoginTemplate />
                      </Menu.Item>
                    )}
                  </Menu.Items>
                </Menu>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
