import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateNoteDto, UpdateNoteDto } from './notes.dto';
@ApiTags('Notes')
@ApiBearerAuth()
@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new note' })
  async createNote(@Req() req: any, @Body() request: CreateNoteDto) {
    const user = req.user;
    const result = await this.notesService.createNote(user, request);
    return {
      data: result,
      message: 'Note created successfully',
      statusCode: 201
    };
  }
  @Get()
  @ApiOperation({ summary: 'Get all notes for the authenticated user' })
  async getUserNotes(@Req() req: any) {
    const user = req.user;
    const result = await this.notesService.getUserNotes(user);
    return {
      data: result,
      message: 'User notes fetched successfully',
      statusCode: 200
    };
  }

  @Put(':noteId')
  @ApiOperation({ summary: 'Update a note by ID' })
  async updateNote(@Req() req: any, @Param('noteId', ParseIntPipe) noteId: number, @Body() request: UpdateNoteDto) {
    const user = req.user;
    const result = await this.notesService.updateNote(user, noteId, request);
    return {
      data: result,
      message: 'Note updated successfully',
      statusCode: 200
    };
  }

  @Delete(':noteId')
  @ApiOperation({ summary: 'Delete a note by ID' })
  @HttpCode(200)
  async deleteNote(@Req() req: any, @Param('noteId', ParseIntPipe) noteId: number) {
    const user = req.user;
    await this.notesService.deleteNote(user, noteId);
    return {
      message: 'Note deleted successfully',
      statusCode: 200
    };
  }
}
