import mongoose from "mongoose";

export async function connectMongo() {
  const mongoURI = `${process.env.MONGODB_URI}`;

  // // Set the desired connection pool size
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    maxPoolSize: 7,  // Adjust this value as needed
  };

  await mongoose.connect(mongoURI, options);
  // await mongoose.connect(mongoURI);
}