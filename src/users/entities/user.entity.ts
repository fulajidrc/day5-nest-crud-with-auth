import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
    toJSON: {
      getters: true,
      virtuals: true,
    },
  })
export class User {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    username: string;
}

const UserSchema = SchemaFactory.createForClass(User);


UserSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'user',
});


export { UserSchema };
