import Joi from 'joi'
import IEvent from '../../interfaces/Event'

interface ValidationError {
  resource: string
  message: string
}

export default function CreateEventValidator(payload: IEvent) {
  const validDaysOfWeek = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ]

  const schema = Joi.object<IEvent>({
    description: Joi.string().required().messages({
      'string.base': '{{#label}} must be a string',
      'any.required': '{{#label}} is required',
    }),
    dayOfWeek: Joi.string()
      .valid(...validDaysOfWeek.map((day) => day.toLowerCase()))
      .required()
      .messages({
        'string.base': '{{#label}} must be a string',
        'any.only': '{{#label}} must be a valid day of the week',
        'any.required': '{{#label}} is required',
      }),
  }).options({
    abortEarly: false,
  })

  const validationResult = schema.validate({
    ...payload,
    dayOfWeek: payload.dayOfWeek?.toLowerCase(),
  })

  if (validationResult.error) {
    const errors: ValidationError[] = validationResult.error.details.map(
      (err) => ({
        resource: err.path?.join('.') || 'unknown',
        message: err.message,
      }),
    )

    return { type: 'Validation error', errors, statusCode: 422 }
  }

  return { statusCode: 200 }
}
