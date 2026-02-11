import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { ValidationService } from '../common/validation/validation.service';
import { CategoryValidation } from './category.validation';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Injectable()
export class CategoriesService {
    constructor(
        private prismaService: PrismaService,
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) { }

    async createCategory(user: any, request: any) {
        this.logger.info(`Creating category for user ${user.userId} with data: ${JSON.stringify(request)}`);
        const createReq = this.validationService.validate(
            CategoryValidation.CREATE,
            request,
        );
        this.logger.info(`Category created successfully for user ${user.userId}`);
        return this.prismaService.category.create({
            data: {
                name: createReq.name,
                userId: user.userId,
            },
        });
    }

    async getCategories(user: any) {
        this.logger.info(`Fetching categories for user ${user.userId}`);
        return this.prismaService.category.findMany({
            where: { userId: user.userId },
        });
    }

    async updateCategory(user: any, categoryId: number, request: any) {

        this.logger.info(`Updating category ${categoryId} for user ${user.userId} with data: ${JSON.stringify(request)}`);
        const updateReq = this.validationService.validate(
            CategoryValidation.UPDATE,
            request,
        );

        await this.checkCategoryMustExists(user.userId, categoryId);

        this.logger.info(`Category ${categoryId} updated successfully for user ${user.userId}`);

        return this.prismaService.category.update({
            where: { id: categoryId },
            data: { name: updateReq.name },
        });
    }

    async deleteCategory(user: any, categoryId: number) {
        this.logger.info(`Deleting category ${categoryId} for user ${user.userId}`);
        await this.checkCategoryMustExists(user.userId, categoryId);

        this.logger.info(`Category ${categoryId} deleted successfully for user ${user.userId}`);
        return this.prismaService.category.delete({
            where: { id: categoryId },
        });
    }

    private async checkCategoryMustExists(userId: number, categoryId: number) {
        const category = await this.prismaService.category.findUnique({
            where: { id: categoryId, userId: userId },
        });

        if (!category) {
            throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
        }
    }
}