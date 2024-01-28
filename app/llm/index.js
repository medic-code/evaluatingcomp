import { retrievalChain } from './chains.js';
import { createRetriever } from './ingestion.js';
import framework from '../utils/framework.js';

export default async function generate(details) {
    const {name,query,websites,youtube,pdf} = details;
    console.log(details);
    const vectorStore = await createRetriever({query,websites,youtube,pdf})
    const frameworks = Object.entries(framework);
    const report = {}
    for (let i = 0; i < frameworks.length; i++) {
        let results = await retrievalChain(frameworks[i][1], name,vectorStore);
        report[frameworks[i][0]] = results.replaceAll('\n','');
        console.log('Creating',frameworks[i][0]);
    }
    console.log('complete');
    return report;
    // fsp.writeFile(path.join(__dirname,'report.json'),JSON.stringify(report,null,2));
}

