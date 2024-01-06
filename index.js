const dotenv = require('dotenv');
const generate = require('./llm/ingestion');
dotenv.config({ path: `${__dirname}/.env` });

generate();
