const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-key": "e1b1af26-d62e-447d-87b0-9c83f61351c2" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response ? e.response.status : 500).json(e.response ? e.response.data : { error: "An error occurred" });
  }
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
  });