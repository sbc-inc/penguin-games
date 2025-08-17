import express from "express";

const port = 8000;
const app = express();
app.use(express.json());

// Main route for a simple server check.
app.get("/", (req, res) => {
  res.send({ message: "Server is running." });
});

// Route to view user information by username.
// This is now an async function to use await.
app.get("/viewUserInfo/:username", async (req, res) => {
  const username = req.params.username;
  
  // Check if the username parameter is present.
  if (!username) {
    return res.status(400).send({ error: "Username is required." });
  }

  try {
    // Await the fetch call to get the actual response.
    const response = await fetch(`https://penguin-games-d1.rilwag2612.workers.dev/userInfo?username=${username}`);
    
    // Check if the response from the worker is not OK (e.g., 404).
    if (!response.ok) {
        // Attempt to parse the error message from the worker response.
        const errorData = await response.json();
        return res.status(response.status).send({ error: errorData.error || "Failed to fetch user info from worker." });
    }

    // Await the conversion of the response to JSON.
    const userInfo = await response.json();
    
    // Add the "avatar" key-value pair to the userInfo object.
    userInfo.avatar = `https://cdn.statically.io/avatar/shape=circle/${username}`;
    
    // Send the user data as a success response.
    return res.status(200).send(userInfo);

  } catch (error) {
    // Catch any network or other unexpected errors.
    console.error("Error fetching user info:", error);
    return res.status(500).send({ error: "Failed to connect to the external API." });
  }
});

// Middleware for handling 404 Not Found errors.
app.use((req, res, next) => {
  res.status(404).send({ error: "Invalid API Endpoint (404)" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
