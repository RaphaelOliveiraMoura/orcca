import { Router } from 'express';

import UserController from '~/app/controllers/UserController';

import validateUserCreate from '~/app/validators/User/Create';

const routes = new Router();

routes.post('/users', validateUserCreate, UserController.store);

export default routes;
