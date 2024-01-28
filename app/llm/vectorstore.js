import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { OpenAIEmbeddings } from "@langchain/openai";
import { createClient } from "@supabase/supabase-js";

export default async function createVectorstore(documents) {
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