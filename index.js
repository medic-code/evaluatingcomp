const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/.env` });
const {retrivalChain} = require('./llm/chains');
const { createRetriver } = require('./llm/ingestion');
const framework = require('./utils/framework');
const fsp = require('fs').promises;
const path = require("path");

async function generate() {
    const vectorStore = await createRetriver()
    const frameworks = Object.entries(framework);
    const report = {}
    for (let i = 0; i < frameworks.length; i++) {
        let results = await retrivalChain(frameworks[i][1], 'solv',vectorStore);
        report[frameworks[i][0]] = results.replaceAll('\n','');
        console.log('Creating',frameworks[i][0]);
    }
    fsp.writeFile(path.join(__dirname,'report.json'),JSON.stringify(report,null,2));
}

generate();