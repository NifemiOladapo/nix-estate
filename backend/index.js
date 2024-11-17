import express from "express";

const app = express();

app.get("/", (req, res) => res.json("this works"));

app.listen(3000, () => console.log("Server Is Running Successfully!!!"));
