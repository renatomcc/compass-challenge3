import mongoose from 'mongoose'
import Event from '../../model/Event'
import ValidationError from '../../errors/ValidationError'

export default async function GetEventByIdValidator(payload: string) {
  if (!mongoose.Types.ObjectId.isValid(payload)) {
    const invalidIdError: ValidationError = {
      resource: 'id',
      message: 'Invalid ObjectId',
    }
    return {
      type: 'Validation error',
      errors: [invalidIdError],
      statusCode: 422,
    }
  }

  const event = await Event.findById(payload)
  if (!event) {
    const notFoundError: ValidationError = {
      resource: 'id',
      message: 'Event not found',
    }
    return {
      type: 'Validation error',
      errors: [notFoundError],
      statusCode: 404,
    }
  }
  return { statusCode: 200 }
}
