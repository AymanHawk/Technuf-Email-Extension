//src/api/ollama/llmQuery.js
import axios from "axios";

async function llmQuery({ model, query, role, format, expectedFormat, additionalInfo, phishingJson, safeJson}) {
    try {
        console.log(model, query, role, format, expectedFormat)
        if(format === 'json' && expectedFormat !== null) {
            query = `${query} . Give me response in ${JSON.stringify(expectedFormat)} format. ${additionalInfo}.`

        }else{
            format = undefined;
            expectedFormat = undefined;
        }
        const response = await axios.post('http://localhost:11434/api/chat', { //todo email  
            model: model,
            messages: [
                {
                    "role": "system",
                    "content": `${role}. These are the phishing example jsons ${JSON.stringify(phishingJson)} and these are the safe example jsons ${JSON.stringify(safeJson)}`
                },
                {
                    "role": "user",
                    "content": `${query}` 
                },
            ],
            stream: false,
            format: `${format}`  
        });

        return response
    } catch (error) {
        console.error('Error while processing llm query via api', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error while processing llm query via api' }),
        };
    }

}

export default llmQuery;