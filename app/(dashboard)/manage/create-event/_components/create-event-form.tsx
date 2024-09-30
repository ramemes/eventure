"use client"
 
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useState } from "react";
import { convertToUTCTimestamp, getCurrentDate } from "@/utils";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  title: z.string({
    required_error: "A date is required for your event.",
  })
    .min(1, {
      message: "Event title is required.",
    })
    .max(70),
  description: z.string()
    .min(1, {
      message: "Description is required.",
    })
    .max(150),
  date: z.date({
      required_error: "A date is required for your event.",
    })
  })


export const CreateEventForm = () => {

  const router = useRouter()
  const {mutate, pending} = useApiMutation(api.events.createEvent)
  const [startTime, setStartTime] = useState<string>("00:00");
  const [endTime, setEndTime] = useState<string>("00:00");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  })


  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const startTimeStamp = convertToUTCTimestamp(values.date, startTime)
    const endTimeStamp = convertToUTCTimestamp(values.date, endTime)


    mutate({
      title: values.title,
      description: values.description,
      startTime: startTimeStamp,
      endTime: endTimeStamp,
    })
    .then((eventId) => {
      toast.success("Event created");
      router.push(`/`)
    })
    .catch((err) => {
      toast.error("Error creating event")
    })
  }
  
  return (
    <div className="w-full p-8 max-w-4xl rounded-lg border-2 border-gray-200">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

          <FormField 
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Title</FormLabel>
                <FormDescription>
                  Provide a clear and descriptive title for what your event is about.
                </FormDescription>
                <FormControl>

                  <div className="flex flex-col">
                    <Input  {...field} className="focus:ring-1 hover:ring-1 h-12 ring-gray-200" maxLength={70}/>
                    <p className="self-end text-xs p-1 text-gray-600">{form.getValues().title.length}/70</p>
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField 
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormDescription>
                  Provide a description for what your event is about.
                </FormDescription>
                <FormControl>
                  <div className="flex flex-col">
                    <Textarea placeholder="" {...field} className="focus:ring-1 hover:ring-1 h-12 ring-gray-200  max-h-32" maxLength={150}/>
                    <p className="self-end text-xs p-1 text-gray-600">{form.getValues().description.length}/150</p>
                  </div>
                </FormControl>
                <FormMessage className="text-xs"/>
              </FormItem>
            )}
          />



          <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Event date</FormLabel>
              <FormDescription>
                Pick a date and time period for your event.
              </FormDescription>
              <div className="flex flex-row gap-2 items-center">
                <div>
                  <p className="text-xs relative left-2 px-1 top-2 text-zinc-400 bg-white w-fit pointer-events-none rounded-md">Date</p>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a Date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(getCurrentDate())
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
               

                <div>
                  <p className="text-xs relative left-2 px-1 top-2 text-zinc-400 bg-white w-fit pointer-events-none">Start time</p>
                  <Input         
                      className="w-24 text-center pl-4 cursor-pointer focus:ring-1 hover:ring-1  ring-gray-300"
                      placeholder="00:00"
                      maxLength={5}
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                </div>
                <div>
                  <p className="text-xs relative left-2 px-1 top-2 text-zinc-400 bg-white w-fit pointer-events-none">End time</p>
                  <Input         
                      className="w-24 text-center pl-4 cursor-pointer focus:ring-1 hover:ring-1  ring-gray-300"
                      placeholder="00:00"
                      maxLength={5}
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                </div>         

              </div>

              <FormMessage />
            </FormItem>
          )}
        />

          <Button type="submit" disabled={pending}>Submit</Button>
        </form>
      </Form>
    </div>

  )
};
