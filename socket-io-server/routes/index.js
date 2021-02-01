const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
router.get("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});
router.post("/", (req, res) => {
  res.send({ response: "I am alive" }).status(200);
});

module.exports = router;