import { CheerioWebBaseLoader } from 'langchain/document_loaders/web/cheerio';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { HtmlToTextTransformer } from '@langchain/community/document_transformers/html_to_text';
import createVectorStore from './vectorstore.js';
import { YoutubeLoader } from 'langchain/document_loaders/web/youtube';
import { getPDF } from '../utils/processPDF.js';
import { RecursiveUrlLoader } from 'langchain/document_loaders/web/recursive_url';
import { compile } from 'html-to-text';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { TextLoader } from "langchain/document_loaders/fs/text";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import { DocxLoader } from "langchain/document_loaders/fs/docx";

export async function loadYoutube(url) {
    const loader = YoutubeLoader.createFromUrl(url,{
        language: "en",
        addVideoInfo: true
    })
    const docs = await loader.load()
    return docs;
}

export async function loadWebsite(url) {
    const compiledConvert = compile({wordwrap: 130});

    const loader = new RecursiveUrlLoader(url, {
        extractor: compiledConvert
    })
    const docs = await loader.load();

    return docs;
}

export async function loadData(input) {
    const { query, websites,folder} = input;
    console.log(folder, 'folder');
    let allData = []
    if (websites[0] !== '') {
        for (let i = 0; i < websites.length; i++ ) {
            if(websites[i].includes('youtube')) {
                const youtubeDocs = await loadYoutube(websites[i]);
                allData.push(youtubeDocs);
            } else if(websites[i].includes('.pdf')) {
                const pdfDocs = await getPDF(websites[i]);
                allData.push(pdfDocs);
            } else {
                const loader = new CheerioWebBaseLoader(websites[i])
                const data = await loader.load();
                allData.push(data);
            }
       
            console.log(`Load website data from url${i}`);
        }
    }

    if (folder) {
            let absolutePath = process.cwd() + folder;
            const loader = new DirectoryLoader(absolutePath, {
                ".txt": (path) => new TextLoader(path),
                ".pdf": (path) => new PDFLoader(path),
                ".docx": (path) => new DocxLoader(path)
            })
            const docs = await loader.load();
            allData.push(docs)
            console.log(`Loaded upload files`);
        
    }

    const websiteDocs = await loadWebsite(query)
    allData.push(websiteDocs);
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

export async function createRetriever(input) {
    try {
        const data = await loadData(input);
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
