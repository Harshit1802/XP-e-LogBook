import App from './app'
import AuthController from './controllers/auth.controller';
import Controllers from './controllers/controler-list';
import UserController from './controllers/user.controller';

const  app  = new App(Controllers.list);

/**
 * Normalize a port into a number, string, or false.
 */

//app.set('port', port)

/**
 * Create HTTP server.
 */
//const server = http.createServer(app)

/**
 * Event listener for HTTP server "error" event.
 */
// const onError = (error: any) => {
//   if (error.syscall !== 'listen') {
//     throw error
//   }

//   const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`

//   // handle specific listen errors with friendly messages
//   switch (error.code) {
//     case 'EACCES':
//       logger.error(`${bind} requires elevated privileges`)
//       process.exit(1)
//       break
//     case 'EADDRINUSE':
//       logger.error(`${bind} is already in use`)
//       process.exit(1)
//       break
//     default:
//       throw error
//   }
// }

/**
 * Event listener for HTTP server "listening" event.
 */
// const onListening = () => {
//   const addr = server.address()
//   const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`
//   logger.info(`Listening on ${bind}`)
// }

app.listen();
// server.on('error', onError)
// server.on('listening', onListening)
