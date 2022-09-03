import { ThreeDots } from 'react-loader-spinner'
import { Card } from './Card'

const CardContainer = ({ articles }) => {
    return (
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {!articles || articles?.length === 0 ? <div><ThreeDots color="#9c6419" height={120} width={120} /></div>
                : articles.map((article) =>
                    <Card
                        publicaciones={article}
                        showDetail
                        key={article._id}
                    />
                )}
        </div>
    )
}

export default CardContainer