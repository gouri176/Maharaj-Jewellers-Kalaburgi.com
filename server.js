require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allows frontend to call the backend
app.use(express.json());

app.get("/fetch-images", async (req, res) => {
    try {
        const folderId = req.query.folderId;
        const apiKey = process.env.GOOGLE_API_KEY;
        
        if (!folderId || !apiKey) {
            return res.status(400).json({ error: "Missing folderId or API key" });
        }

        const url = `https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}&fields=files(id,name)`;
        const response = await axios.get(url);

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching images:", error.response?.data || error.message);
        res.status(500).json({ error: "Failed to fetch images" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
