import { Disclosure } from "@headlessui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./UserButton";
import { AiOutlineLogin as Login } from "react-icons/ai";

export const MobileButton = () => {
    const { loginWithRedirect, user, logout } = useAuth0();

    return (
        <div>
            {!user && (
                <Button onClick={() => loginWithRedirect()}>
                    <Login /> Login
                </Button>
            )}
            {user && (
                <div className="pt-4 pb-3 border-t border-gray-700">
                    <div className="flex items-center px-5">
                        <div className="flex-shrink-0">
                            {!user?.picture && (
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HjQfYqYBsspqy-iV0-Cw5uHo-cH-3TbhbAugLXu7RnL9lmqiPZUkqBy-XpKfandg7FQ&usqp=CAU" // src={user?.picture}
                                    alt="photo"
                                />
                            )}
                            {user?.picture && (
                                <img
                                    className="h-10 w-10 rounded-full"
                                    src={user?.picture}
                                    alt="photo"
                                />
                            )}
                        </div>
                        <div className="ml-3">
                            <div className="text-base font-medium leading-none text-white">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium leading-none text-gray-400">
                                {user.email}
                            </div>
                        </div>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                        <Disclosure.Button className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                            Tu perfil
                        </Disclosure.Button>
                        <Disclosure.Button className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                            Ajustes
                        </Disclosure.Button>
                        <Disclosure.Button
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                            onClick={() => logout({ returnTo: window.location.origin })}
                        >
                            Cerrar sesion
                        </Disclosure.Button>
                    </div>
                </div>
            )}
        </div>
    );
};
