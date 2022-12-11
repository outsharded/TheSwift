const fs = require("fs");
const path = require("path");
const OpenAI = require('openai-api');
const { OPENAI_API_KEY } = require("../config.json");
const openai = new OpenAI(OPENAI_API_KEY);

(async () => {
const gptResponse = await openai.complete({
    engine: 'davinci',
    prompt: 'this is a test',
    maxTokens: 50,
    temperature: 0.9,
    topP: 1,
    presencePenalty: 0,
    frequencyPenalty: 0,
    bestOf: 1,
    n: 1,
    stream: false,
    stop: ['\n', "testing"]
});

console.log(gptResponse.data);
})();