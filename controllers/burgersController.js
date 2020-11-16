var express = require("express");

var router = express.Router();

// Import model (burger.js)
var burger = require("../models/burger.js");

// Create routes & setup logic
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    res.render("index", hbsObject);
  });
});

router.get('/api/hey', function(req, res) {
  res.json({
    data: 'hey'
  })
})

router.post("/api/burgers", function(req, res) {
  burger.create([
    "name", "eaten"
  ], [
    req.body.name, req.body.eaten
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

console.log("condition", condition);
console.log(req.body);
  burger.update({
    eaten: req.body.eaten
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(400).end();
    } else {
      res.status(200).end();
    }
  });
});

// Put route for rating
router.put("/api/burgers/rate/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  
  console.log("condition", condition);
console.log(req.body);
  burger.update({
    rating: req.body.rating
  }, condition, function(result) {
    if (result.changedRows == 0) {
      return res.status(400).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes
module.exports = router;
