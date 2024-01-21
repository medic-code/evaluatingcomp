import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio.js';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter.js';
import { HtmlToTextTransformer } from 'langchain/document_transformers/html_to_text.js';
import createVectorStore from './vectorstore.js';
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube.js';
import { getPDF } from '../utils/processPDF.js';
import { RecursiveUrlLoader } from 'langchain/document_loaders/web/recursive_url.js';
import { compile } from 'html-to-text';


async function loadYoutube(url) {
    const loader = YoutubeLoader.createFromUrl(url,{
        language: "en",
        addVideoInfo: true
    })
    const docs = await loader.load()
    return docs;
}

async function loadWebsite(url) {
    const compiledConvert = compile({wordwrap: 130});

    const loader = new RecursiveUrlLoader(url, {
        extractor: compiledConvert
    })
    const docs = await loader.load();

    return docs;
}

async function loadData(urls) {
    let allData = []
    for (let i = 0; i < urls.length; i++ ) {
        const loader = new CheerioWebBaseLoader(urls[i])
        const data = await loader.load();
        allData.push(data);
        console.log(`Load website data from url${i}`);
    }
    const youtubeDocs = await loadYoutube('https://www.youtube.com/watch?v=ecaM2e3Rfzw');
    const pdfDocs = await getPDF('https://arxiv.org/pdf/2301.08801.pdf')
    const websiteDocs = await loadWebsite('https://www.curaihealth.com/about')
    allData.push(youtubeDocs,pdfDocs, websiteDocs);
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

async function createRetriever() {
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

module.exports = { createRetriever, loadWebsite }; 