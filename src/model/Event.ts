import mongoose, { Schema, Document } from 'mongoose'

const eventSchema = new Schema({
  description: 'string',
  dayOfWeek: 'string',
})

const Event = mongoose.model<Document>('Event', eventSchema)

export default Event