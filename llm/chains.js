const { OpenAI } = require('langchain/llms/openai');
const prompt  = require('./prompts');
const { RunnableSequence, RunnablePassthrough } = require('langchain/schema/runnable');
const { StringOutputParser } = require('langchain/schema/output_parser');
const createRetriver = require('./ingestion');
const dotenv = require('dotenv');
const framework = require('../utils/framework');
const docAsString = require('../utils/formatDocs');

dotenv.config({ path: `${__dirname}/.env` });

const model = new OpenAI({temperature: 0.9, openAIApiKey:process.env.OPENAI_API_KEY});

async function documentRetrivalChain(vectorStore) {
    const retriever = vectorStore.asRetriever();
    const chain = RunnableSequence.from([
        (input) => input.question.replaceAll('{product}',input.product),
        retriever,
        docAsString
    ])

    return chain;
}

async function retrivalChain(question,product,vectorStore) {
    const chain = RunnableSequence.from([
        {
            question: (input) => input.question.replaceAll(' ', '').replaceAll('{product}',input.product),
            context: () => documentRetrivalChain(vectorStore)
        },
        prompt,
        model,
        new StringOutputParser()
    ])

    const results = await chain.invoke({question: question, product: product });

    return results;
}



module.exports = { documentRetrivalChain, retrivalChain }