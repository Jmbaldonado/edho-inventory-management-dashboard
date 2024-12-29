import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import tracer from 'cls-rtracer';
import { NextFunction, Request, Response } from 'express';
import { logger as Logger, format } from 'src/utils';

const logger = Logger.getInstance();

@Injectable()
export class LogRequestMiddleware implements NestMiddleware {
    constructor(private readonly configService: ConfigService) {}

    use(req: Request, res: Response, next: NextFunction): void {
        const { hostname, ip, ips, method, originalUrl, headers, body, query } =
            req;
        const tag = `[host: ${hostname}][ip: ${ip}][proxies: ${ips}][method: ${method}][url: ${originalUrl}]`;

        const maskFields = this.configService.get<string[]>(
            'requests.maskFields',
            [],
        );

        const maskedRequest = format.mask({ headers, body, query }, maskFields);

        logger.info(`${tag} ${JSON.stringify({ request: maskedRequest })}`);

        req['tag'] = tag;
        req['refId'] = tracer.id();
        req['options'] = {};

        next();
    }
}
