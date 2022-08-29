import { Card } from "../components/layout/Card";
import { MdSportsSoccer as Sport } from "react-icons/md";
import { articuloUser } from "../hooks/publicaionesUser";
import { useAuth0 } from "@auth0/auth0-react";
import { delete_publicacion } from "../lib/publicaciones.repo";
import { ThreeDots } from "react-loader-spinner";
import { useEffect, useState } from "react";

const Deportes = () => {
<<<<<<< HEAD
  const { data: articulo, mutate } = articuloUser();
=======
  //const { data: publicaciones, mutate } = publicacionesUser();
>>>>>>> 83eee4e2d5690af6c66300c35c900edf0b243336
  const { getAccessTokenSilently } = useAuth0();

  const [articles, setArticles] = useState([])

  const category = 'espectaculos'

  useEffect((): void => {
    fetch(`http://localhost:5000/api/v1/article/category/${category}`)
      .then(res => res.json())
      .then(res => {
        setArticles(res)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])


  return (
    <div className="flex flex-col items-center mt-5">
      <div className="mt-20 font-extrabold tracking-tight"></div>
      <h3 className="mt-10 text-2xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2">
        <span>Deportes</span>
        <Sport />
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
<<<<<<< HEAD
        {!articulo && <div><ThreeDots  color="#9c6419" height={120} width={120} /></div> }
        {articulo && articulo.map((articulos)=>

        <Card
        
        articulo={articulos}
        showDetail
        onDelete={async (articulo_id) => {
          const token = await getAccessTokenSilently();
          console.log("deleting...", articulo_id);
          await delete_publicacion(articulo_id, token);
          mutate();
          console.log("DELETED!!");
        }}
        />
=======
        {!articles && <div><ThreeDots color="#9c6419" height={120} width={120} /></div>}
        {articles && articles.map((publicacion) =>

          <Card

            publicaciones={publicacion}
            showDetail
            onDelete={async (product_id) => {
              const token = await getAccessTokenSilently();
              console.log("deleting...", product_id);
              await delete_publicacion(product_id, token);
              //mutate();
              console.log("DELETED!!");
            }}
          />
>>>>>>> 83eee4e2d5690af6c66300c35c900edf0b243336

        )}
      </div>
    </div>
  );
};

export default Deportes;
