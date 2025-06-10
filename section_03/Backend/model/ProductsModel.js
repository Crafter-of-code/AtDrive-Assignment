import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    price: Number,
    discription: String,
  },
  {
    timestamps: true,
  }
);
const productsModel = mongoose.model("Products", productSchema);
export default productsModel;
