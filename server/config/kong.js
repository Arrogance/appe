require('dotenv').config();

const kong = {
  admin_api: process.env.KONG_ADMIN_API || 'http://localhost:8001'
};

module.exports = kong;
