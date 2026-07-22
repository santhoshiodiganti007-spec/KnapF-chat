import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MessagesService {
  constructor(private prisma: PrismaService) {}

  async getChannelMessages(channelId: string) {
    const messages = await this.prisma.message.findMany({
      where: { channelId },
      include: { user: true },
      orderBy: { createdAt: 'asc' },
    });
    return { success: true, data: messages };
  }

  async createMessage(content: string, userId: string, channelId: string) {
    const message = await this.prisma.message.create({
      data: {
        content,
        userId,
        channelId,
      },
      include: { user: true },
    });
    return { success: true, data: message };
  }
}
