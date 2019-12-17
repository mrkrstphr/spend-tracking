const DataLoaders = require('./DataLoaders');
const createDbal = require('./db');
const conn = require('./db/conn');

class Context {
  constructor(request, response) {
    const dbal = createDbal(conn);
    this.request = request;
    this.response = response;
    this.dataloaders = new DataLoaders(dbal);
    this.dbal = dbal;
  }

  requireAuthorization = () => {
    const user =
      'user' in this.request.session ? this.request.session.user : null;

    if (!user) {
      throw new Error('Unauthenticated');
    }

    return user;
  };

  getUser = async () => {
    if ('authorization' in this.request.headers) {
      const token = await this.dbal.users.findTokenBy({
        token: this.request.headers.authorization.split(' ', 2)[1],
      });

      if (token) {
        // TODO: FIXME: Check token expiration
        return this.dbal.users.findUserByIds([token.user_id]);
      }
    }
  };
}

module.exports = Context;