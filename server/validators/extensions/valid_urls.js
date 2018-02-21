class ValidUrls {
  constructor(validate) {
    validate.validators.valid_urls = (value, options, key) => {
      if (!validate.isArray(value)) {
        return validate.format("must be a array, %{value} provided.", {
          value: typeof value,
        });
      }

      let valid = true;
      value.every((element) => {
        let urlValidate = validate({ val: element }, { val: { url: true }});
        if (urlValidate !== undefined) {
          return valid = false;
        }
      });

      if (value) return undefined;
      return validate.format("must be a array, %{value} provided.", {
        value: typeof value,
      });
    };
  }
}

module.exports = ValidUrls;
