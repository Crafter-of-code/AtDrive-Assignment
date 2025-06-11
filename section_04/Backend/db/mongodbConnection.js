import mongoose from "mongoose";
async function connectionDb() {
  try {
    await mongoose.connect(process.env.mongodb_uri);
    console.log("database connected seccessfully");
  } catch (err) {
    console.log(
      "We are facing some error while connecting to the data base",
      err
    );
  }
}
export default connectionDb;
