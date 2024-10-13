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
    <Link href={`/event/${id}`} passHref>
      <div
        className="flex flex-col rounded-lg shadow-lg cursor-pointer bg-white overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl hover:scale-[1.02]"
      >
        {/* event image */}
        <div className="aspect-video bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xl">
          <span>{title.charAt(0)}</span>
        </div>

        {/* event details */}
        <div className="p-4 flex flex-col space-y-2">
          <h2 className="font-semibold text-lg text-gray-800 truncate">
            {title}
          </h2>
          <p className="text-sm text-gray-600 h-12">{formattedDate}</p>
          <p className="text-sm text-gray-500 overflow-clip h-14">{description}</p>

          <div className="flex justify-between items-center mt-3">
            <span className="text-sm text-indigo-600 font-semibold">Free</span>
          </div>
        </div>
      </div>
    </Link>
  );
};


