const kong = require('../../config/kong');
const axios = require('axios');
const validate = require('validate.js');

const constraints = require('../../validators/apis');
const baseModel = require('../../model');
const endpoint = '/apis';

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
    this.createGetRoute();
    this.createPostRoute();
  }

  createPostRoute() {
    this.router.post(endpoint, (req, res) => {
      let uris = req.body.uris;
      let hosts =  req.body.hosts.trim().split(',');
      let methods = validate.isString(req.body.methods)
        ?  req.body.methods.trim().split(',')
        : undefined
      ;

      let ApisModel = new baseModel({
        name: req.body.name,
        uris: uris,
        hosts: hosts,
        methods: methods,
        upstream_url: req.body.upstream_url,
        strip_uri: req.body.strip_uri,
        preserve_host: req.body.preserve_host,
        retries: req.body.retries,
        upstream_connect_timeout: req.body.upstream_connect_timeout,
        upstream_send_timeout: req.body.upstream_send_timeout,
        upstream_read_timeout: req.body.upstream_read_timeout,
        https_only: req.body.https_only,
        http_if_terminated: req.body.http_if_terminated
      });

      let validateModel = validate(ApisModel.fields, constraints);

      if (validateModel !== undefined) {
        // @todo throw error validator
        res.status(400).send(validateModel);
      }

      console.log(validateModel);
      res.status(200).send();
    })
  }

  createGetRoute() {
    this.router.get(endpoint + '/:id', function(req, res) {
      let id = req.params.id;

      if (id === undefined) {
        // @todo throw error no parameter found (strange, coz the route will not work but...)
      }

      let url = kong.admin_api + endpoint + '/' + id;
      axios.get(url)
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
