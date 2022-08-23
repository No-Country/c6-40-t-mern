import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { create_publicacion } from "../lib/publicaciones.repo";

const Home = () => {


  const [title, seTitle] = useState("");
  const [content, setContent] = useState("");
   const [_id, setId] = useState("");
  // const [img, setImg] = useState("");
 

  const router = useRouter();

  const { getAccessTokenSilently } = useAuth0();

  const handle_submit = async () => {
    const token = await getAccessTokenSilently();
    await create_publicacion(
      {
        title,
        content,
        _id,
      },
      token
    );
  
    console.log("CREATED PUBLICIDAD!!");
    setTimeout(() => {
      router.push("/deportes");
    }, 1000);
  };

  return (
    <div>
      <p className="mt-20">todo sobre nosotros............</p>
      <p>title</p>
      <input type="text" />
      <p>content</p>
      <input type="text" />
      <button onClick={handle_submit}
          type="button" >enviar</button>
    </div>
  );
};

export default Home;
