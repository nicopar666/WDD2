import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/getName", (req, res) => {
  const name = "Nico";
  res.status(200).json(name);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "admin") {
    res.status(200).json({ message: "Login successful", status: "success" });
  } else {
    res.status(403).json({ message: "Invalid credentials", status: "failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
