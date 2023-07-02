import express from 'express';
import cors from 'cors';
import SocketIO,{Server as SocketIOServer} from 'socket.io';
import { createServer } from 'http';
import { socketController } from '../sockets/socket';

class Server {

  public app: express.Application;
  public port: string | number | undefined;
  public paths: any;
  public server: import("http").Server<typeof import("http").IncomingMessage, typeof import("http").ServerResponse>;
  public io: SocketIO.Server;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.port = process.env.PORT || 3000;

    this.io = new SocketIOServer(this.server, {
      cors: {
        origin: "http://127.0.0.1:5173"
      }
    })
    
    this.paths = {}


    // Middlewares
    this.middlewares();

    // Rutas de mi aplicación
    this.routes();

    this.sockets();
  }

  middlewares() {

    // CORS
    this.app.use(cors());

    /*         // Lectura y parseo del body
            this.app.use( express.json() );
     */
    // Directorio Publico
    this.app.use(express.static('public'));

  }

  routes() {

    // this.app.use( this.paths.auth, require('../routes/auth'));
  }


  sockets() {
    this.io.on("connect",socketController)
  }

  listen() {
    this.server.listen(this.port, () => {
      
      console.log(`Server is runing on http://localhost:${this.port}`);
    });
  }

}
export default Server;




