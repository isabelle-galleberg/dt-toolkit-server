const axios = require("axios");

async function getAIHints(scamsDetected) {
	const prompt = `
    You're reviewing a user's list of elements related to phishing scams that they have detected in an email. Based on the following points, provide one relevant hint to guide the user:

    1. Check the sender: Does the email address look legitimate? (Look for misspellings or domain mismatches)
    2. Watch out for pressure or unrealistic offers: Is it urging immediate action, threatening consequences, or offering something too good to be true?
    3. Check the links: Hover over links—do the actual URLs match the displayed text or the company's website?
    4. Check the greeting: Does it use a generic greeting like "Dear Customer" instead of your name?
    5. Look for errors: Are there typos, grammatical mistakes, or strange phrasing?
    6. Think about the requests: Does it ask for sensitive information like passwords or credit card numbers?

    Detected scams:
    ${scamsDetected.join("\n")}

    If all six points are covered, reply with "Well done" and no hint. If any of the points are missing, provide one relevant hint based on the missing or incomplete point.
    The hint should be brief and relevant to the detected scams.
  `;

	try {
		const response = await axios.post(
			"https://api.openai.com/v1/chat/completions",
			{
				model: "gpt-3.5-turbo",
				messages: [
					{
						role: "system",
						content:
							"You are a helpful assistant providing hints for phishing scam detection.",
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

		const hint = response.data.choices[0].message.content.trim();

		if (hint === "Well done") {
			return { hint: "Well done!" }; // No hint needed
		}
		return { hint };
	} catch (error) {
		console.error("Error with AI API:", error);
		throw new Error("Error retrieving hint");
	}
}

module.exports = { getAIHints };
