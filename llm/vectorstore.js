const { createClient } = require('@supabase/supabase-js');
const { SupabaseVectorStore } = require('langchain/vectorstores/supabase');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');

async function createVectorstore(documents) {
    const sbApiKey = process.env.SUPABASE_API_KEY;
    const sbUrl = process.env.SUPABASE_URL_LC_CHATBOT;
    const openAIApiKey = process.env.OPENAI_API_KEY;
    try {
        const client = createClient(sbUrl, sbApiKey);
        await SupabaseVectorStore.fromDocuments(
            documents,
            new OpenAIEmbeddings({openAIApiKey}),
            {
                client,
                tableName: 'documents'
            }
        )
    } catch(error) {
        console.error(error)
    }
    
}

module.exports = createVectorstore;