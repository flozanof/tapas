'use strict';

const app = require('./app')
const app2 = require('./appUploadFile')
const config = require('./configDomain');
const config2 = require('./configDomainUpFile');

app.listen(config.port, () => {
    console.log(`API REST running in http://localhost:${config.port}`);
});

app2.listen(config2.port, () => {
    console.log(`API REST running in http://localhost:${config2.port}`);
});