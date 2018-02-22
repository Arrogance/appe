class ValidUrls {
  constructor(validate) {
    validate.validators.valid_urls = (value) => {
      if (!validate.isArray(value)) {
        return undefined;
      }

      let valid = true;
      value.every((element) => {
        let urlValidate = validate({ val: element }, { val: { url: true }});
        if (urlValidate !== undefined) {
          valid = false;
        }
      });

      if (valid) return undefined;
      return validate.format("must have valid urls.");
    };
  }
}

module.exports = ValidUrls;
