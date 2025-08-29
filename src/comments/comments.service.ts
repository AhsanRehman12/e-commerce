import { Injectable, UnauthorizedException } from '@nestjs/common';
import { commentDto } from './dto/comment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment } from './schema/comment.schema';

@Injectable()
export class CommentsService {
  constructor(@InjectModel('Comment') private commentModel: Model<Comment>) { }

  async findAllComment() {
    try {
      return await this.commentModel.find();
    } catch (error) {
      return { success: false, message: 'Error while fetching data' }
    }
  }

  async findCommentById(commentId: string) {
    try {
      const findComment = await this.commentModel.findById(commentId);
      return findComment;
    } catch (error) {
      return error
    }
  }

  async createComment(userId: string, comment: commentDto) {
    try {
      const newComment = await this.commentModel.create({ ...comment, userId });
      return newComment;
    } catch (error) {
      return { success: false, message: 'Error occur while adding comment' }
    }
  }
  async updateComment(userId: string, commentId: string, comment: commentDto) {
    try {
      const updatedComment = await this.commentModel.findOneAndUpdate({ _id: commentId, userId: userId }, { $set: { comment: comment.comment } }, { returnDocument: 'after' })
      return updatedComment;
    } catch (error) {
      return { success: false, message: 'Error while updating comment' }
    }
  }

  async deleteComment(commentId: string) {
    let comment = await this.findCommentById(commentId);
    if (comment)
      try {
        const deltedComment = await this.commentModel.findByIdAndDelete(commentId);
        //deleteNestedComments
        let nestedComment = await this.commentModel.deleteMany({ parentId: commentId })
        console.log(nestedComment)
        return { success: true, message: 'Comment deleted', deltedComment }
      } catch (error) {
        return { success: false, message: 'Error while deleting Comment' }
      }
  }
}
