const axios = require("axios");

async function getAIFeedback(checklist) {
	const prompt = `
You are giving feedback to an 11-year-old student on their phishing detection checklist. 
- First, say what they did well in a simple and friendly way. 
- Then, give one or two easy suggestions to help them improve. 
- Use short, clear sentences and no difficult words. 
- If some points are too similar, gently suggest how they can make them different.

Checklist:
${checklist.join("\n")}

Provide your response in the following format:
**Strengths:** <List strengths here>
**Improvements:** <List improvements here>
  `;

	try {
		const response = await axios.post(
			"https://api.openai.com/v1/chat/completions",
			{
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content: "You are a helpful assistant that reviews checklists.",
					},
					{ role: "user", content: prompt },
				],
				max_tokens: 500,
			},
			{
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					"Content-Type": "application/json",
				},
			}
		);

		const feedback = response.data.choices[0].message.content.trim();

		// Extract strengths and improvements using simple splitting
		const strengthsMatch = feedback.match(
			/\*\*Strengths:\*\*([\s\S]*?)\*\*Improvements:\*\*/
		);
		const improvementsMatch = feedback.match(/\*\*Improvements:\*\*([\s\S]*)/);

		const strengths = strengthsMatch
			? strengthsMatch[1].trim()
			: "No strengths identified.";
		const improvements = improvementsMatch
			? improvementsMatch[1].trim()
			: "No improvements suggested.";

		return { strengths, improvements };
	} catch (error) {
		console.error("Error with AI API:", error);
		throw new Error("Error retrieving feedback");
	}
}

module.exports = { getAIFeedback };
