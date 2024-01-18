const { CheerioWebBaseLoader } = require("langchain/document_loaders/web/cheerio");
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { HtmlToTextTransformer } = require('langchain/document_transformers/html_to_text');
const createVectorStore = require('./vectorstore');

async function loadData(urls) {
    let allData = []
    for (let i = 0; i < urls.length; i++ ) {
        const loader = new CheerioWebBaseLoader(urls[i])
        const data = await loader.load();
        allData.push(data);
        console.log(`Load website data from url${i}`);
    }
    console.log(allData.flat());
    return allData.flat();
}

async function chunkData(data) {
    const textSplitter = RecursiveCharacterTextSplitter.fromLanguage("html");
    const transformer = new HtmlToTextTransformer();
    const sequence = textSplitter.pipe(transformer);
    const newDocuments = await sequence.invoke(data);
    console.log('Split data into documents')
    return newDocuments;
}

async function createRetriver() {
    try {
        const data = await loadData(['https://research.contrary.com/reports/lattice','https://research.contrary.com/reports/solv']);
        if (!data) {
            console.error("No data returned from loadData");
            return null;
        }

        const modifiedData = await chunkData(data);
        if (!modifiedData) {
            console.error("No data returned from chunkData");
            return null;
        }

        const vectorStore = await createVectorStore(modifiedData);
        if (!vectorStore || !vectorStore.asRetriever) {
            console.error("createVectorStore did not return a valid vectorStore object");
            return null;
        }
        console.log('Create vector embeddings of documents and vectorStore');
        return vectorStore;
    } catch (error) {
        console.error("Error in createRetriver:", error);
        return null;
    }
}

module.exports = createRetriver; 