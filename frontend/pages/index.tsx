import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import Carousel from "../components/home/Carousel";
import { Card } from "../components/layout/Card";
import { publicacionesUser } from "../hooks/publicaionesUser";
import { delete_publicacion } from "../lib/publicaciones.repo";

const Home = () => {

  const { data: articles, mutate } = publicacionesUser();
  const { getAccessTokenSilently } = useAuth0()

  const { user } = useAuth0();
  return (
    <div>
      {user && (
        <p className="mt-20 text-3xl lg:flex lg:flex-row lg:items-center lg:justify-center gap-2 ">
          Hola <p className="text-3xl text-yellow-700">{user.name}</p>
          bienvenido a .blog
        </p>
      )}
      <Carousel />
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
    </div>
  )
};

export default Home;
