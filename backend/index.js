import dotenv from "dotenv";
import { connectDatabase } from "./database/connect.js";
import { connectWs } from "./utils/connectWs.js";
import { createServer } from "http";
import { app } from "./app.js";


dotenv.config();

const port = process.env.PORT || 3000;

export const httpServer = createServer(app);

connectWs()

export let userToSocket = new Map()

connectDatabase()
  .then(() =>
    httpServer.listen(port, () => {
      console.log(`port is running on ${port}`);
    }),
  )
  .catch((err) => console.log(err));
