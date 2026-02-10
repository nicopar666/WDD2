import express from "express";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/getName", (req, res) => {
  const name = "Nico";
  res.status(200).json(name);
});

app.post("/api/register", (req, res) => {
  const { email, password } = req.body;

  // Mock registration: assume success for any email/password
  if (email && password) {
    const user = { email };
    const token = 'mock-jwt-token-' + Date.now(); // Mock token
    res.status(200).json({ user, token });
  } else {
    res.status(400).json({ message: "Invalid credentials", status: "failed" });
  }
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Mock login: success for admin@example.com / admin
  if (email === "admin@example.com" && password === "admin") {
    const user = { email };
    const token = 'mock-jwt-token-' + Date.now(); // Mock token
    res.status(200).json({ user, token });
  } else {
    res.status(403).json({ message: "Invalid credentials", status: "failed" });
  }
});

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
