const validHttpVerbs = ["GET", "POST", "PUT", "PATCH", "HEAD", "OPTIONS", "DELETE", "TRACE", "CONNECT"];

class InArray {
  constructor(validate) {
    validate.validators.in_array = (value, options, key) => {
      if (options.within === undefined) {
        return undefined;
      }

      let valid = value.some(r => options.within.indexOf(r) >= 0);
      if (valid) return undefined;

      return validate.format("must be a valid HTTP verb (%{verbs}), %{value} provided.", {
        value: value,
        verbs: validHttpVerbs.join(', ')
      });
    };
  }
}

module.exports = InArray;
