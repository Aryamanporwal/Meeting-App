import React from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils';

interface HomeCardProps {
    img: string;
    title: string;
    description: string;
    handleClick: () => void;
    style ?: React.CSSProperties;
}
const HomeCard = ({img, title, description, handleClick, style }: HomeCardProps) => {
  return (
        <div className={cn("px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer")}onClick={handleClick}
            style={style}
        >
        <div
          className="flex-center size-12 rounded-[10px]"
          style={{
            background: "rgba(255, 255, 255, 0.25)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
        > <Image src = {img} alt = "add-meeting" width  = {27} height = {27} /></div>
          <div className = "flex flex-col gap-2">
            <h1 className = "text-2xl font-bold">{title}</h1>
            <p className = "text-lg font-normal">{description}</p>
          </div>
      </div>
  )
}

export default HomeCard