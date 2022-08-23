import { MdFavoriteBorder as Favorite } from "react-icons/md";
import { MdDeleteSweep as Dele } from "react-icons/md";
import { FiEdit as Edi } from "react-icons/fi";
import { useAuth0 } from "@auth0/auth0-react";
import { Publicaciones } from "../../hooks/publicaionesUser";
import { useState } from "react";
import { useRouter } from "next/router";
import { AiFillCheckCircle as CheckIcon } from "react-icons/ai";
import { TiDeleteOutline as Delet } from "react-icons/ti";

interface PublicacionesCardProps {
    publicaciones: Publicaciones;
    showDetail?: boolean;
    onDelete: (product_id: string) => void;
}

export const Card: React.FC<PublicacionesCardProps> = ({
    publicaciones,
    showDetail = false,
    onDelete,
}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { user } = useAuth0();
    console.log(user);
    
    const router = useRouter();

    return (
        <div className="flex flex-col rounded shadow-xl max-w-sm">
            <div className="relative bottom-0 left-0">
                <button className="absolute h-13 w-13 p-3 m-3 right-0 justify-center rounded-full bg-transparent hover:bg-red-500 text-red-700 hover:text-white hover:border-transparent animate-pulse">
                    <i className="flex flex-row items-center"><Favorite size={25} /></i>
                </button>
            </div>
            <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={publicaciones.img.url} alt={publicaciones.img.name} />
            </div>
            <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                    <a href="#" className="block">
                        <h3 className="mt-2 text-xl leading-7 font-semibold text-gray-900">
                            {publicaciones.title}
                        </h3>
                        <p className="mt-3 text-base leading-6 text-gray-500">
                            {publicaciones.content}
                        </p>
                    </a>
                </div>
                <div className="mt-2">
                    <a className="text-teal-400 hover:text-teal-900 text-sm transition duration-150 ease-in-out" href="#">Read more
                        <svg className="chev inline-block ml-1 w-2 h-2 stroke-2 stroke-current" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <g fill-rule="evenodd">
                                <path d="M1 1l4 4-4 4"></path>
                            </g>
                        </svg>
                        <svg className="arr hidden hover:inline-block ml-1 w-2 h-2 stroke-2 stroke-current" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                            <g fill-rule="evenodd">
                                <path d="M0 5h7"></path>
                                <path d="M4 1l4 4-4 4"></path>
                            </g>
                        </svg>
                    </a>
                    {user && (<>
                        <button className="text-yellow-600 hover:bg-yellow-200 font-montserrat py-2 px-8 font-medium rounded-xl transition-all duration-300"> <Edi size={20} /> </button>
                        <button
                            disabled={isSubmitted}
                            onClick={() => {
                                setIsSubmitted(true);
                                setTimeout(() => {
                                    onDelete(publicaciones._id);
                                    router.push("/deportes");
                                }, 2000);

                            }}
                            className={`p-1.5 rounded-md flex gap-1 items-center text-white cursor-pointer mt-7 ${isSubmitted
                                    ? "bg-red-900 from-green-400 to-green-700"
                                    : "bg-red-500 hover:bg-red-600 hover:text-black hover:shadow-md hover:shadow-red-600 "
                                }`}
                        >
                            {!isSubmitted && (
                                <>
                                    <Delet />{" "}
                                </>
                            )}
                            {isSubmitted && (
                                <>
                                    <CheckIcon />
                                </>
                            )}{" "} <Dele size={20} /> </button>
                    </>)}
                </div>
                <div className="mt-6 flex items-center">
                    <div className="flex-shrink-0">
                        <a href="#">
                            <img className="h-10 w-10 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7HjQfYqYBsspqy-iV0-Cw5uHo-cH-3TbhbAugLXu7RnL9lmqiPZUkqBy-XpKfandg7FQ&usqp=CAU" alt="" />
                        </a>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm leading-5 font-medium text-gray-900">
                            <a href="#" className="hover:underline">
                                Fulanito Perez
                            </a>
                        </p>
                        <div className="flex text-sm leading-5 text-gray-500">
                            <time dateTime="2020-03-16">
                                Ago 15, 2022
                            </time>
                            <span className="mx-1">
                                ·
                            </span>
                            <span>
                                13 min read
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}