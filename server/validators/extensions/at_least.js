class AtLeast {
  constructor(validate) {
    validate.validators.at_least = (value, options) => {
      if (options.requirement === undefined) {
        options.requirement = 1;
      }

      if (!validate.isArray(value)) {
        return validate.format("must have at least one of %{required} defined.", {
          required: options.required
        });
      }

      let x = 0;
      value.forEach(r => {
        if (r !== undefined) x++;
      });

      if (x >= options.requirement) return undefined;
      return validate.format("must have at least one of %{required} defined.", {
        required: options.required
      });
    };
  }
}

module.exports = AtLeast;
