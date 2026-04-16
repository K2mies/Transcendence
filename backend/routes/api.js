import express from "express";
const router = express.Router();
import db from "../db.js";

router.get("/games", async (req, res) => {
    try {
        const result = await db.pool.query(
            "SELECT * FROM games ORDER BY id DESC;"
        );

        res.json(result.rows);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});

export default router;
