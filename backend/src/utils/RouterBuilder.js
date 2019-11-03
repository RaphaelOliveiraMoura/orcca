class RouterBuilder {
  constructor(router) {
    this.router = router;
  }

  get(path, action) {
    this.method = 'get';
    this.path = path;
    this.action = action;
    return this;
  }

  post(path, action) {
    this.method = 'post';
    this.path = path;
    this.action = action;
    return this;
  }

  put(path, action) {
    this.method = 'put';
    this.path = path;
    this.action = action;
    return this;
  }

  delete(path, action) {
    this.method = 'delete';
    this.path = path;
    this.action = action;
    return this;
  }

  withAuth(middleware) {
    this.auth = middleware;
    return this;
  }

  withValidation(middleware) {
    this.validation = middleware;
    return this;
  }

  build() {
    return this.router[this.method](
      this.path,
      ...[this.auth, this.validation].filter(middleware => !!middleware),
      this.action
    );
  }
}

module.exports = RouterBuilder;
