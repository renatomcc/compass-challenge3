import CustomError from "../errors/CustomError"

export type ValidationResult = {
  statusCode: number
  type?: string
  errors?: any
}

export function handleValidationResponse(
  validationResponse: ValidationResult,
  defaultType: string = 'ValidationError',
) {
  if (validationResponse.statusCode !== 200) {
    throw new CustomError(
      validationResponse.type || defaultType,
      validationResponse.errors,
      validationResponse.statusCode,
    )
  }
}
