import Joi from 'joi'
import ValidationError from '../../errors/ValidationError'

export default function CheckEventsByDayValidator(dayOfWeek: string) {
  const validDaysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  const schema = Joi.string()
    .valid(...validDaysOfWeek.map((day) => day.toLowerCase()))
    .required()
    .messages({
      'string.base': '{{#label}} must be a string',
      'any.only': 'dayOfWeek must be a valid day of the week',
      'any.required': '{{#label}} is required',
    })

  const validationResult = schema.validate(dayOfWeek.toLowerCase())

  if (validationResult.error) {
    const errors: ValidationError[] = validationResult.error.details.map(
      (err) => ({
        resource: 'dayOfWeek',
        message: err.message,
      }),
    )

    return { type: 'Validation error', errors, statusCode: 400 }
  }

  return { statusCode: 200 }
}
