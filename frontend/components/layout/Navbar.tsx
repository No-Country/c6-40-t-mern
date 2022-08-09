import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { ButtonNavar } from "./ButtonNavar";
import { UserButton } from "./UserButton";
import { MobileButton } from "./MobileBotton";

export const Navbar = ({ children }) => {
    return (
        <div>
            <nav className="min-h-full  ">
                <Disclosure
                    as="nav"
                    className="bg-slate-800 p-2 fixed top-0 left-0 right-0 z-10"
                >
                    {({ open }) => (
                        <div>
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-1">
                                <div className="flex items-center justify-between h-16">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <a href="/">Logo</a>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="flex items-center  ">
                                                <ButtonNavar href="/">Home</ButtonNavar>
                                                <ButtonNavar href="/prueba">Prueba</ButtonNavar>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            <UserButton />
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="bg-slate-800 inline-flex items-center justify-center p-2 rounded-md text-yellow-700 hover:text-yellow-700 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <MenuIcon
                                                    className="block h-6 w-6"
                                                    aria-hidden="true"
                                                />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>
                            <Disclosure.Panel className="md:hidden">
                                <div className=" px-1">
                                    <Disclosure.Button className="block px-3 py-2 rounded-md text-base font-medium">
                                        <ButtonNavar href="/">Home</ButtonNavar>
                                    </Disclosure.Button>
                                    <Disclosure.Button className="block px-3 py-2 rounded-md text-base font-medium">
                                        <ButtonNavar href="/prueba">Prueba</ButtonNavar>
                                    </Disclosure.Button>
                                </div>
                                <MobileButton />
                            </Disclosure.Panel>
                        </div>
                    )}
                </Disclosure>
            </nav>
            {children}
        </div>
    );
};
