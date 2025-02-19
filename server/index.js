import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./Config/Database.js";

dotenv.config({
  path: "./.env",
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
