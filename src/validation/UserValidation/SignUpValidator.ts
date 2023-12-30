import Joi from 'joi'
import ISignUpUser from '../../interfaces/SignUp'
import User from '../../model/User'
import ValidationError from '../../errors/ValidationError'

export default async function SignUpValidator(payload: ISignUpUser) {
  const birthDateLimit = new Date()
  birthDateLimit.setFullYear(birthDateLimit.getFullYear() - 150)

  const schema = Joi.object<ISignUpUser>({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    birthDate: Joi.date().max('now').min(birthDateLimit).required(),
    city: Joi.string().required(),
    country: Joi.string().required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
  })
    .options({
      abortEarly: false,
    })
    .messages({
      'date.base': '{{#label}} invalid date',
      'date.max': '{{#label}} date cannot be in the future',
      'date.min': '{{#label}} date is too old',
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

    return { type: 'Validation error', errors, statusCode: 422 }
  }

  const existingEmail = await User.findOne({ email: payload.email })
  if (existingEmail) {
    const errors: ValidationError[] = [
      {
        resource: 'email',
        message: 'Email is already in use',
      },
    ]

    return { type: 'Validation error', errors, statusCode: 422 }
  }
  return { statusCode: 200 }
}
