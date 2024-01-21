import { createClient } from '@supabase/supabase-js';
import { SupabaseVectorStore } from 'langchain/vectorstores/supabase.js';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai.js';


async function createVectorstore(documents) {
    const sbApiKey = process.env.SUPABASE_API_KEY;
    const sbUrl =  process.env.SUPABASE_URL_LC_CHATBOT;
    const openAIApiKey = process.env.OPENAI_API_KEY;
    try {
        const client = createClient(sbUrl, sbApiKey);
        const vectorStore = await SupabaseVectorStore.fromDocuments(
            documents,
            new OpenAIEmbeddings({openAIApiKey}),
            {
                client,
                tableName: 'documents'
            }
        )
        return vectorStore;

    } catch(error) {
        console.error(error)
    }
}

module.exports = createVectorstore;