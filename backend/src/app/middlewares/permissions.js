export async function admin(request, response, next) {
  const { rule_id } = request.session;

  if (!rule_id || rule_id !== 1) {
    return response
      .status(401)
      .json({ error: 'You dont have permission to access this resouce' });
  }

  return next();
}

export async function socialWorker(request, response, next) {
  const { rule_id } = request.session;

  if (!rule_id || (rule_id !== 1 && rule_id !== 2)) {
    return response
      .status(401)
      .json({ error: 'You dont have permission to access this resouce' });
  }

  return next();
}
