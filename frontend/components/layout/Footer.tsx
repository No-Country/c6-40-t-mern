import { ButtonNavar } from "./ButtonNavar";
import { FaFacebook as Face } from "react-icons/fa";
import { BsInstagram as Insta } from "react-icons/bs";
import { AiFillTwitterCircle as Twitt } from "react-icons/ai";
import { BsGithub as Github } from "react-icons/bs";
import { BsLinkedin as Linke } from "react-icons/bs";
import { IoLogoYoutube as Youtub } from "react-icons/io";
import { GoHome as Home } from "react-icons/go";
import { MdPublic as Public } from "react-icons/md";
import { AiOutlineEdit as Edit } from "react-icons/ai";

export const Footer = () => {
    return (
        <div className="bg-slate-800 p-10 flex-col justify-center">
            <div className="flex justify-center items-center">
                <img src=".." className="text-white" alt="Logo" />
            </div>
            <div className="flex flex-col justify-center items-center mt-10 md:flex-row ">
                <ButtonNavar href="/">
                    <Home />
                    <span>Home</span>
                </ButtonNavar>
                <ButtonNavar href="/publicaciones">
                    <Public />
                    <span>Publicaciones</span>
                </ButtonNavar>
                <ButtonNavar href="/form">
                    <Edit />
                    <span>Publicar</span>
                </ButtonNavar>
            </div>
            <div className="flex justify-center items-center mt-10">
                <img src=".." className="text-white" alt="logo secundario" />
            </div>
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
