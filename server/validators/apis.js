const validate = require('validate.js');
new (require('./extensions/extensions'))(validate);

const validHttpVerbs = ["GET", "POST", "PUT", "PATCH", "HEAD", "OPTIONS", "DELETE", "TRACE", "CONNECT"];
const validUrlSchemes = ["http", "https"];

let constraint = {
  name: {
    presence: true,
    format: {
      pattern: "([A-Za-z0-9\\-\\_\\/\\,]+)",
      message: (value) => {
        return validate.format('must be alphanumeric, %{value} provided.', {
          value: value
        })
      }
    }
  },
  uris: {
    format: {
      pattern: "([A-Za-z0-9\\-\\_\\/\\,]+)",
      message: (value) => {
        return validate.format('must be alphanumeric, only slashes and dashes, %{value} provided.', {
          value: value
        })
      }
    }
  },
  hosts: {
    valid_urls: true
  },
  methods: {
    in_array: {
      within: validHttpVerbs,
      message: (value) => {
        return validate.format('must be a valid HTTP verb (%{verbs}), %{value} provided.', {
          value: value,
          verbs: validHttpVerbs.join(', ')
        })
      }
    }
  },
  upstream_url: {
    url: {
      schemes: validUrlSchemes,
      message: (value) => {
        return validate.format('must be a valid url scheme (%{schemes}), %{value} provided.', {
          value: value,
          schemes: validUrlSchemes.join(', ')
        })
      }
    }
  },
  strip_uri: {
    inclusion: {
      within: [true, false],
      message: (value) => {
        return validate.format('must be a boolean value.', {
          value: value
        })
      }
    }
  },
  preserve_host: {
    inclusion: {
      within: [true, false],
      message: (value) => {
        return validate.format('must be a boolean value.', {
          value: value
        })
      }
    }
  },
  retries: {
    format: {
      pattern: "/^\\d*\\.?\\d+$/",
      message: (value) => {
        return validate.format('must be a positive integer, %{value} provided.', {
          value: value
        })
      }
    }
  },
  upstream_connect_timeout: {
    format: {
      pattern: "/^\\d*\\.?\\d+$/",
      message: (value) => {
        return validate.format('must be a positive integer, %{value} provided.', {
          value: value
        })
      }
    }
  },
  upstream_send_timeout: {
    format: {
      pattern: "/^\\d*\\.?\\d+$/",
      message: (value) => {
        return validate.format('must be a positive integer, %{value} provided.', {
          value: value
        })
      }
    }
  },
  upstream_read_timeout: {
    format: {
      pattern: "/^\\d*\\.?\\d+$/",
      message: (value) => {
        return validate.format('must be a positive integer, %{value} provided.', {
          value: value
        })
      }
    }
  },
  https_only: {
    inclusion: {
      within: [true, false],
      message: (value) => {
        return validate.format('must be a boolean value.', {
          value: value
        })
      }
    }
  },
  http_if_terminated: {
    inclusion: {
      within: [true, false],
      message: (value) => {
        return validate.format('must be a boolean value.', {
          value: value
        })
      }
    }
  }
};

module.exports = constraint;
