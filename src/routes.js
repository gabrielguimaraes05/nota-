import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';
import userController from './app/controllers/UserController';
import sessionController from './app/controllers/SessionController';
import orderController from './app/controllers/OrderController';

const routes = new Router();

routes.get('/', (req, res) => {
  res.json({ response: 'UP' });
});

routes.post('/users', userController.store);
routes.post('/sessions', sessionController.store);

routes.use(authMiddleware);
routes.put('/users', userController.update);
routes.get('/users', userController.index);

routes.post('/orders', orderController.store);
routes.put('/orders/:orderId', orderController.update);
routes.delete('/orders/:orderId', orderController.delete);

export default routes;
