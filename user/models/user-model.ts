import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
    email: string;
    name: string;
}

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
});

export default model<IUser>('User', userSchema, "users");