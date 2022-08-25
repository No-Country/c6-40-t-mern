import { useAuth0 } from "@auth0/auth0-react";
import Carousel from "../components/home/Carousel";

const Home = () => {
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
    </div>
  );
};

export default Home;
