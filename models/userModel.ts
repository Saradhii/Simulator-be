import { Document, Schema, model } from 'mongoose';

export interface SimulatorUser extends Document {
  email: string;
  password: string;
}

const simulatorUserSchema = new Schema<SimulatorUser>({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const SimulatorUserModel = model<SimulatorUser>('SimulatorUser', simulatorUserSchema);

export default SimulatorUserModel;
