import { ButtonNavbar } from "./ButtonNavbar";
import { FaFacebook as Face } from "react-icons/fa";
import { BsInstagram as Insta } from "react-icons/bs";
import { AiFillTwitterCircle as Twitt } from "react-icons/ai";
import { BsGithub as Github } from "react-icons/bs";
import { BsLinkedin as Linke } from "react-icons/bs";
import { IoLogoYoutube as Youtub } from "react-icons/io";
import { GoHome as Home } from "react-icons/go";
import { MdPublic as Public } from "react-icons/md";
import { AiOutlineEdit as Edit } from "react-icons/ai";
import { Button, Menu, MenuButton, MenuList } from "@chakra-ui/react";
import { MdSportsSoccer as Sport } from "react-icons/md";
import { AiOutlineGlobal as Global } from "react-icons/ai";
import { FcConferenceCall as Politica } from "react-icons/fc";
import Image from "next/image";
import logo from "../../public/images/noticias.png";

export const Footer = () => {
    return (
        <div className="bg-slate-800 p-10 flex-col justify-center">
            <div className="flex justify-center items-center">
                <Image src={logo} alt="logo" height={70} width={70} />
            </div>
            <div className="flex flex-col justify-center items-center mt-10 md:flex-row ">
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

                                <ButtonNavbar href="/deportes">
                                    <Sport />
                                    <span>Deportes</span>
                                </ButtonNavbar>
                                <ButtonNavbar href="/politica">
                                    <Politica />
                                    <span>Politica</span>
                                </ButtonNavbar>
                                <ButtonNavbar href="/internacional">
                                    <Global />
                                    <span>Internacional</span>
                                </ButtonNavbar>
                            </MenuList>
                        </>
                    )}
                </Menu>


                {/* <ButtonNavar href="/publicaciones">
                    <Public />
                    <span>Publicaciones</span>
                </ButtonNavar> */}
                <ButtonNavbar href="/form">
                    <Edit />
                    <span>Publicar</span>
                </ButtonNavbar>
            </div>
            {/* <div className="flex justify-center items-center mt-10">
                <img src=".." className="text-white" alt="logo secundario" />
            </div> */}
            <div className="flex justify-center items-center mt-10 gap-8">
                <a href="#">
                    <Face style={{ color: "#9c6419", fontSize: "30px" }} />
                </a>
                <a href="#">
                    <Insta style={{ color: "#9c6419", fontSize: "30px" }} />
                </a>
                <a href="#">
                    <Twitt style={{ color: "#9c6419", fontSize: "30px" }} />
                </a>
                <a href="#">
                    <Github style={{ color: "#9c6419", fontSize: "30px" }} />
                </a>
                <a href="#">
                    <Linke style={{ color: "#9c6419", fontSize: "30px" }} />
                </a>
                <a href="#">
                    <Youtub style={{ color: "#9c6419", fontSize: "30px" }} />
                </a>
            </div>
            <div className="flex justify-center items-center mt-10">
                <p className="text-zinc-100">&copy;2022 - .Blog</p>
            </div>
        </div>
    );
};
