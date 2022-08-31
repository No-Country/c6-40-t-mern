import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useState } from "react";
import Carousel from "../components/home/Carousel";
import CardContainer from "../components/layout/CardContainer";

const Home = () => {

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT
  const [articles, setArticles] = useState([])

  useEffect((): void => {
    fetch(`${API_ENDPOINT}/article/all`)
      .then(res => res.json())
      .then(res => {
        setArticles(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

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