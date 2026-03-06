const express = require("express");

const rateLimiter = require("../middleware/rateLimiter");

const router = express.Router();

router.get("/test", rateLimiter, (req, res) => {

    res.json({
        message: "API request successful"
    });

});

module.exports = router;