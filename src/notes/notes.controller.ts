import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { NotesService } from './notes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('notes')
@UseGuards(AuthGuard('jwt'))
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(@Req() req:any, @Body() request:any) {
    const user = req.user;
    const result = await this.notesService.createNote(user, request);
    return {
      data : result,
      message: 'Note created successfully',
      statusCode: 201
    };
  }

  async getUserNotes(@Req() req:any) {
    const user = req.user;
    const result = await this.notesService.getUserNotes(user);
    return {
      data : result,
      message: 'User notes fetched successfully',
      statusCode: 200
    };
  }
}
