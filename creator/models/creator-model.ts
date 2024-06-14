import { Schema, model, Document } from 'mongoose';

export interface ICreator extends Document {
    email: string;
    name: string;
    isCreator: true;
}

const creatorSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    isCreator: { type: Boolean, required: true },
});

export default model<ICreator>('Creator', creatorSchema, "creators");