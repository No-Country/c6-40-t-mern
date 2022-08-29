import { useAuth0 } from "@auth0/auth0-react";
import Carousel from "../components/home/Carousel";
import { useRouter } from "next/router";
import { create_publicacion } from "../lib/publicaciones.repo";
import { useState } from "react";

const Home = () => {
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
      <form onSubmit={handle_submit} method="POST">
        <label htmlFor="">title</label>
        <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} />
        <label htmlFor="">contenido</label>
        <input type="text"  onChange={(e) => setContent(e.target.value)} value={content}/>
        <button >enviar</button>
      </form>

    </div>
  );
};

export default Home;
