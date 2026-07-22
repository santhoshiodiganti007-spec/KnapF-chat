import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Get('channel/:channelId')
  async getChannelMessages(@Param('channelId') channelId: string) {
    return this.messagesService.getChannelMessages(channelId);
  }

  @Post()
  async createMessage(
    @Body('content') content: string,
    @Body('userId') userId: string,
    @Body('channelId') channelId: string,
  ) {
    return this.messagesService.createMessage(content, userId, channelId);
  }
}
