export class HttpException extends Error {
  status: number;
  constructor(status: number, name: string, message: string) {
    super(message);
    this.status = status;
    this.name = name;
    this.message = message;
  }
}
export const BadRequestException = (message: string) =>           new HttpException(400, 'Bad Request', message);
export const UnauthorizedException = (message: string) =>         new HttpException(401, 'Unauthorized', message);
export const ForbiddenException = (message: string) =>            new HttpException(403, 'Forbidden', message);
export const NotFoundException = (message: string) =>             new HttpException(404, 'Not Found', message);
export const MethodNotAllowedException = (message: string) =>     new HttpException(405, 'Method Not Allowed', message);
export const InternalServerErrorException = (message: string) =>  new HttpException(500, 'Internal Server Error', message);