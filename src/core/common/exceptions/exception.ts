import { HttpException } from '@nestjs/common';
import { CodeDescription, CreateExceptionPayload } from '../types/common.types';

export class Exception<TData> extends HttpException {
  private constructor(
    codeDescription: CodeDescription,
    data?: TData,
    context?: string,
  ) {
    super(data || codeDescription.message, codeDescription.code);
  }

  public static new<TData>(
    payload: CreateExceptionPayload<TData>,
    context?: string,
  ): Exception<TData> {
    return new Exception<TData>(payload.code, payload.data, context);
  }
}
