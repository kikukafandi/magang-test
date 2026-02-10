import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
    @ApiProperty({ example: 'Belajar NestJS', description: 'Judul catatan' })
    title: string;

    @ApiProperty({ example: 'Hari ini belajar Swagger...', description: 'Isi catatan' })
    content: string;
}

export class UpdateNoteDto {
    @ApiProperty({ example: 'Belajar NestJS (Revisi)', required: false })
    title?: string;

    @ApiProperty({ example: 'Konten diperbarui...', required: false })
    content?: string;
}