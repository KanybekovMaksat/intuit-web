import SwiperInstance from 'swiper';
import clsx from 'clsx';
import { CircleArrowRight } from 'lucide-react';

export interface SwiperButtonProps {
  swiperRef: React.MutableRefObject<any>;
  className?: string;
}

const NextButton = ({ swiperRef, className }: SwiperButtonProps) => {
  return (
    <button
      onClick={() => swiperRef.current?.slideNext()}
      className={clsx(
        'bg-blue text-white py-2 px-4 rounded hover:bg-orange-700 transition',
        className
      )}
    >
      <CircleArrowRight />
    </button>
  );
};

export default NextButton;
