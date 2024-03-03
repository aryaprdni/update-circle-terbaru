import * as express from "express";
import { AppDataSource } from "./data-source";
import router from "./routes/api";
import * as cors from "cors";
import cloudinary from "./libs/cloudinary";
import "dotenv/config";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 3000;

    app.use(cors());
    app.use(express.json());
    app.use("/api/v1", router);

    cloudinary.config();
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
