import { Button } from "@/components/ui/button";
import { btnStyles, iconStyles } from "@/styles/styles";
import { Plus } from "lucide-react";

export const CreateEventButton = () => {
  return (
    <Button className={btnStyles}>
      <Plus className={iconStyles}/>
      Create Event
    </Button>
  )
};

