const express = require("express");
const pool = require("./db");

const app = express();

app.get("/", (req, res) => {
    res.send("Product API Running");
});

app.get("/products", async (req, res) => {

    const limit = Math.min(
        parseInt(req.query.limit) || 20,
        100
    );

    const category = req.query.category;
    const lastCreatedAt = req.query.lastCreatedAt;
    const lastId = parseInt(req.query.lastId);

    try {

        let query = `
            SELECT *
            FROM products
            WHERE 1=1
        `;

        let values = [];

        if (category) {
            query += `
                AND category = $${values.length + 1}
            `;
            values.push(category);
        }

        if (lastCreatedAt && lastId) {
            query += `
                AND (created_at, id)
                < ($${values.length + 1}, $${values.length + 2})
            `;

            values.push(lastCreatedAt);
            values.push(lastId);
        }

        query += `
            ORDER BY created_at DESC, id DESC
            LIMIT $${values.length + 1}
        `;

        values.push(limit);
        console.log("lastCreatedAt =", lastCreatedAt);
console.log("lastId =", lastId);
console.log("values =", values);

        const result = await pool.query(
            query,
            values
        );

        res.json(result.rows);

    } catch (err) {
        console.error(err);

        res.status(500).json({
            error: "Database Error"
        });
    }
});

app.listen(3000, () => {
    console.log("Server Running On Port 3000");
});