export default async function handler(req, res) {
    // Allow requests from any origin (for development)
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    // Handle preflight (OPTIONS) requests properly
    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" });
    }

    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ error: "Message is required" });
        }

        console.log("Received message:", message);

        // Call Hugging Face API
        const response = await fetch(
            "https://api-inference.huggingface.co/models/facebook/blenderbot-3B",
            {
                headers: {
                    "Authorization": `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify({ inputs: message }),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            console.error("Hugging Face API error:", error);
            throw new Error(`Hugging Face API error: ${error.error || response.statusText}`);
        }

        const result = await response.json();
        console.log("Hugging Face response:", result);

        const botResponse = result[0]?.generated_text || "I'm not sure how to respond to that.";

        return res.status(200).json({ response: botResponse });

    } catch (error) {
        console.error("Error processing request:", error);
        return res.status(500).json({
            error: "Internal server error",
            message: error.message,
        });
    }
}