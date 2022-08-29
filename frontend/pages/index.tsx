import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Carousel from "../components/home/Carousel";
<<<<<<< HEAD
import { useRouter } from "next/router";
import { create_publicacion } from "../lib/publicaciones.repo";
import { useState } from "react";
=======
import { Card } from "../components/layout/Card";
import { publicacionesUser } from "../hooks/publicaionesUser";
import { delete_publicacion } from "../lib/publicaciones.repo";
>>>>>>> 83eee4e2d5690af6c66300c35c900edf0b243336

const Home = () => {

  const { data: articles, mutate } = publicacionesUser();
  const { getAccessTokenSilently } = useAuth0()

  const { user } = useAuth0();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
   const [img, setImg] = useState("");
  // const [price, setPrice] = useState("");
  

  const router = useRouter();

  const { getAccessTokenSilently } = useAuth0();
  const handle_submit = async (e) => {
    e.preventDefault()
    const token = await getAccessTokenSilently();
    await create_publicacion(
      {
       title,
       content,
      
      },
      token
    );
    console.log("CREATED PUBLICACION!!");
    setTimeout(() => {
      router.push("/deportes");
    }, 1000);
  };
  return (
    <div>
      {user && (
        <p className="mt-20 text-3xl lg:flex lg:flex-row lg:items-center lg:justify-center gap-2 ">
          Hola <p className="text-3xl text-yellow-700">{user.name}</p>
          bienvenido a .blog
        </p>
      )}
      <Carousel />
<<<<<<< HEAD
      <form onSubmit={handle_submit} method="POST">
        <label htmlFor="">title</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
        <label htmlFor="">contenido</label>
        <input type="text"  onChange={(e) => setContent(e.target.value)} value={content}/>
        <button >enviar</button>
      </form>

=======
      <div className="flex flex-col items-center mt-5">
        <div className="mt-20 font-extrabold tracking-tight"></div>
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {!articles ? <div><ThreeDots color="#9c6419" height={120} width={120} /></div>
            : articles.map((publicacion) =>
              <Card
                publicaciones={publicacion}
                showDetail
                onDelete={async (product_id) => {
                  const token = await getAccessTokenSilently();
                  console.log("deleting...", product_id);
                  await delete_publicacion(product_id, token);
                  mutate();
                  console.log("DELETED!!");
                }}
              />
            )}
        </div>
      </div>
>>>>>>> 83eee4e2d5690af6c66300c35c900edf0b243336
    </div>
  )
};

export default Home;
