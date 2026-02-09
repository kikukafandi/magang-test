import { Injectable, BadRequestException } from '@nestjs/common';
import { ZodType } from 'zod';

@Injectable()
export class ValidationService {
    validate<T>(zodType: ZodType<T>, data: T): T {
        const result = zodType.safeParse(data);

        if (result.success) {
            return result.data;
        } else {
            throw new BadRequestException(result.error.message);
        }
    }
}