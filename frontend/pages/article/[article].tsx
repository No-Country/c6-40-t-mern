import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { MdFavorite, MdFavoriteBorder } from "react-icons/md"
import { ThreeDots } from "react-loader-spinner"
import parse from "html-react-parser"
import { useAuth0 } from "@auth0/auth0-react"


const Article = () => {

    const { user } = useAuth0()

    const API_ENDPOINT = process.env.NEXT_PUBLIC_API_ENDPOINT
    const router = useRouter()
    const { article } = router.query

    const [articleContent, setArticleContent] = useState({})

    useEffect((): void => {
        fetch(`${API_ENDPOINT}/article/${article}`)
            .then(res => res.json())
            .then(res => {
                setArticleContent(res)
            })
            .catch(err => {
                console.log(err)
            })
    }, [article])

    const [loadingFavorite, setLoadingFavorite] = useState(false)

    const handleAddFavorite = () => {
        setLoadingFavorite(true)
        fetch(`${API_ENDPOINT}/user/favorites/${user.sub}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ article_id: article })
        })
    }


    return Object.keys(articleContent).length === 0 ? <div><ThreeDots color="#9c6419" height={120} width={120} /></div> :
        <>
            <header className="w-full flex justify-center items-center">
                <div className="items-center flex flex-col w-full md:w-4/5 lg:w-1/2 2xl:w-5/6">
                    <div className="max-w-screen-lg m-auto mt-20">
                        <div className="w-full relative select-none">
                            {articleContent?.img && <img src={articleContent?.img.url} alt={articleContent?.img.name} />}
                        </div>
                    </div>
                    <h1 className="mt-20 text-5xl lg:flex lg:flex-row lg:items-center lg:justify-center gap-2 ">
                        {articleContent?.title}
                    </h1>
                    {articleContent?.resume && <h4 className="text-xl font-semibold">{articleContent?.resume}</h4>}
                    <h6 className="mb-0 font-semibold">{articleContent?.createdAt}</h6>
                    <span>
                        <button disabled={loadingFavorite} onClick={handleAddFavorite} className="justify-center rounded-full bg-transparent hover:bg-red-500 text-red-700 hover:text-white">
                            <i className="flex flex-row items-center">
                                {loadingFavorite ? <MdFavorite size={25} />
                                    : <MdFavoriteBorder size={25} />}
                            </i>
                        </button>
                        {articleContent?.favorites}
                    </span>
                </div>
            </header>
            <main className="w-full flex justify-center items-center">
                <div className="mt-4 bg-slate-700 p-5 rounded-md text-white items-center flex flex-col w-full md:w-4/5 lg:w-1/2 2xl:w-1/2">
                    {parse(articleContent?.content)}
                </div>
            </main>
            <div>
                <h6 className="mb-0 font-semibold">{articleContent?.tags.join()}</h6>
            </div>
        </>

}

export default Article