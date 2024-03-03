import { AppDataSource } from "../data-source";
import cloudinary from "../libs/cloudinary";
import * as amqp from "amqplib";
import "dotenv/config";
import ThreadWorker from "./ThreadWorker";
import RepliesWorker from "./RepliesWorker";

export default new (class WorkerHub {
  constructor() {
    AppDataSource.initialize()
      .then(async () => {
        cloudinary.config();

        const connection = await amqp.connect(process.env.URL_CONNECT);

        ThreadWorker.create(process.env.QUEUE_NAME, connection);
        RepliesWorker.create(process.env.QUEUE_NAME, connection);
        console.log("WORKER RUNNING");
      })
      .catch(error => console.log(error))
  }
})();
