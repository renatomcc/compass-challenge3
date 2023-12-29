import mongoose, { Schema, Document } from 'mongoose'

interface IEventDocument extends Document {
  description: string
  dayOfWeek: string
  userId: string
}

const eventSchema = new Schema<IEventDocument>({
  description: 'string',
  dayOfWeek: 'string',
  userId: 'string',
})

const Event = mongoose.model<IEventDocument>('Event', eventSchema)

export default Event
