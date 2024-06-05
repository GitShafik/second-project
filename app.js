const express = require("express");
const mysql = require("mysql2/promise");
const app = express();

//const connection = require("./database");
const { connectDB } = require("./database");

app.use(express.json());

app.get("/api/products", async (req, res) => {
  try {
    const connection = await connectDB();
    const [rows] = await connection.execute("SELECT * FROM Products");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products/:id", async (req, res) => {
  const connection = await connectDB();
  const { id } = req.params;
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM Products WHERE id = ?",
      [id]
    );
    if (rows.length > 0) {
      res.json(rows[0]);
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/api/products", async (req, res) => {
  const connection = await connectDB();
  const { name, description, price, quantity, category } = req.body;
  try {
    const [result] = await connection.execute(
      "INSERT INTO Products (name, description, price, quantity, category) VALUES (?, ?, ?, ?, ?)",
      [name, description, price, quantity, category]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put("/api/products/:id", async (req, res) => {
  const connection = await connectDB();
  const { id } = req.params;
  const { name, description, price, quantity, category } = req.body;
  try {
    const [result] = await connection.execute(
      "UPDATE Products SET name = ?, description = ?, price = ?, quantity = ?, category = ? WHERE id = ?",
      [name, description, price, quantity, category, id]
    );
    if (result.affectedRows > 0) {
      res.json({ message: "Product updated successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  const connection = await connectDB();
  const { id } = req.params;
  try {
    const [result] = await connection.execute(
      "DELETE FROM Products WHERE id = ?",
      [id]
    );
    if (result.affectedRows > 0) {
      res.json({ message: "Product deleted successfully" });
    } else {
      res.status(404).json({ error: "Product not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete("/api/products", async (req, res) => {
  const connection = await connectDB();
  try {
    await connection.execute("DELETE FROM Products");
    res.json({ message: "All products deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/products", async (req, res) => {
  const connection = await connectDB();
  const { name } = req.query;
  try {
    const [rows] = await connection.execute(
      "SELECT * FROM Products WHERE name LIKE ?",
      [`%${name}%`]
    );
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = app;
