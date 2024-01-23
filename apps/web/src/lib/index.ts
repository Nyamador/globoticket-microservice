import axios, { AxiosError, AxiosResponse } from "axios"

interface ApiResponse {
  // Define the structure of your API response
  // Adjust this based on the actual structure of your API response
  data: any
}

const fetcher = async <T>(url: string): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.get(url)
    return response.data as T
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ApiResponse>
      // Handle specific error cases if needed
      console.error("Axios error:", axiosError.message)
      throw axiosError
    } else {
      // Handle non-Axios errors
      console.error("Non-Axios error:", error)
      throw error
    }
  }
}

export default fetcher

type Services = "events" | "bookings"

export const serviceEndpoints: Record<Services, string | undefined> = {
  events: process.env.EVENTS_SERVICE,
  bookings: process.env.BOOKINGS_SERVICE,
}
