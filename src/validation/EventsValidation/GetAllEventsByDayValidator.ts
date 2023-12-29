import Joi from 'joi'

interface ValidationError {
  resource: string
  message: string
}

export default function GetAllEventsByDayValidator(dayOfWeek: string) {
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
      'any.only': '{{#label}} must be a valid day of the week',
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

    return { type: 'Validation error', errors, statusCode: 422 }
  }

  return { statusCode: 200 }
}
