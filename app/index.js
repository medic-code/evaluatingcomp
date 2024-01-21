import dotenv from 'dotenv';
import path from 'path'; // Import the 'path' module

dotenv.config({ path: `${path.dirname(import.meta.url)}/../.env` });

import { retrivalChain } from './llm/chains.js';
import { createRetriver } from './llm/ingestion.js';
import framework from './utils/framework.js';
import { promises as fsp } from 'fs';


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