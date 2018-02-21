class Extensions {
  constructor(validate) {
    new (require('./in_array'))(validate);
    new (require('./valid_urls'))(validate);
  }
}

module.exports = Extensions;
