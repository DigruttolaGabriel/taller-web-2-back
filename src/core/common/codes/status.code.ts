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

  public static USE_CASE_PORT_VALIDATION_ERROR: CodeDescription = {
    code: 1000,
    message: 'Use-case port validacion error.',
  };

  public static ENTITY_VALIDATION_ERROR: CodeDescription = {
    code: 1001,
    message: 'Entity validacion error.',
  };

  public static ENTITY_ALREADY_EXISTS_ERROR: CodeDescription = {
    code: 1002,
    message: 'Entity already exists.',
  };

  public static WRONG_PAGE_NUMBER: CodeDescription = {
    code: 1003,
    message: 'Page number is invalid.',
  };

  public static WRONG_CATEGORY: CodeDescription = {
    code: 1004,
    message: 'Product category is invalid.',
  };
}
