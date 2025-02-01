import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import path from "path";

dotenv.config();
const app = express();
const port = 3000;

// Get the absolute directory name
const __dirname = path.resolve();

// Serve static frontend files from 'public' directory
app.use(express.static(path.join(__dirname, "public"))); 

// Middleware
app.use(cors());
app.use(express.json());

// OpenAI API setup
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// API route to generate quotes
app.post("/generate-quote", async (req, res) => {
    try {
        console.log("📝 Generating quote...");

        const completion = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [
                { role: "system", content: "You are a wise philosopher who generates inspirational quotes." },
                { role: "user", content: "Generate an inspirational quote." }
            ]
        });

        const quote = completion.data.choices[0].message.content.trim();
        console.log("✅ Quote received:", quote);
        res.json({ quote });

    } catch (error) {
        console.error("🔥 OpenAI API Error:", error.response ? error.response.data : error.message);
        res.status(500).json({ error: "Failed to generate quote.", details: error.message });
    }
});



// Serve index.html for the root route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(port, () => {
    console.log(`✅ Server running at http://localhost:${port}`);
});
