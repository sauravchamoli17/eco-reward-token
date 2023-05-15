import mongoose from "mongoose";

const balanceSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
      unique: true,
    },
    token: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Balances ||
  mongoose.model("Balances", balanceSchema);
