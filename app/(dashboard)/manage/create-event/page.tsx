"use client";

import { CreateEventForm } from "./_components/create-event-form";

const CreateEventPage = () => {
  return (
    <div className="flex flex-col items-center p-8 w-full min-h-screen">
      <div className="w-full max-w-4xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-6">Create a New Event</h2>
        <p className="text-lg text-gray-500 mb-10">
          Fill out the form below to create an event. Make sure to provide accurate details.
        </p>
        <CreateEventForm />
      </div>
    </div>
  );
};

export default CreateEventPage;
