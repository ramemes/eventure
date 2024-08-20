import { Loader2Icon } from "lucide-react";

export const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col
    justify-center items-center">

      <Loader2Icon className="animate-spin"/>
    </div>
  )
}