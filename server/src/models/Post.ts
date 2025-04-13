import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  author: mongoose.Schema.Types.ObjectId; // User 모델의 참조
  createdAt: Date;
  updatedAt: Date;
}

const postSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    }, // User 참조
  },
  { timestamps: true }
);

export default mongoose.model<IPost>('Post', postSchema);
