import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { MdFavorite } from "react-icons/md"
import { ThreeDots } from "react-loader-spinner"


const Article = () => {

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

    console.log(articleContent)

    return (
        <>
            {Object.keys(articleContent).length === 0 ? <div><ThreeDots color="#9c6419" height={120} width={120} /></div> :
                <>
                    <header>
                        <div className="max-w-screen-lg m-auto mt-20">
                            <div className="w-full relative select-none">
                                {articleContent?.img && <img src={articleContent?.img.url} alt={articleContent?.img.name} />}
                            </div>
                        </div>
                        <h1 className="mt-20 text-3xl lg:flex lg:flex-row lg:items-center lg:justify-center gap-2 ">
                            {articleContent?.title}
                        </h1>
                        {articleContent?.resume && <h4 className="text-xl font-semibold">{articleContent?.resume}</h4>}
                        <h6 className="mb-0 font-semibold">{articleContent?.createdAt}</h6>
                        <span><MdFavorite size={25} />{articleContent?.favorites}</span>
                    </header>
                    <main>
                        {articleContent?.content}
                    </main>
                    <div>
                        <h6 className="mb-0 font-semibold">{articleContent?.tags.join()}</h6>
                    </div>
                </>
            }
        </>
    )
}

export default Article