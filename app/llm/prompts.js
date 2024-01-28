import { PromptTemplate } from '@langchain/core/prompts';

const QUESTION_TEMPLATE = `You are an experienced researcher, 
expert at interpreting and answering questions based on provided sources.
Using the provided context, answer the user's question 
to the best of your ability using only the resources provided. 
Be verbose!

<context>

{context}

</context>

Now, answer this question using the above context:

{question}`;

const prompt = PromptTemplate.fromTemplate(QUESTION_TEMPLATE);

export default prompt;