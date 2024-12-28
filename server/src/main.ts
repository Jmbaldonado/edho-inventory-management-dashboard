import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { APP_PORT } from 'config/environment';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    await app.listen(APP_PORT, '0.0.0.0').then(async () => {
        Logger.log(
            `✅  Application is running on: ${await app.getUrl()}`,
            'NestJS',
        );
    });
}

bootstrap().catch((e) => {
    Logger.error('❌  Error starting server', e, 'NestJS', false);
    throw e;
});
