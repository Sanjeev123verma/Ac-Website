
import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
  service: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Service ||
  mongoose.model("Service", serviceSchema);
