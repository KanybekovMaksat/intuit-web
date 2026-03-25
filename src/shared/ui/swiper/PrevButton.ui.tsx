import { CircleArrowLeft } from "lucide-react";
import { SwiperButtonProps } from "./NextButton.ui";
import clsx from "clsx"; 

const PrevButton = ({ swiperRef, className }: SwiperButtonProps) => {
  return (
    <button
      onClick={() => swiperRef.current?.slidePrev()}
      className={clsx(
        "bg-blue/80 text-white py-2 px-4 rounded  transition",
        className
      )}
    >
<CircleArrowLeft />
    </button>
  );
};

export default PrevButton;
