import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import Logger from 'src/utils/logger';

const logger = Logger.getInstance();

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToInstance(metatype, value);

        const errors = await validate(object, {
            whitelist: true,
            forbidNonWhitelisted: true,
        });

        const { incomplete, invalid } = this.classValidatorError(errors);

        if (incomplete.length) {
            logger.info(`Incomplete parameters: ${JSON.stringify(incomplete)}`);
            throw new BadRequestException('Incomplete Parameter');
        }

        if (Object.keys(invalid).length) {
            logger.info(`Invalid parameters: ${JSON.stringify(invalid)}`);
            throw new BadRequestException('Invalid Parameter');
        }

        return object;
    }

    private toValidate(metatype: any): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }

    private classValidatorError(errs: any[]) {
        if (!errs) {
            return { incomplete: [], invalid: {} };
        }

        const formattedError = errs.reduce(
            (formatted, err) => {
                const { property, constraints, value } = err;
                const field = property;

                if (constraints && value === undefined) {
                    formatted.incomplete.push(field);
                } else if (constraints) {
                    Object.values(constraints).forEach((message) => {
                        formatted.invalid[field] = message;
                    });
                }

                return formatted;
            },
            { incomplete: [], invalid: {} },
        );

        formattedError.incomplete = this.unique(formattedError.incomplete);

        return formattedError;
    }

    unique(arr: any) {
        return Array.from(new Set(arr));
    }
}
