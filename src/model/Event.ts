import mongoose, { Schema, Document } from 'mongoose'

interface IEvent extends Document {
  description: string
  dayOfWeek: string
  userId: string
}

const eventSchema = new Schema<IEvent>({
  description: 'string',
  dayOfWeek: 'string',
  userId: 'string',
})

const Event = mongoose.model<IEvent>('Event', eventSchema)

export default Event
