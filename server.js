const express = require("express");
const path = require("path");

const routes = require("./routes/testRoutes");

const app = express();

app.use(express.json());

app.use("/api", routes);

app.use(express.static(path.join(__dirname, "public")));

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});