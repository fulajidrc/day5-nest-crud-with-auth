import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";
import { HydratedDocument } from "mongoose";
import { Post } from "src/posts/entities/post.entity";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    toJSON: {
      getters: true,
      virtuals: true,
    },
  })
export class Category {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Type(() => Post)
    posts: Post[];
}

const CategorySchema = SchemaFactory.createForClass(Category);


CategorySchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'category',
  });


  export { CategorySchema };
