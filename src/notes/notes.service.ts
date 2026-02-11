import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ValidationService } from 'src/common/validation/validation.service';
import { Logger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { NoteValidation } from './note.validation';

@Injectable()
export class NotesService {
    constructor(
        private prismaService: PrismaService,
        private validationService: ValidationService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    ) { }

    async createNote(user: any, req: any) {
        this.logger.info(`Creating note for user ${user.userId} with data: ${JSON.stringify(req.body)}`);

        const createNoteReq = this.validationService.validate(
            NoteValidation.CREATE,
            req
        );

        if (createNoteReq.categoryId) {
            const category = await this.prismaService.category.findUnique({
                where: { id: createNoteReq.categoryId, userId: user.userId }
            });
            if (!category) {
                throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
            }
        }

        const newNote = await this.prismaService.note.create({
            data: {
                title: createNoteReq.title,
                content: createNoteReq.content,
                userId: user.userId,
                categoryId: createNoteReq.categoryId,
            },
            include: {
                category: true,
            }
        });

        this.logger.info(`Note created successfully with id: ${newNote.id} for user ${user.userId}`);

        return newNote;
    }

    async getUserNotes(user: any) {
        this.logger.info(`Fetching notes for user ${user.userId}`);

        return this.prismaService.note.findMany({
            where: {
                userId: user.userId,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                category: true,
            }
        });
    }

    async updateNote(user: any, noteId: number, req: any) {
        this.logger.info(`Updating note ${noteId} for user ${user.userId} with data: ${JSON.stringify(req.body)}`);

        const updateNoteReq = this.validationService.validate(
            NoteValidation.CREATE,
            req
        );

        const existingNote = await this.checkNoteMustExist(noteId, user.userId);

        if (!existingNote) {
            throw new HttpException('Note not found or access denied', HttpStatus.NOT_FOUND);
        }
        if (updateNoteReq.categoryId) {
            const category = await this.prismaService.category.findUnique({
                where: { id: updateNoteReq.categoryId, userId: user.userId }
            });
            if (!category) {
                throw new HttpException('Category not found', HttpStatus.NOT_FOUND);
            }
        }
        const updatedNote = await this.checkNoteMustExist(noteId, user.userId);

        await this.prismaService.note.update({
            where: {
                id: noteId,
            },
            data: updateNoteReq
        });

        this.logger.info(`Note ${noteId} updated successfully for user ${user.userId}`);

        return updatedNote;
    }

    async deleteNote(user: any, noteId: number) {
        this.logger.info(`Deleting note ${noteId} for user ${user.userId}`);

        const existingNote = await this.checkNoteMustExist(noteId, user.userId);

        if (!existingNote) {
            throw new HttpException('Note not found or access denied', HttpStatus.NOT_FOUND);
        }

        await this.prismaService.note.delete({
            where: {
                id: noteId,
            }
        });

        this.logger.info(`Note ${noteId} deleted successfully for user ${user.userId}`);

        return { message: 'Note deleted successfully' };
    }

    private checkNoteMustExist(noteId: number, userId: number) {
        const note = this.prismaService.note.findUnique({
            where: {
                id: noteId,
                userId: userId,
            }
        });
        if (!note) {
            throw new HttpException('Note not found or access denied', HttpStatus.NOT_FOUND);
        }
        return note;
    }
}
