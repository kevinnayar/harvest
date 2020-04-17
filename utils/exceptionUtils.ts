import { TypeHttpException } from '../types/baseTypes';

export const BadRequestException = (message: string): TypeHttpException =>
  ({ status: 400, statusText: 'Bad Request', message });

export const UnauthorizedException = (message: string): TypeHttpException =>
  ({ status: 401, statusText: 'Unauthorized', message });

export const ForbiddenException = (message: string): TypeHttpException =>
  ({ status: 403, statusText: 'Forbidden', message });

export const NotFoundException = (message: string): TypeHttpException =>
  ({ status: 404, statusText: 'Not Found', message });

export const MethodNotAllowedException = (message: string): TypeHttpException =>
  ({ status: 405, statusText: 'Method Not Allowed', message });

export const InternalServerErrorException = (message: string): TypeHttpException =>
  ({ status: 500, statusText: 'Internal Server Error', message });
