import database from '~/database';

import userRulesSeed from '~/database/seeders/20191228140558-user-rules';

const seeds = [userRulesSeed];

export default async function truncate() {
  await Promise.all(
    Object.keys(database.connection.models).map(model => {
      return database.connection.models[model].destroy({
        truncate: { cascae: true },
        force: true,
      });
    })
  );

  return Promise.all(
    seeds.map(async seed => seed.up(database.connection.queryInterface))
  );
}
