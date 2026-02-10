import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Post, Put, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private readonly notesService: NotesService) { }

  @Post()
  async createNote(@Req() req: any, @Body() request: any) {
    const user = req.user;
    const result = await this.notesService.createNote(user, request);
    return {
      data: result,
      message: 'Note created successfully',
      statusCode: 201
    };
  }
  @Get()
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
  async updateNote(@Req() req: any, @Param('noteId', ParseIntPipe) noteId: number, @Body() request: any) {
    const user = req.user;
    const result = await this.notesService.updateNote(user, noteId, request);
    return {
      data: result,
      message: 'Note updated successfully',
      statusCode: 200
    };
  }

  @Delete(':noteId')
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
