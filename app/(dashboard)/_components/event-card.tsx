
interface EventCardProps {
  id: string;
  creationTime: number;
  title: string;
  date: number;
  description: string;
  creatorId: string;
  creatorName: string;
}

export const EventCard = ({
  id,
  creationTime,
  title,
  date,
  description,
  creatorId,
  creatorName
}: EventCardProps) => {

  
  return (
    <div className="flex flex-col bg-red-500">
      <h2 className=" font-bold">
        {title}
      </h2>
      <p>
        {creatorName}
      </p>
    </div>
  )
};

