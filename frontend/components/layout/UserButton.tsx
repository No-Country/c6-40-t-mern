import { Menu } from "@headlessui/react";
import React, { useState } from "react";
import { css } from "@emotion/react";
import { useAuth0 } from "@auth0/auth0-react";
import { AiOutlineLogin as Login } from "react-icons/ai";
import Link from "next/link";

export const Button = ({ children, onClick }) => (
  <button
    css={css`
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
    `}
    className="bg-yellow-700
      text-white p-1.5
      rounded-md hover:bg-yellow-600
      hover:text-black hover:shadow-md 
      hover:shadow-yellow-700 cursor-pointer
      inline-flex items-center"
    onClick={onClick}
  >
    {children}
  </button>
);

export const UserButton = () => {
  const { loginWithRedirect, user, logout } = useAuth0();
  const [show, setShow] = useState(false);

  return (
    <div>
      {!user && (
        <Button onClick={() => loginWithRedirect()}>
          <Login /> Login
        </Button>
      )}
      {user && (
        <div>
          <Menu as="div" className="ml-3 relative">
            <button
              className="gap-2 max-w-xs bg-gray-800
              rounded-full flex items-center text-sm focus:outline-none
              focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800
              focus:ring-white"
              onClick={() => {
                setShow(!show);
              }}
            >
              <span className="sr-only">Open user menu</span>
              {show ? "" : ""}
              {!user.picture && (
                <img
                  css={css`
                    -webkit-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                  `}
                  className="h-8 w-8 rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HjQfYqYBsspqy-iV0-Cw5uHo-cH-3TbhbAugLXu7RnL9lmqiPZUkqBy-XpKfandg7FQ&usqp=CAU" // src={user.picture}
                  alt="photo"
                />
              )}
              {user.picture && (
                <img
                  css={css`
                    -webkit-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                  `}
                  className="h-8 w-8 rounded-full"
                  src={user.picture}
                  alt="photo"
                />
              )}
            </button>
          </Menu>
          <div>
            {show ? (
              <ul className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none mr-7 ">
                <li>
                  {user && <Link href="/profile">
                    <a
                      css={css`
                      -webkit-user-select: none;
                      -ms-user-select: none;
                      user-select: none;
                    `}
                      href="#"
                      className="block px-4 py-2 text-sm text-gray-700 hover:text-black hover:rounded-lg hover:bg-gray-200"
                    >
                      Tu perfil
                    </a>
                  </Link>}
                </li>
                <li>
                  <a
                    css={css`
                      -webkit-user-select: none;
                      -ms-user-select: none;
                      user-select: none;
                    `}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-black hover:rounded-lg hover:bg-gray-200"
                  >
                    Ajustes
                  </a>
                </li>
                <li>
                  <a
                    css={css`
                      -webkit-user-select: none;
                      -ms-user-select: none;
                      user-select: none;
                    `}
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:text-black hover:rounded-lg hover:bg-gray-200"
                    onClick={() => logout({ returnTo: window.location.origin })}
                  >
                    Cerrar sesion
                  </a>
                </li>
              </ul>
            ) : (
              ""
            )}
          </div>
        </div>
      )}
    </div>
  );
};
