import { model, Schema, Document } from 'mongoose';
import { UserInterface } from './user';

export enum StatusEnum{
    OPEN = 'OPEN',
    FINISHED = 'FINISHED'
}

export interface TaskInterface extends Document {
    description: string,
    status: StatusEnum,
    concluded: Date,
    responsible: UserInterface,
    creation: Date,
    updatedAt: Date,
}

const TaskSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Descricão é obrigatório.'],
  },
  status: {
    type: String,
    validate: {
      validator: (value: StatusEnum) => {
        if (value === StatusEnum.OPEN || value === StatusEnum.FINISHED) return true;
        return false;
      },
      message: (props: { value: any; }) => `${props.value} é um valor inválido.`,
    },
    required: [true, 'Status é obrigatório.'],
    uppercase: true,
  },
  conluded: {
    type: Date,
  },
  responsible: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Responsável é obrigatório.'],
  },
  creation: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default model<TaskInterface>('Task', TaskSchema);
