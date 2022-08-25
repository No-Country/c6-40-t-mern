import { useAuth0 } from "@auth0/auth0-react";
import Image from "next/image";
import logo from "../../public/images/caja-vacia.png";
import { FiEdit as Edi } from "react-icons/fi";

export const Profile = () => {
    const { user, logout } = useAuth0();
    return (
        <section className="relative lg:pb-24 pb-16">
            <div className="container-fluid">
                <div className="profile-banner relative text-transparent">
                    <input
                        id="pro-banner"
                        name="profile-banner"
                        type="file"
                        className="hidden"
                    />
                    <div className="relative shrink-0">
                        <img
                            src="https://img.freepik.com/premium-photo/four-wooden-blocks-with-letters-blog-bright-surface-gray-table-business-concept_384017-3526.jpg?w=2000"
                            className="h-80 w-full object-cover"
                            id="profile-banner"
                            alt=""
                        />
                        <div className="absolute inset-0 bg-black/70"></div>
                        <label
                            className="absolute inset-0 cursor-pointer"
                            htmlFor="pro-banner"
                        ></label>
                    </div>
                </div>
            </div>
            <div className="container lg:mt-24 mt-16">
                <div className="md:flex">
                    <div className="lg:w-1/4 md:w-1/3 md:px-3">
                        <div className="relative md:-mt-48 -mt-32">
                            <div className="p-6 rounded-md shadow dark:shadow-gray-800 bg-white dark:bg-slate-900">
                                <div className="profile-pic text-center mb-5">
                                    <input
                                        id="pro-img"
                                        name="profile-image"
                                        type="file"
                                        className="hidden"
                                    />
                                    <div>
                                        <div className="relative h-28 w-28 mx-auto">
                                            <img
                                                src={user.picture}
                                                className="rounded-full shadow dark:shadow-gray-800 ring-4 ring-slate-150 dark:ring-slate-800"
                                                id="profile-image"
                                                alt=""
                                                width={100}
                                            />
                                            <label
                                                className="absolute inset-0 cursor-pointer"
                                                htmlFor="pro-img"
                                            ></label>
                                        </div>
                                        <div className="mt-4">
                                            <h5 className="text-lg font-semibold">{user.name}</h5>
                                            <p className="text-slate-400">{user.email}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="border-t border-gray-100 dark:border-gray-700">
                                    <ul
                                        className="list-none sidebar-nav mb-0 mt-3"
                                        id="navmenu-nav"
                                    >
                                        <li className="navbar-item account-menu">
                                            <a
                                                href="#"
                                                className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                            >
                                                <span className="mr-2 text-[18px] mb-0">
                                                    <i className="uil uil-bell"></i>
                                                </span>
                                                <h6 className="mb-0 font-semibold">Notificaciones</h6>
                                            </a>
                                        </li>

                                        <li className="navbar-item account-menu">
                                            <a
                                                href="#"
                                                className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                            >
                                                <span className="mr-2 text-[18px] mb-0">
                                                    <i className="uil uil-setting"></i>
                                                </span>
                                                <h6 className="mb-0 font-semibold">Ajustes</h6>
                                            </a>
                                        </li>

                                        <li className="navbar-item account-menu">
                                            <button
                                                onClick={() =>
                                                    logout({ returnTo: window.location.origin })
                                                }
                                                className="navbar-link text-slate-400 flex items-center py-2 rounded"
                                            >
                                                <span className="mr-2 text-[18px] mb-0">
                                                    <i className="uil uil-power"></i>
                                                </span>
                                                <h6 className="mb-0 font-semibold">Cerrar sesion</h6>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-3/4 md:w-2/3 md:px-3 mt-[30px] md:mt-0">
                        <div className="pb-6 border-b border-gray-100 dark:border-gray-700">
                            <h5 className="text-xl font-semibold">{user.name}</h5>
                            <p className="text-slate-400 mt-3">
                                I have started my career as a trainee and prove my self and
                                achieve all the milestone with good guidance and reach up to the
                                project manager. In this journey, I understand all the procedure
                                which make me a good developer, team leader, and a project
                                manager.
                            </p>
                            <button className="mt-5 text-yellow-600 hover:bg-yellow-200 font-montserrat py-2 px-8 font-medium rounded-xl transition-all duration-300 flex">
                                <Edi size={20} /> Editar
                            </button>
                        </div>
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-[30px] pt-6">
                            <div>
                                <h5 className="text-xl font-semibold">Publicaciones</h5>
                                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                                    <div>
                                        <p className="text-slate-400 mt-3">No hay publicaciones</p>
                                        <Image src={logo} alt="logo" height={100} width={80} />
                                    </div>
                                    {/* //aca publicaciones */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
