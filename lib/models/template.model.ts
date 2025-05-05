import { Schema, models, model, Document } from "mongoose";

export interface IModel extends Document {}

const ModelSchema = new Schema<IModel>({});

const Model = models?.Model || model<IModel>("Model", ModelSchema);

export default Model;
