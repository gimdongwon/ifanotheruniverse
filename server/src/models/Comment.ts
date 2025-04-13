import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  content: string;
  author: mongoose.Schema.Types.ObjectId; // User 모델의 참조
  post: mongoose.Schema.Types.ObjectId; // Post 모델의 참조
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema: Schema = new Schema(
  {
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, // User 참조
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true }, // Post 참조
  },
  { timestamps: true }
);

export default mongoose.model<IComment>('Comment', commentSchema);
