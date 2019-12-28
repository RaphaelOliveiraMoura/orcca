import { Router } from 'express';

import UserController from '~/app/controllers/UserController';
import SessionController from '~/app/controllers/SessionController';

import validateUserCreate from '~/app/validators/User/Create';
import validateUserUpdate from '~/app/validators/User/Update';

import authMiddleware from '~/app/middlewares/auth';
import { admin, socialWorker, clerk } from '~/app/middlewares/permissions';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/users/:id', UserController.show);
routes.put('/users/:id', validateUserUpdate, UserController.update);

routes.use(clerk);

routes.get('/users', UserController.index);

routes.use(socialWorker);

routes.use(admin);

routes.post('/users', validateUserCreate, UserController.store);
routes.delete('/users/:id', UserController.destroy);

export default routes;
