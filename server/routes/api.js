const express = require('express');
const router = express.Router();

new (require('./kong/root'))(router);
new (require('./kong/status'))(router);
new (require('./kong/apis'))(router);

module.exports = router;
