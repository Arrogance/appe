class Extensions {
  constructor(validate) {
    new (require('./in_array'))(validate);
    new (require('./valid_urls'))(validate);
    new (require('./at_least'))(validate);
  }
}

module.exports = Extensions;
