import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { ButtonNavbar } from "./ButtonNavbar";
import { UserButton } from "./UserButton";
import { MobileButton } from "./MobileBotton";
import { GoHome as Home } from "react-icons/go";
import { MdPublic as Public } from "react-icons/md";
import { AiOutlineEdit as Edit } from "react-icons/ai";
import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { MdSportsSoccer as Sport } from "react-icons/md";
import Image from "next/image";
import logo from "../../public/images/noticias.png";
import { useEffect, useState } from "react";


export const Navbar = ({ children }) => {

    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT

    const [categories, setCategories] = useState([])

    useEffect((): void => {
        fetch(`${API_ENDPOINT}/category/`)
            .then(res => res.json())
            .then(res => {
                setCategories(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])


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
                                            <Image src={logo} alt="logo" height={50} width={50} />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="flex items-center">
                                                <ButtonNavbar href="/">
                                                    <Home />
                                                    <span>Home</span>
                                                </ButtonNavbar>
                                                <Menu>
                                                    {({ isOpen }) => (
                                                        <>
                                                            <MenuButton isActive={isOpen} as={Button} className="text-white flex items-center gap-2" leftIcon={<Public />}>
                                                                {isOpen ? 'Categorias' : 'Publicaciones'}
                                                            </MenuButton>
                                                            <MenuList className="bg-slate-800 rounded pr-20 pl-2">
                                                                {categories?.map((category) => {
                                                                    return <ButtonNavbar key={category.key} href={`/categories/${category.key}`}>
                                                                        <Sport />
                                                                        <span>{category.name}</span>
                                                                    </ButtonNavbar>
                                                                })}
                                                            </MenuList>
                                                        </>
                                                    )}
                                                </Menu>
                                                <ButtonNavbar href="/form">
                                                    <Edit />
                                                    <span>Publicar</span>
                                                </ButtonNavbar>
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
                                <div className="px-1">

                                    <Disclosure.Button className="block px-3 py-2 rounded-md text-base font-medium">
                                        <ButtonNavbar href="/">
                                            <Home />
                                            Home
                                        </ButtonNavbar>
                                    </Disclosure.Button>
                                    {categories?.map((category) =>
                                        <Disclosure.Button key={category.key} className="block px-3 py-2 rounded-md text-base font-medium">
                                            <ButtonNavbar href={`/categories/${category.key}`}>
                                                {category.name}
                                            </ButtonNavbar>
                                        </Disclosure.Button>
                                    )}
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
