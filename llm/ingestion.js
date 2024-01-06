const { CheerioWebBaseLoader } = require("langchain/document_loaders/web/cheerio");
const { RecursiveCharacterTextSplitter } = require('langchain/text_splitter');
const { HtmlToTextTransformer } = require('langchain/document_transformers/html_to_text');
const createVectorStore = require('./vectorstore');

async function loadData(url) {
    const loader = new CheerioWebBaseLoader(url)
    const data = await loader.load();
    return data;
}

async function chunkData(data) {
    const textSplitter = RecursiveCharacterTextSplitter.fromLanguage("html");
    const transformer = new HtmlToTextTransformer();

    const sequence = textSplitter.pipe(transformer);

    const newDocuments = await sequence.invoke(data);

    return newDocuments;
}

async function generate() {
    const data = await loadData("http://www.curaihealth.com/");
    const modifiedData = await chunkData(data);
    await createVectorStore(modifiedData);
    console.log('Vector store data added');
}

module.exports = generate; 