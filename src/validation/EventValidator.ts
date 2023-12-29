import Joi from 'joi'
import IEvent from '../interfaces/Event'

interface ValidationError {
  resource: string
  message: string
}

export default function EventValidator(payload: IEvent) {
  const schema = Joi.object<IEvent>({
    description: Joi.string().required(),
    dayOfWeek: Joi.string().required(),
  })
    .options({
      abortEarly: false,
    })
    .messages({})

  const validationResult = schema.validate(payload)

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
