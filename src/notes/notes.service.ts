import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { ValidationService } from 'src/common/validation/validation.service';
import { Logger } from 'winston';
import { NoteValidation } from './note.validation';

@Injectable()
export class NotesService {
    constructor(
        private prismaService: PrismaService,
        private validationService: ValidationService,
        @Inject('WINSTON_MODULE_PROVIDER') private readonly logger: Logger,
    ){}

    async createNote(user:any, req:any) {
        this.logger.info(`Creating note for user ${user.userId} with data: ${JSON.stringify(req.body)}`);

        const createNoteReq = this.validationService.validate(
            NoteValidation.CREATE,
            req
        );

        const newNote = await this.prismaService.note.create({
            data:{
                title: createNoteReq.title,
                content: createNoteReq.content,
                userId: user.userId,
            }
        });

        this.logger.info(`Note created successfully with id: ${newNote.id} for user ${user.userId}`);

        return newNote;
    }

    async getUserNotes(user:any) {
        this.logger.info(`Fetching notes for user ${user.userId}`);

        return this.prismaService.note.findMany({
            where:{
                userId: user.userId,
            },
            orderBy:{
                createdAt: 'desc',
            }
        });
    }
}
