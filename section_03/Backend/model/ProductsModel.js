import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: Number,
    description: String,
  },
  {
    timestamps: true,
  }
);
const productsModel = mongoose.model("Products", productSchema);
export default productsModel;
