import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose/dist";
import { Type } from "class-transformer";
import mongoose, { HydratedDocument, ObjectId, SchemaTypes, Types } from "mongoose";
import { Category } from "src/categories/entities/category.entity";
import { User } from "src/users/entities/user.entity";


export type PostDocument = HydratedDocument<Post>;


@Schema({
    toJSON: {
      getters: true,
      virtuals: true,
    },
  })
export class Post {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    @Type(() => Category)
    category: Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    @Type(() => User)
    user: Types.ObjectId
}

export const PostSchema = SchemaFactory.createForClass(Post);
