import axios from "axios"
import Link from "next/link"
import { useEffect, useState } from "react"
import useSWR from "swr"
import useSWRMutation from "swr/mutation"
import { Booking, Event } from "@/lib/types"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import fetcher, { serviceEndpoints } from "@/lib"
import { toast } from "sonner"
import { useParams } from "next/navigation"
import { useRouter } from "next/router"

const formSchema = z.object({
  email: z.string().email(),
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
})

export const getServerSideProps = async () => {
  const eventsService = process.env.EVENTS_SERVICE
  const bookingsService = process.env.BOOKINGS_SERVICE

  return {
    props: {
      eventsService,
      bookingsService,
    },
  }
}

const registerForEventMutant = async (
  url: string,
  reqData: {
    arg: Pick<Booking, "firstName" | "lastName" | "email" | "eventId" | "phone">
  }
) => {
  try {
    const { data } = await axios.post(url, reqData.arg)
    return data
  } catch (e) {
    throw e
  }
}

export default function EventPage({
  eventsService,
  bookingsService,
}: {
  bookingsService: string
  eventsService: string
}) {
  const { id } = useRouter().query

  const [isBookingModalOpened, setIsBookingModalOpened] = useState(false)

  const {
    data: eventData,
    error,
    isLoading,
  } = useSWR<Event>(`${eventsService}/events/${id}`, fetcher)

  const {
    data,
    trigger: registerForEvent,
    error: bookingError,
  } = useSWRMutation(`${bookingsService}/bookings`, registerForEventMutant, {
    onSuccess: () => {
      setIsBookingModalOpened(false)
      toast.success("Event booked successfully")
    },
    onError: (e) => {
      console.error(e)
      toast.error("Error booking event")
    },
  })

  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
  })

  if (isLoading) return <div>Loading...</div>
  if (!eventData) return <div>Event not found</div>
  if (error) return <div>Error loading events</div>

  const onSubmit = handleSubmit((data) => {
    registerForEvent({
      ...data,
      eventId: eventData.id,
    })
  })

  return (
    <div className="pt-10">
      <main className="p-4 sm:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <img
              alt="Event Image"
              className="aspect-square object-cover border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
              height={500}
              src={eventData.imageURL ?? "/placeholder.svg"}
              width={500}
            />
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{eventData.name}</h1>
            <p className="text-gray-500 dark:text-gray-400">
              {new Date(eventData.createdAt).toDateString()} -{" "}
              {eventData.location}
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              {eventData.description}
            </p>
            <Link
              onClick={() => setIsBookingModalOpened(true)}
              className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              href="#"
            >
              Book Now
            </Link>
          </div>
        </div>
      </main>

      <div
        className={`fixed inset-0  items-center justify-center bg-black bg-opacity-50 z-50 ${isBookingModalOpened ? "flex" : "hidden"}`}
        id="booking-modal"
      >
        <div className="bg-white rounded-lg p-8 w-full max-w-md mx-auto">
          <img
            alt={eventData.name}
            title={eventData.name}
            height={40}
            width={200}
            className="m-auto"
            src="/globoticket-dark.svg"
          />
          <p className="mb-4 text-gray-400 text-sm text-center">
            Enter your details below to book your place for the upcoming event -{" "}
            {eventData.name}{" "}
          </p>
          <form className="space-y-4">
            <div className="flex items-center gap-2 text-black">
              <input
                className="block w-full p-2 border border-gray-300 rounded-md"
                placeholder="First Name"
                {...register("firstName")}
              />
              {errors.firstName && (
                <p className="text-red-800 text-xs">
                  {errors.firstName.message}
                </p>
              )}
              <input
                className="block w-full p-2 border border-gray-300 rounded-md"
                placeholder="Last Name"
                {...register("lastName")}
              />
              {errors.lastName && (
                <p className="text-red-800 text-xs">
                  {errors.lastName.message}
                </p>
              )}
            </div>
            <input
              className="block w-full p-2 border border-gray-300 rounded-md text-black"
              placeholder="Email Address"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-800 text-xs">{errors.email.message}</p>
            )}
            <input
              className="block w-full p-2 border border-gray-300 rounded-md text-black"
              placeholder="Phone Number"
              type="tel"
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-800 text-xs">{errors.phone.message}</p>
            )}
            <button
              disabled={!isValid}
              onClick={onSubmit}
              className="w-full p-2 bg-gray-900 text-white rounded-md disabled:opacity-50"
              type="submit"
            >
              Confirm Booking
            </button>
            <button
              className="w-full p-2 border-gray-900 border rounded-md text-gray-900"
              onClick={(e) => {
                e.preventDefault()
                setIsBookingModalOpened(false)
              }}
            >
              Cancel Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
