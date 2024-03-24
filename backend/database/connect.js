import mongoose from "mongoose";

export async function connectDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URL).then(() => {
      console.log("database connected successfully");
    });
  } catch (error) {
    console.log(error);
  }
}
