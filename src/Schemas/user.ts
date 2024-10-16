import { model, Schema, Document } from 'mongoose';

export interface UserInterface extends Document {
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Nome é obrigatório.'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email é obrigatório.'],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória.'],
    select: false,
  },
  creation: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default model<UserInterface>('User', UserSchema);
