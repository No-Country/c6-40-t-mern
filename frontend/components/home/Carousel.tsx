import { useEffect, useRef, useState } from "react";
import { AiOutlineVerticalRight as ArrowP, AiOutlineVerticalLeft as ArrowN } from "react-icons/ai";

const featuredImages = [
  "https://img.freepik.com/premium-photo/four-wooden-blocks-with-letters-blog-bright-surface-gray-table-business-concept_384017-3526.jpg?w=2000",
  "https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/3601081/pexels-photo-3601081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

let count = 0;
let slideInterval;

const Carousel = () => {
  const handleOnNextClick = () => {
    count = (count + 1) % featuredImages.length;
    setCurrentIndex(count);
  };

  const handleOnPrevClick = () => {
    const productsLength = featuredImages.length;
    count = (currentIndex + productsLength - 1) % productsLength;
    setCurrentIndex(count);
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    startSlider();
    slideRef.current.addEventListener("animationend", removeAnimation);
    slideRef.current.addEventListener("mouseenter", pauseSlider);
    slideRef.current.addEventListener("mouseleave", startSlider);

    return () => {
      clearInterval(slideInterval);
    };
  }, []);

  const startSlider = () => {
    slideInterval = setInterval(() => {
      handleOnNextClick();
    }, 3000);
  };

  const slideRef: any = useRef();

  const removeAnimation = () => {
    slideRef.current.classList.remove("fade-anim");
  };

  const pauseSlider = () => {
    clearInterval(slideInterval);
  };

  return (
    <div className="max-w-screen-lg m-auto mt-20">
      <div ref={slideRef} className="w-full relative select-none">
        <img src={featuredImages[currentIndex]} alt="..." className=""/>

        <div className="absolute w-full top-1/2 transform -translate-y-1/2 flex justify-between items-start px-3">
          <button
            className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
            onClick={handleOnPrevClick}
          >
            <ArrowP size={35} />
          </button>
          <button
            className="bg-black text-white p-1 rounded-full bg-opacity-50 cursor-pointer hover:bg-opacity-100 transition"
            onClick={handleOnNextClick}
          >
            <ArrowN size={35} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;