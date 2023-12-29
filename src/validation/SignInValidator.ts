import Joi from 'joi'
import ISignInUser from '../interfaces/SignIn'

interface ValidationError {
  resource: string
  message: string
}

export default function SignInValidator(payload: ISignInUser) {
  const schema = Joi.object<ISignInUser>({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
  })
    .options({
      abortEarly: false,
    })
    .messages({
      'string.minDomainSegments':
        '{{#label}} must have at least two domain segments',
      'any.only': '{{#label}} must match the password',
    })

  const validationResult = schema.validate(payload)

  if (validationResult.error) {
    const errors: ValidationError[] = validationResult.error.details.map(
      (err) => ({
        resource: err.path?.join('.') || 'unknown',
        message: err.message,
      }),
    )

    return { type: 'Validation Error', errors, statusCode: 400 }
  }

  const { email } = payload
  return { statusCode: 200, data: { email } }
}
