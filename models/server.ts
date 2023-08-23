import express, { Express } from "express";
import { Router } from "express";
import cors from "cors";
import { connectDB } from "../database/config";
import authRoutes from "../routes/auth";
import orderRoutes from "../routes/orders";
import issueRoutes from "../routes/issues";
import swaggerUIBundle from "swagger-ui-express";
import { swaggerSpec } from "../swagger/swaggerConfig";
import path from "path";

const pathToSwaggerUI = require('swagger-ui-dist').absolutePath()

export class Server {
  app: Express;
  port: string | number | undefined;
  authPath: string;
  ordersPath: string;
  issuesPath: string;
  router: Router;

  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.connectToDB();
    this.middlewares();
    this.authPath = "/auth";
    this.ordersPath = "/orders";
    this.issuesPath = "/issues";
    this.routes();
    this.router = Router();
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
    this.app.use("/", swaggerUIBundle.serve, swaggerUIBundle.setup(swaggerSpec));
    this.app.use(this.authPath, authRoutes);
    this.app.use(this.ordersPath, orderRoutes);
    this.app.use(this.issuesPath, issueRoutes);
    
  }
}
