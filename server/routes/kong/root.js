const kong = require('../../config/kong');
const axios = require('axios');

const endpoint = '/';

/**
 * @todo better error catching
 */
class Root {
  /**
   * Root constructor
   * @param router
   */
  constructor(router) {
    this.router = router;
    this.createRoute();
  }
  createRoute() {
    this.router.get(endpoint, function(req, res) {
      axios.get(kong.admin_api + endpoint)
        .then(function(content) {
          if (typeof content.data === 'undefined') {
            throw 'Failed to get a valid response';
          }
          res.status(200).json(content.data);
        })
        .catch(function(error) {
          res.status(500).json(error.message);
        });
    });
  }
}

module.exports = Root;
