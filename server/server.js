import express from "express";

const port = 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Server is running." });
});

app.get("/viewUserInfo", (req, res) => {
  res.send({
    user: {
      id: 285974,
      name: "ok_overture_ajr",
      displayName: "ok_overture_ajr",
      avatar: "https://cdn.statically.io/avatar/shape=circle/ok_overture_ajr",

    },
    game: {
        id: 2048569035,
        name: "Murder Mystery",
        description: "Explore the mysterious tomb and uncover murders that were never found.",
        genre: "Action",
        playedForMin: 30.3
    }
  });
});

app.use((req, res, next) => {
  res.status(404).send({ error: "Invalid API Endpoint (404)" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})