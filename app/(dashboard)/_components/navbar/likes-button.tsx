import { iconStyles } from "@/styles/styles";
import { Heart } from "lucide-react";

export const LikesButton = () => {
  return (
    <div 
      className="flex items-center gap-2 cursor-pointer p-2 px-3 
      rounded-xl hover:opacity-80 hover:bg-gray-100"
    >
      <Heart className={iconStyles}/>
      Likes
    </div>
  )
};

