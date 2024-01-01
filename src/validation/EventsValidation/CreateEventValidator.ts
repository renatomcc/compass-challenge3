import Joi from 'joi'
import IEvent from '../../interfaces/Event'
import ValidationError from '../../errors/ValidationError'

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
      'string.base': 'description must be a string',
      'any.required': 'description is required',
    }),
    dayOfWeek: Joi.string()
      .valid(...validDaysOfWeek.map((day) => day.toLowerCase()))
      .required()
      .messages({
        'string.base': 'dayOfWeek must be a string',
        'any.only': 'dayOfWeek must be a valid day of the week',
        'any.required': 'dayOfWeek is required',
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

    return { type: 'Validation error', errors, statusCode: 400 }
  }

  return { statusCode: 200 }
}
