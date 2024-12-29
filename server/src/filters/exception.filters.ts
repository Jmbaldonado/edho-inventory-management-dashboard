import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
} from '@nestjs/common';
import Logger from 'src/utils/logger';

const logger = Logger.getInstance();

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();

        let status = 500;
        let message = 'Unexpected Error';

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
            message = exceptionResponse['message'];
        }

        logger.error(
            `Unexpected Error: ${JSON.stringify(exception, Object.getOwnPropertyNames(exception))}`,
        );

        response.status(status).json({ error: { message } });
    }
}
