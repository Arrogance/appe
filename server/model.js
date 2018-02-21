/**
 * Default model to mockup any JS object and validate it
 */
class Model {
  constructor(fields) {
    this.fields = fields !== undefined ? fields : {};
  }

  get(field) {
    return this.fields[field];
  }

  set(field, value) {
    this.fields[field] = value;
    return this;
  }
}

module.exports = Model;
