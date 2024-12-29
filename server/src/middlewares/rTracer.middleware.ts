import { Injectable, NestMiddleware } from '@nestjs/common';
import rTracer from 'cls-rtracer';

@Injectable()
export class RTracerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    rTracer.expressMiddleware()(req, res, next);
  }
}
