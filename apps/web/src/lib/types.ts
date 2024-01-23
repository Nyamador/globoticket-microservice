export interface Event {
  id: string
  name: string
  slug: string
  description: string
  date: Date
  location: string
  organizerId: string
  imageURL: string
  createdAt: Date
  updatedAt: Date
}

export interface Organizer {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface Booking {
  id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  eventId: string
  userId: string
  createdAt: Date
  updatedAt: Date
}
