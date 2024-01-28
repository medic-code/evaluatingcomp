import { OpenAI } from "@langchain/openai";
import prompt from './prompts.js';
import { RunnableSequence } from '@langchain/core/runnables';
import { StringOutputParser } from '@langchain/core/output_parsers';
import docAsString from '../utils/formatDocs.js';

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

export async function retrievalChain(question,product,vectorStore) {
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

