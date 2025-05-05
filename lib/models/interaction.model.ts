import { Schema, models, model, Document, Types } from "mongoose";

export interface IInteraction extends Document {
  user: Types.ObjectId;
  action: string;
  actionId: Types.ObjectId;
  actionType: "question" | "answer";
}

const InteractionSchema = new Schema<IInteraction>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    action: {
      type: String,
      required: true,
    },
    actionId: { type: Schema.Types.ObjectId, required: true }, // could be both question or answer
    actionType: {
      type: String,
      enum: ["question", "answer"],
    },
  },
  { timestamps: true }
);

const Interaction =
  models?.Interaction || model<IInteraction>("Interaction", InteractionSchema);

export default Interaction;
