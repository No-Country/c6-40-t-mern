import { Card } from "../components/layout/Card";
import { MdSportsSoccer as Sport } from "react-icons/md";
import { publicacionesUser } from "../hooks/publicaionesUser";
import { useAuth0 } from "@auth0/auth0-react";
import { delete_publicacion } from "../lib/publicaciones.repo";

const Deportes = () => {
  const { data: publicaciones, mutate } = publicacionesUser();
  const { getAccessTokenSilently } = useAuth0();
  return (
    <div className="flex flex-col items-center mt-5">
      <div className="mt-20 font-extrabold tracking-tight"></div>
      <h3 className="mt-10 text-2xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2">
        <span>Deportes</span>
        <Sport />
      </h3>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {!publicaciones && <p>loading....</p>}
        {publicaciones && publicaciones.map((publicacion)=>

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
  );
};

export default Deportes;
