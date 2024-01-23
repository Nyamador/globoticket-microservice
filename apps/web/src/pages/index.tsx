import Image from "next/image"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"] })

import EventListCard from "@/components/EventListCard"
import { Event } from "@/lib/types"
import useSWR from "swr"

export default function Home({ events }: { events: Event[] }) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      {!events ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {events.map((event) => (
            <EventListCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </main>
  )
}

export async function getServerSideProps() {
  const eventsService = process.env.EVENTS_SERVICE
  const url = `${eventsService}/events`

  try {
    const res = await fetch(url)
    const events: Event[] = await res.json()

    return {
      props: {
        events,
      },
    }
  } catch (error) {
    console.error("Error fetching events:", error)
    return {
      props: {
        events: [],
      },
    }
  }
}
