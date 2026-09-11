const express = require("express");

const authRoutes = require("./routes/auth");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.listen(8080, () => {
    console.log("Server is running");
});
