import mongoose from "mongoose";

const eventSchema = mongoose.Schema(
  {
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      enum: ["Mint", "Transfer", "Burn"],
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Events || mongoose.model("Events", eventSchema);
