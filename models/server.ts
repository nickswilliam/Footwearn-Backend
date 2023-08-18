import express, { Express } from "express";
import cors from "cors";
import { connectDB } from "../database/config";
import authRoutes from "../routes/auth";
import orderRoutes from '../routes/orders'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { swaggerSpec } from "../swagger/swaggerConfig";


export class Server {
  app: Express;
  port: string | number | undefined;
  authPath: string;
  ordersPath: string;
  issuesPath: string;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.connectToDB();
    this.middlewares();
    this.authPath = "/auth";
    this.ordersPath = "/orders";
    this.issuesPath = "/issues";
    this.routes();
  }

  listen(): void {
    this.app.listen(this.port, () => {
      console.log(`Conectado al puerto ${this.port}`);
    });
  }

  async connectToDB(): Promise<void> {
    await connectDB();
  }

  middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());
  }

  routes(): void {
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.ordersPath, orderRoutes)
    this.app.use("/", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerSpec)))
  }
}
