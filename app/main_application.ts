require('dotenv').config()
import express = require('express')
import "reflect-metadata"
import { Controller } from './controller/controller'
import ErrorHandlerMiddleware from './middleware/error_middleware'
//const multer = require("multer");
import cors from 'cors';


class MainApplication {
  public app: express.Application;
  public origins: Array<string> = [
    '*'
  ];

  public accessControl = (req: any, res: any, next: any) => {
    this.origins.forEach(function (origin) {
      res.header('Access-Control-Allow-Origin', origin);
    });
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "*");
    next();
  };


//   public imageFilter = (req: any, filedata: any, cb: any) => {
//     // accept image only
//     if (!filedata.originalname.match(/\.(jpg|jpeg|png|gif|pdf|word|wordx|xls|xlsx)$/)) {
//       return cb(new Error('Only image, pdf and office files are allowed!'), false);
//     }
//     cb(null, true);
//   };

//   public storage = multer.diskStorage({
//     destination: function (req: any, file: any, cb: any) {
//       if (file.fieldname === 'attachment') {
//         cb(null, '/home/node/app/app/public/uploads/employeedocs/');
//       }
//     },
//     filename: function (req: any, file: any, cb: any) {
//       if (file.fieldname === 'attachment') {
//         cb(null, `${file.originalname}`)
//       }
//     }
//   })


  constructor(controllers: Controller[]) {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.io = new Server(this.httpServer, {
      origins: true,
      methods: "*",
      transports: ['websocket'],
    }
    );
    this.initializeMiddlewares()
    this.initializeControllers(controllers)
    this.initializeErrorHandling()
    this.initializeSocket()
  }


  public listen() {
    this.app.listen(process.env.PORT, () => {
      console.log(`MainApplication listening on the port ${process.env.PORT}`);
    }).keepAliveTimeout = 2 * 60 * 1000;
  }


  public dispose() { }


  private initializeMiddlewares() {
    this.app.use(this.accessControl);
    this.app.use(express.json())
    this.app.use(express.static('uploads'))
    this.app.use(express.urlencoded({ extended: true }))
    // this.app.use(multer({ storage: this.storage, fileFilter: this.imageFilter }).fields([
    //   { name: "profileImg", maxCount: 1 },
    //   { name: "attachments", maxCount: 5 },
    //   { name: "attachment", maxCount: 1 },
    //   { name: "cvAttachments", maxCount: 10 }]));
    this.app.use(cors({
      origin: true,
      methods: "*",
      allowedHeaders: ['Content-Type', 'Authorization'],
      optionsSuccessStatus: 204
    }))
  }

  private initializeErrorHandling() {
    this.app.use(ErrorHandlerMiddleware.errorMiddleware)
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }
}

export default MainApplication
