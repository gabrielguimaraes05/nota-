import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import userController from './app/controllers/UserController';
import sessionController from './app/controllers/SessionController';
import fileController from './app/controllers/FileController';

const routes = new Router();
const file = multer(multerConfig);

routes.get('/', (req, res) => {
  res.json({ response: 'UP' });
});

routes.post('/users', userController.store);
routes.post('/sessions', sessionController.store);

routes.use(authMiddleware);
routes.put('/users', userController.update);
routes.get('/users', userController.index);
routes.post('/files', file.single('file'), fileController.store);
routes.delete('/files/:id', fileController.delete);


export default routes;
