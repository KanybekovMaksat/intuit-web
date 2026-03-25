import React from "react";



export const HomeHeader: React.FC = () => {
  return (
    <div className="">
      <div className="container mx-auto">
        <div className="flex justify-center px-5 py-10 sm:px-5 sm:py-4">
          <h3
            className="text-green text-3xl font-extrabold font-roboto 
            sm:text-[27px] xs:text-[24px] xxs:text-[22px] text-center"
          >
           <span className="text-blue">KESIP</span>  TANDA 
          </h3>
        </div>
      </div>
    </div>
  );
};
