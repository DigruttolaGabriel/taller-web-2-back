import { CodeDescription } from '../types/common.types';
import { HttpStatus } from '@nestjs/common';

export class StatusCode {
  public static BAD_REQUEST_ERROR: CodeDescription = {
    code: HttpStatus.BAD_REQUEST,
    message: 'Bad request.',
  };

  public static INTERNAL_SERVER_ERROR: CodeDescription = {
    code: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'Internal server error.',
  };

  public static NOT_FOUND_DATA: CodeDescription = {
    code: HttpStatus.NOT_FOUND,
    message: 'Data not found.',
  };

  public static UNAUTHORIZED: CodeDescription = {
    code: HttpStatus.UNAUTHORIZED,
    message: 'Invalid token.',
  };

  public static ENTITY_VALIDATION_ERROR: CodeDescription = {
    code: 1000,
    message: 'Entity validacion error.',
  };

  public static ENTITY_ALREADY_EXISTS_ERROR: CodeDescription = {
    code: 1001,
    message: 'Entity already exists.',
  };
}
