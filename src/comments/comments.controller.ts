import { Body, Controller, Delete, Param, Get, Post, Put, Request, UseGuards, Patch } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticatedRequest } from 'src/utils/user.interface';
import { commentDto } from './dto/comment.dto';

@Controller('comments')
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private commentService: CommentsService) { }
  @Get()
  fetchAllComment(){
    return this.commentService.findAllComment();
  }
  @Get('/:id')
  getCommentById(@Param('id') id:string){
    return this.commentService.findCommentById(id)
  }
  @Post()
  createComment(@Request() req: AuthenticatedRequest, @Body() commentInfo: commentDto) {
    return this.commentService.createComment(req.user.userId,commentInfo)
  }
  @Patch('/:id')
  updateComment(@Request() req: AuthenticatedRequest, @Param('id') commentId: string,@Body() comment:commentDto) {
    return this.commentService.updateComment(req.user.userId, commentId,comment);
  }
  @Delete('/:id')
  deleteComment(@Param('id') id:string,@Request() req:AuthenticatedRequest){
    return this.commentService.deleteComment(id);
  }
}
