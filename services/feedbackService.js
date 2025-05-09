const axios = require("axios");

async function getAIFeedback(checklist) {
	const prompt = `

You're giving feedback to an 11-year-old student on their phishing detection checklist for emails.

If the checklist includes at least five useful and accurate points about phishing, only give positive feedback—such as “Great job on creating a checklist for spotting phishing scams!” Avoid suggesting improvements in this case.

If the checklist has useful information but could be improved, only provide one or two simple suggestions for making it clearer or more helpful. Never give more than two suggestions.

If the checklist is too vague (e.g., saying only "blabla"), gently explain that they need to add more specific points to help detect phishing. Keep your suggestions short and easy to follow.

Avoid difficult words and keep sentences clear and friendly. If some points are too similar, kindly suggest how they can be made different. If any points are unrelated to phishing, suggest removing them.

Do not: use numbered lists, mention how many items are on the checklist or comment on the item about personal information as it is already covered.

Checklist:
${checklist.join("\n")}

Provide your response in the following format:
**Strengths:** <List strengths here>
**Improvements:** <List improvements here>
Do not provide more than two strengths or two improvements.
  `;

	try {
		const response = await axios.post(
			"https://api.openai.com/v1/chat/completions",
			{
				model: "gpt-4o-mini",
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
