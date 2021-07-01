export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type CodeDescription = {
  code: number;
  message: string;
};

export type ClassValidationErrors = {
  property: string;
  value: string;
  message: Array<string>;
};

export type ClassValidationDetails = {
  context: Optional<CodeDescription>;
  errors: Array<ClassValidationErrors>;
};

export type CreateExceptionPayload<TData> = {
  code: CodeDescription;
  data?: TData;
};
