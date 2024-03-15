import express, { Application, Request, Response, NextFunction } from 'express';

import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import connectDb from './config/db.config';
import Variable from './constants/env/variable.env';
import HttpCode from './constants/http-code';
import HttpMessage from './constants/http-message';
import Api from './constants/api';
import IController from './interfaces/controller.interface';
import HttpException from './utils/exceptions/http.exception';
import logger from './utils/logger.utils';
import errorHandler from './middlewares/error.middleware';

class App {
    public app: Application;
    private DATABASE_URL: string;

    constructor(controllers: IController[]) {
        this.app = express();
        this.DATABASE_URL = Variable.DATABASE_URL;

        this.initialiseDatabaseConnection(this.DATABASE_URL);
        this.initialiseConfig();
        this.initialiseRoutes();
        this.initialiseControllers(controllers);
        this.initialiseErrorHandling();
    }

    private initialiseConfig(): void {
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ limit: '10mb', extended: true, parameterLimit: 50000 }));
        this.app.use(cookieParser());
        this.app.use(compression());
        this.app.use(cors());//app.use(cors({ origin: corsUrl, optionsSuccessStatus: 200 }));
        this.app.use(helmet());
        
    }

    private initialiseRoutes(): void {
        this.app.get(
            Api.ROOT,
            (_req: Request, res: Response, next: NextFunction) => {
                try {
                    return res.status(HttpCode.OK).json({
                        status: {
                            code: HttpCode.OK,
                            msg: HttpMessage.OK,
                        },
                        msg: HttpMessage.API_WORKING,
                    });
                } catch (err: any) {
                    return next(

                        new HttpException(
                            HttpCode.INTERNAL_SERVER_ERROR,
                            HttpMessage.INTERNAL_SERVER_ERROR,
                            err.message,
                        ),
                    )
                }
            },
        )
    }

    private initialiseControllers(controllers: IController[]): void {
        controllers.forEach((controller: IController) => {
            this.app.use(Api.ROOT, controller.router);
        });
    }

    private initialiseErrorHandling(): void {
        //ToDo
        this.app.use(errorHandler);
    }

    private initialiseDatabaseConnection(url: string): void {
        connectDb(url)
    }

    normalizePort = (val: any) => {
        const port = parseInt(val, 10)
      
        if (Number.isNaN(port)) {
          // named pipe
          return val
        }
      
        if (port >= 0) {
          // port number
          return port
        }
      
        return false
      }
      
      
    public listen(): void {
        const port = this.normalizePort(Variable.PORT || '3030');
        this.app.listen(port, () => {
            console.log(`App listening on the port ${port}`);
        })
        .on('error', (e) => logger.error(e));

        
    }

    
// server.on('error', onError)
// server.on('listening', onListening)

}

export default App;
