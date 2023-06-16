const { Configuration, OpenAIApi } = require("openai");

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { inputValue } = req.body;

    const configuration = new Configuration({
      apiKey:"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",
    });
    const openai = new OpenAIApi(configuration);

    try {
      // OpenAI API를 이용하여 작품 설명 검색하기
      const prompt = `explanation: ${inputValue}
      Provide an explanation of the painting based on the name of the painting and painter. Also, without no empty lines, only JSON format like {"explanation": "content"}`;

      const completions = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1000,
      });

      console.log(completions.data);
      const originalText = completions.data.choices[0].text
        .trim()
        .replace(/\n/g, "");
      console.log(originalText);

      const explanation = JSON.parse(originalText);

      // 결과를 클라이언트로 반환
      res.status(200).json({ ...explanation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "작품 설명 불러오기를 실패했습니다." });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
