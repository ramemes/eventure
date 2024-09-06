import { formatTimestamp } from "@/utils";
import Link from "next/link";

interface EventCardProps {
  id: string;
  creationTime: number;
  title: string;
  startTime: number;
  endTime: number;
  description: string;
  creatorId: string;
  creatorName: string;
}

export const EventCard = ({
  id,
  creationTime,
  title,
  startTime,
  endTime,
  description,
  creatorId,
  creatorName
}: EventCardProps) => {

  const formattedDate = `${formatTimestamp(startTime, false)} ${formatTimestamp(endTime, true)}`

  return (
    <Link href={`/event/${id}`}>
      <div className="flex flex-col rounded-md hover:shadow-[0_5px_20px_-5px_rgba(0,0,0,0.2)] cursor-pointer transition">
        <div className="aspect-video bg-blue-200 rounded-sm">
          
        </div>
        <div className="p-2 flex flex-col">
          <p className="font-medium">
            {title}
          </p>
          <p className="font-medium text-sm">
            {formattedDate}
          </p>
          <p className="font-normal text-sm">
            Location
          </p>
          <p className="font-normal text-sm">
            Free
          </p>
          <p className="font-medium text-sm text-opacity-80">
            {creatorName}
          </p>
        </div>
      </div>
    </Link>


  )
};

