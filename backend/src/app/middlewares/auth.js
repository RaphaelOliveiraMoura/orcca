import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '~/config/auth';

export default async (request, response, next) => {
  const authHeader = request.headers.authorization;

  if (!authHeader)
    return response.status(401).json({ error: 'JWT Token not provided' });

  const [bearer, token] = authHeader.split(' ');

  if (bearer !== 'Bearer')
    return response.status(401).json({ error: 'JWT Token malformed' });

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    request.session = decoded;
  } catch (error) {
    return response.status(401).json({ error: 'Invalid JWT token' });
  }

  return next();
};
