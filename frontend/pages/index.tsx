import { useAuth0 } from "@auth0/auth0-react";
import Carousel from "../components/home/Carousel";
import CardContainer from "../components/layout/CardContainer";
import { publicacionesUser } from "../hooks/publicaionesUser";

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
        <CardContainer articles={articles} />
      </div>
    </div>
  )
};

export default Home;