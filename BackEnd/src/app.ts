/* eslint-disable @typescript-eslint/ban-ts-comment */
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import onFinished from 'on-finished';
import { createServer } from 'http';

import { handleRequestComplete, handleRequestStart, requestHeaderAppend } from '@middlewares/request';

import { IRoutes } from './interfaces/routes.interface';
import { logger } from './utils/logger';
import { CORS_ORIGIN, PORT } from './configs';
import { DatabaseManager } from '@configs/database';


class App {
  public app: express.Application;
  public port: string | number;
  public httpServer: any;

  constructor(routes: IRoutes[]) {
    this.app = express();
    this.port = PORT || 8000;
    this.httpServer = createServer(this.app);
    this.app.set('port', this.port);
    this.initializeFunctions(routes);
  }

  private async initializeFunctions(routes: IRoutes[]) {
    this.initializeDatabase(); // Connect to the SQLite database
    this.initializeMiddleware();
    this.initializeRoutes(routes);
  }

  private initializeDatabase() {
    try {
      DatabaseManager.getInstance();
      logger.info('Database connection initialized successfully.');
    } catch (error) {
      logger.error('Failed to initialize database connection:', error);
      throw new Error('Database initialization failed.');
    }
  }


  private initializeMiddleware() {
    this.app.use(helmet());

    const corsOptions = {
      origin: CORS_ORIGIN.split(','),
      credentials: true,
    };
    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(cookieParser());

    // @ts-ignore
    this.app.use(async (req: IRequest, res, next) => {
      await requestHeaderAppend(req);
      next();
    });
    this.app.use(
      bodyParser.json({
        limit: '20mb',
      }),
    );

    // @ts-ignore
    this.app.use('/*', async (req: IRequest, res, next) => {
      handleRequestStart(req);
      // eslint-disable-next-line callback-return
      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onFinished(res, (_err: any) => {
        handleRequestComplete(req, res);
      });
    });
  }

  private initializeRoutes(routes: IRoutes[]) {
    routes.forEach(route => {
      this.app.use('/', route.router);
    });
  }

  public listen() {
    this.httpServer.listen(this.app.get('port'), () => {
      const nodeVersion: string = process.version;
      logger.info(`================Villvay-Assessment-BACKEND=========================`);
      logger.info(`=== SERVER UP : http://localhost:${this.app.get('port')} | n=${nodeVersion} ===`);
    });
    (global as any).__basedir = __dirname;
  }
}

export default App;
