// backend/src/utils/validators.ts
import { ValidationError } from './errors';

/**
 * Utility functions for validations
 */
export const validators = {
  /**
   * Validate that the value is not empty
   * @param value Value to validate
   * @param fieldName Field name for error message
   * @throws ValidationError if validation fails
   */
  notEmpty: <T>(value: T, fieldName: string): void => {
    if (value === undefined || value === null || value === '') {
      throw new ValidationError({
        [fieldName]: `${fieldName} is required`
      });
    }
  },

  /**
   * Validate that the string has minimum length
   * @param value String to validate
   * @param minLength Minimum length
   * @param fieldName Field name for error message
   * @throws ValidationError if validation fails
   */
  minLength: (value: string, minLength: number, fieldName: string): void => {
    if (value.length < minLength) {
      throw new ValidationError({
        [fieldName]: `${fieldName} must be at least ${minLength} characters long`
      });
    }
  },

  /**
   * Validate that the string has maximum length
   * @param value String to validate
   * @param maxLength Maximum length
   * @param fieldName Field name for error message
   * @throws ValidationError if validation fails
   */
  maxLength: (value: string, maxLength: number, fieldName: string): void => {
    if (value.length > maxLength) {
      throw new ValidationError({
        [fieldName]: `${fieldName} cannot exceed ${maxLength} characters`
      });
    }
  },

  /**
   * Validate that the value is a valid email
   * @param email Email to validate
   * @param fieldName Field name for error message
   * @throws ValidationError if validation fails
   */
  email: (email: string, fieldName: string = 'email'): void => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      throw new ValidationError({
        [fieldName]: 'Invalid email format'
      });
    }
  },

  /**
   * Validate that the value is a valid URL
   * @param url URL to validate
   * @param fieldName Field name for error message
   * @throws ValidationError if validation fails
   */
  url: (url: string, fieldName: string = 'url'): void => {
    try {
      new URL(url);
    } catch (error) {
      throw new ValidationError({
        [fieldName]: 'Invalid URL format'
      });
    }
  },

  /**
   * Validate that the number is within range
   * @param value Number to validate
   * @param min Minimum value
   * @param max Maximum value
   * @param fieldName Field name for error message
   * @throws ValidationError if validation fails
   */
  range: (value: number, min: number, max: number, fieldName: string): void => {
    if (value < min || value > max) {
      throw new ValidationError({
        [fieldName]: `${fieldName} must be between ${min} and ${max}`
      });
    }
  },

  /**
   * Validate that the value is a valid enum value
   * @param value Value to validate
   * @param enumObject Enum object
   * @param fieldName Field name for error message
   * @throws ValidationError if validation fails
   */
  isEnum: <T extends object>(value: any, enumObject: T, fieldName: string): void => {
    const enumValues = Object.values(enumObject);
    if (!enumValues.includes(value)) {
      throw new ValidationError({
        [fieldName]: `${fieldName} must be one of: ${enumValues.join(', ')}`
      });
    }
  },

  /**
   * Validate that the value is an integer
   * @param value Value to validate
   * @param fieldName Field name for error message
   * @throws ValidationError if validation fails
   */
  isInteger: (value: any, fieldName: string): void => {
    if (!Number.isInteger(Number(value))) {
      throw new ValidationError({
        [fieldName]: `${fieldName} must be an integer`
      });
    }
  },

  /**
   * Validate that the value is a positive number
   * @param value Value to validate
   * @param fieldName Field name for error message
   * @throws ValidationError if validation fails
   */
  isPositive: (value: number, fieldName: string): void => {
    if (value <= 0) {
      throw new ValidationError({
        [fieldName]: `${fieldName} must be a positive number`
      });
    }
  },

  /**
   * Validate a strong password
   * @param password Password to validate
   * @param fieldName Field name for error message
   * @throws ValidationError if validation fails
   */
  isStrongPassword: (password: string, fieldName: string = 'password'): void => {
    const errors = [];
    
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }
    
    if (errors.length > 0) {
      throw new ValidationError({
        [fieldName]: errors.join('. ')
      });
    }
  },

  /**
   * Validate a file size
   * @param sizeInBytes File size in bytes
   * @param maxSizeInMB Maximum size in MB
   * @param fieldName Field name for error message
   * @throws ValidationError if validation fails
   */
  fileSize: (sizeInBytes: number, maxSizeInMB: number, fieldName: string = 'file'): void => {
    const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
    if (sizeInBytes > maxSizeInBytes) {
      throw new ValidationError({
        [fieldName]: `File size cannot exceed ${maxSizeInMB} MB`
      });
    }
  },

  /**
   * Validate a file extension
   * @param filename Filename to validate
   * @param allowedExtensions Array of allowed extensions (without dot)
   * @param fieldName Field name for error message
   * @throws ValidationError if validation fails
   */
  fileExtension: (filename: string, allowedExtensions: string[], fieldName: string = 'file'): void => {
    const extension = filename.split('.').pop()?.toLowerCase() || '';
    if (!allowedExtensions.includes(extension)) {
      throw new ValidationError({
        [fieldName]: `File type not allowed. Allowed extensions: ${allowedExtensions.join(', ')}`
      });
    }
  },

  /**
   * Validate that all required fields are present in an object
   * @param obj Object to validate
   * @param requiredFields Array of required field names
   * @throws ValidationError if validation fails
   */
  requiredFields: (obj: Record<string, any>, requiredFields: string[]): void => {
    const missingFields = requiredFields.filter(field => 
      obj[field] === undefined || obj[field] === null || obj[field] === ''
    );
    
    if (missingFields.length > 0) {
      const errors = missingFields.reduce((acc, field) => {
        acc[field] = `${field} is required`;
        return acc;
      }, {} as Record<string, string>);
      
      throw new ValidationError(errors);
    }
  },

  /**
   * Validate that at least one of the fields is present
   * @param obj Object to validate
   * @param fields Array of field names
   * @throws ValidationError if validation fails
   */
  atLeastOneField: (obj: Record<string, any>, fields: string[]): void => {
    const hasAtLeastOne = fields.some(field => 
      obj[field] !== undefined && obj[field] !== null && obj[field] !== ''
    );
    
    if (!hasAtLeastOne) {
      throw new ValidationError({
        _error: `At least one of these fields is required: ${fields.join(', ')}`
      });
    }
  }
};

export default validators;