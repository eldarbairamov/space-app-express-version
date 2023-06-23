import "dotenv/config";
import { errorMiddleware } from "./middleware";
import { configuration } from "./config";
import { apiRouter } from "./router/api.router";
import { STATIC_PATH } from "./constant";
import { cronRunner } from "./cron";
import mongoose from "mongoose";
import cors from "cors";
import express, { type Application } from "express";
import fileUpload from "express-fileupload";
import swaggerUI from "swagger-ui-express";
import swaggerJson from "./swagger.json";
import { pleaseWait } from "@src/helper";

const app: Application = express();
mongoose.set("strictQuery", false);

app.use(express.json())
   .use(express.urlencoded({ extended: true }))
   .use(cors())
   .use(fileUpload())
   .use(express.static(STATIC_PATH))
   .use("/", apiRouter)
   .use(errorMiddleware)
   .use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerJson));

const dbConnection = async () => {
   let connection = false;

   while (!connection) {
      try {
         await mongoose.connect(`${ configuration.MONGO_URI }`);
         connection = true;

      } catch (e) {
         console.log("Database is unavailable. Restarting...");
         await pleaseWait(3000);
      }
   }
};

const start = async () => {
   await dbConnection();
   app.listen(configuration.PORT);
   cronRunner();
};

start()
   .then(() => console.log(`Database is connected. Server started on port ${ configuration.PORT }`))
   .catch(e => console.log(e));

