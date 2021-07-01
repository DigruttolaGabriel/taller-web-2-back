export interface ProductUsecase<TUseCasePort, TUseCaseResult> {
  execute(port?: TUseCasePort): Promise<TUseCaseResult>;
}
