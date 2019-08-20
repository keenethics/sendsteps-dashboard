const pkgcloud = require('pkgcloud');

require('dotenv-safe').config({ allowEmptyValues: true });

const rackspaceClient = pkgcloud.storage.createClient({
  provider: 'rackspace',
  username: process.env.RACKSPACE_USERNAME,
  apiKey: process.env.RACKSPACE_API_KEY,
  region: process.env.RACKSPACE_REGION,
});

module.exports = rackspaceClient;
