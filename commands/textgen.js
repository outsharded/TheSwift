const { OPENAI_API_KEY } = require("../config.json");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

(async () => {
const completion = await openai.createCompletion({
    model: "text-ada-001",
    prompt: "The Swift Den is a",
  });
  console.log(completion.data.choices[0].text);
})();