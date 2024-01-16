const { OpenAI } = require('langchain/llms/openai');
const prompt  = require('./prompts');
const { RunnableSequence, RunnablePassthrough } = require('langchain/schema/runnable');
const { StringOutputParser } = require('langchain/schema/output_parser');
const createRetriver = require('./ingestion');
const dotenv = require('dotenv');
const framework = require('../utils/framework');
const docAsString = require('../utils/formatDocs');

dotenv.config({ path: `${__dirname}/.env` });

const model = new OpenAI({temperature: 0.9, openAIApiKey:'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'});

async function documentRetrivalChain() {
    const vectorStore = await createRetriver(); // Check what vectorStore contains
    const retriever = vectorStore.asRetriever();
    const chain = RunnableSequence.from([
        (input) => input.question,
        retriever,
        docAsString
    ])
    return chain;
}

async function retrivalChain(question,product) {
    const chain = RunnableSequence.from([
        {
            question: (input) => input.question,
            product: (input) => input.product,
            context: (input) => documentRetrivalChain(input)
        },
        prompt,
        model,
        new StringOutputParser()
    ])
    const results = await chain.invoke({question: question, product: product });

    return results;
}



module.exports = { documentRetrivalChain, retrivalChain }