import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import CardContainer from "../../components/layout/CardContainer";

const Category = () => {

  const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT
  const router = useRouter()
  const { category } = router.query

  const [articles, setArticles] = useState([])

  useEffect((): void => {
    fetch(`${API_ENDPOINT}/article/category/${category}`)
      .then(res => res.json())
      .then(res => {
        setArticles(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [category])


  return (
    <div className="flex flex-col items-center mt-5">
      <div className="mt-20 font-extrabold tracking-tight"></div>
      <h3 className="mt-10 text-2xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2">
        <span>{category}</span>
      </h3>
      <CardContainer articles={articles} />
    </div>
  );
};

export default Category;