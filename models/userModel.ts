import { Document, Schema, model } from 'mongoose';

export interface SimulatorUser extends Document {
  email: string;
  password: string;
  networth: string;
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
  networth: {
    type: String,
    default: '$ 75000000', 
    required: true,
  },
});


const SimulatorUserModel = model<SimulatorUser>('simulatorusers', simulatorUserSchema);

export default SimulatorUserModel;
