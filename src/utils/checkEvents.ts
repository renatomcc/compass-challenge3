import EventsRepository from '../respositories/EventsRepositories/EventsRepository'

export const CheckEvents = async (
  dayOfWeek: string,
  userId: string,
  description: string | null,
  number: number,
  skip: number,
) => {
  const query: Record<string, any> = { dayOfWeek, userId }
  if (description) {
    query.description = { $regex: new RegExp(description, 'i') }
  }

  const events = await EventsRepository.getAllEventsByDayWithoutFilter(
    query.dayOfWeek,
    query.userId,
  )
  const filteredEvents = await EventsRepository.getAllEventsByDay(
    query,
    number,
    skip,
  )

  if (!events.length) {
    return {
      success: false,
      error: [
        {
          resource: 'dayOfWeek',
          message: 'No events found on this day',
        },
      ],
    }
  }

  if (events.length && !filteredEvents.length) {
    return {
      success: false,
      error: [
        {
          resource: 'query',
          message: 'No events found with those specific queries',
        },
      ],
    }
  }

  return filteredEvents
}
