import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { logger as Logger } from 'src/utils';

const logger = Logger.getInstance();

@Injectable()
export class LogResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();

        return next.handle().pipe(
            map((body) => {
                const data = {
                    status: res.statusCode,
                    headers: res.getHeaders(),
                    body,
                };

                logger.info(`${req.tag} ${JSON.stringify({ response: data })}`);
                return body;
            }),
        );
    }
}
