import React from 'react';

function Unauthorised(){
  return (
    <div className="min-h-screen bg-[#1C2127] flex items-center justify-center relative overflow-hidden">
      <div className="absolute left-10 top-[230px] text-white font-poppins text-[30px] font-medium">
        You are not authorized.
      </div>
      <div className="absolute left-10 top-[280px] text-white font-poppins text-[18px] font-light w-[360px]">
        You tried to access a page you did not have prior authorization for.
      </div>

      <div className="absolute right-8">
        <div className="text-[90px] text-[#5BE0B3] font-varela text-center tracking-widest animate-flux">403</div>

        <div className="h-[495px] w-[295px] rounded-t-[90px] bg-[#8594A5] flex justify-center items-center">
          <div className="h-[450px] w-[250px] rounded-t-[70px] bg-[#A0AEC0] relative">
            <div className="absolute mt-[220px] ml-[20px] h-[70px] w-[25px] bg-[#CBD8E6] rounded-md"></div>
            <div className="absolute mt-[250px] ml-[30px] h-2 w-[50px] bg-[#EBF3FC] rounded-md"></div>

            <div className="relative w-[130px] h-[40px] bg-[#1C2127] mx-auto mt-[80px] rounded-sm">
              <div className="absolute top-[15px] left-[25px] h-[5px] w-[15px] bg-white rounded-full animate-eye"></div>
              <div className="absolute top-[15px] left-[65px] h-[5px] w-[15px] bg-white rounded-full animate-eye"></div>
              <div className="absolute top-0 left-0 h-[40px] w-[130px] bg-[#8594A5] rounded-sm animate-leaf origin-right"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Unauthorised;