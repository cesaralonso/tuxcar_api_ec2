const cors = require('cors');

module.exports = cors({
    origin: true,
    credentials: true,
    allowedHeaders: ['X-XSRF-TOKEN' ,'Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-CSRF-TOKEN', 'XMLHttpRequest'],
    methods: ['GET','POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS']
})