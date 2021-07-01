import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { CommonConstants } from '../../core/common/enums/common.constants';
import { StatusCode } from '../../core/common/codes/status.code';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: any = context.switchToHttp().getRequest();

    const isPublic: boolean = this._reflector.get<boolean>(
      'isPublic',
      context.getClass(),
    );

    if (isPublic) return true;

    return this.checkToken(request);
  }

  private checkToken = (request: any): boolean => {
    const configToken: string = `Bearer ${this._configService.get<string>(
      'TOKEN',
    )}`;
    const token: string = request.headers[CommonConstants.authorization];

    if (token && token == configToken) return true;

    throw new UnauthorizedException(StatusCode.UNAUTHORIZED);
  };
}
