import { Body, Controller, Delete, Param, Patch, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/utils/user.interface';
import { commentDto } from './dto/comment.dto';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private commentService: CommentsService) { }
  @Post('create-comment')
  createComment(@Req() req: AuthenticatedRequest, @Body() commentInfo: commentDto) {
    return this.commentService.createComment(req.user.userId,commentInfo)
  }
  @Put('update-comment/:id')
  updateComment(@Req() req: AuthenticatedRequest, @Param('id') commentId: string,@Body() comment:commentDto) {
    return this.commentService.updateComment(req.user.userId, commentId,comment);
  }
  @Delete('delete/:id')
  deleteComment(@Param('id') id:string,@Req() req:AuthenticatedRequest){
    return this.commentService.deleteComment(id,req.user.userId);
  }
}
