import { Button } from "@/components/ui/button";
import React from "react";

export default function Box(): JSX.Element {
  // Navigation button data for easy mapping
  const navButtons = [
    { text: "校際戰績", color: "bg-[#38a1db]" },
    { text: "個人成就", color: "bg-[#38a1db]" },
    { text: "紅利領取", color: "bg-[#38a1db]" },
    { text: "活動辦法", color: "bg-[#38a1db]" },
    { text: "登入", color: "bg-[#c92a2e]" },
  ];

  return (
    <div className="relative w-full h-[81px]">
      <header className="fixed w-full h-[81px] top-0 left-0 bg-white flex items-center justify-between px-10">
        {/* Logo section */}
        <div className="flex items-center h-[34px]">
          <div className="relative h-[34px] w-[29px] mr-2">
            <img
              className="absolute w-[9px] h-[9px] top-0 left-[17px]"
              alt="Logo element"
              src=""
            />
            <img
              className="absolute w-5 h-[23px] top-[11px] left-2.5"
              alt="Logo element"
              src=""
            />
            <img
              className="absolute w-[21px] h-[25px] top-[5px] left-0"
              alt="Logo element"
              src=""
            />
            <img
              className="absolute w-[11px] h-[18px] top-[11px] left-2.5"
              alt="Logo element"
              src=""
            />
            <img
              className="absolute w-[9px] h-[11px] top-[17px] left-4"
              alt="Logo element"
              src=""
            />
          </div>

          <div className="relative h-7 w-[100px]">
            <img
              className="absolute w-[18px] h-7 top-0 left-0"
              alt="Logo text"
              src=""
            />
            <img
              className="absolute w-[85px] h-7 top-0 left-4"
              alt="Logo text"
              src=""
            />
          </div>

          <img className="w-4 h-7 ml-3" alt="Logo separator" src="" />
        </div>

        {/* Navigation buttons */}
        <nav className="flex space-x-4">
          {navButtons.map((button, index) => (
            <Button
              key={index}
              className={`h-11 w-[141px] rounded-[30.5px] ${button.color} hover:opacity-90`}
            >
              <span className="[font-family:'Inter-Regular',Helvetica] font-normal text-white text-[22px]">
                {button.text}
              </span>
            </Button>
          ))}
        </nav>
      </header>
    </div>
  );
}

