import mongoose from "mongoose";
export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://ManojLakshmi:8904016770mk@cluster0.5xh3ozw.mongodb.net/trishik_travels"
    )
    .then(() => console.log("DB connected"));
};
