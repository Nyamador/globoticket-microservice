"use client"
import { useRouter } from "next/navigation"
import React from "react"
import { Event } from "../lib/types"
import Image from "next/image"

interface EventListCardProps {
  event: Event
}

const EventListCard: React.FC<EventListCardProps> = ({ event }) => {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center space-y-4">
      <Image
        alt={event.name}
        title={event.name}
        className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
        height={300}
        src={event.imageURL ?? "/placeholder.svg"}
        width={300}
      />
      <h3 className="font-bold text-lg">{event.name}</h3>
      <p className="text-gray-500 dark:text-gray-400">
        {new Date(event.createdAt).toDateString()} - {event.location}
      </p>
      <button
        onClick={() => router.push(`/event/${event.id}`)}
        className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
      >
        Book Now
      </button>
    </div>
  )
}

export default EventListCard
