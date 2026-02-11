import { ApiProperty } from '@nestjs/swagger';

export class CreateNoteDto {
    @ApiProperty({ example: 'Belajar NestJS', description: 'Judul catatan' })
    title: string;

    @ApiProperty({ example: 'Isi catatan...', description: 'Isi catatan' })
    content: string;

    
    @ApiProperty({ example: 1, required: false, description: 'ID Kategori (Optional)' })
    categoryId?: number;
}

export class UpdateNoteDto {
    @ApiProperty({ example: 'Judul Baru', required: false })
    title?: string;

    @ApiProperty({ example: 'Konten Baru', required: false })
    content?: string;

    
    @ApiProperty({ example: 1, required: false, description: 'ID Kategori (Optional)' })
    categoryId?: number;
}