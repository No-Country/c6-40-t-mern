import { Card } from "../components/layout/Card";
import { AiOutlineGlobal as Global } from "react-icons/ai";

const Internacional = () => {
  return (
    <div className="flex flex-col items-center mt-5">
      <div className="mt-20 font-extrabold tracking-tight"></div>
      <h3 className="mt-10 text-2xl font-extrabold tracking-tight text-gray-900 flex items-center gap-2"><span>Internacional</span><Global /></h3>
      <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Internacional;
