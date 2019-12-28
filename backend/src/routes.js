import { Router } from 'express';

import UserController from '~/app/controllers/UserController';
import SessionController from '~/app/controllers/SessionController';

import validateUserCreate from '~/app/validators/User/Create';

import authMiddleware from '~/app/middlewares/auth';
import { admin, socialWorker, clerk } from '~/app/middlewares/permissions';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.use(clerk);

routes.get('/users', UserController.index);

routes.use(socialWorker);

routes.use(admin);

routes.post('/users', validateUserCreate, UserController.store);

export default routes;
