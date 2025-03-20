const axios = require("axios");

async function getAIFeedback(checklist) {
	const prompt = `
You’re giving feedback to an 11-year-old student on their phishing detection checklist for emails.

Start by saying what they did well in a simple and friendly way, but only if the checklist contains useful information. If the checklist is too vague, like just saying "blabla," explain gently that they need to add more specific points to help detect phishing. Offer one or two easy suggestions for improvement, and encourage them to be more specific.

Use short, clear sentences and avoid difficult words. If some points are too similar, kindly suggest how they can make them different. If any items on the checklist aren’t relevant to phishing detection, suggest they remove them.

Avoid using numbered lists, and don’t mention how many items are on the list. Also, don’t mention the point that asks about personal information, as it’s already included.
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
