const express = require("express");
const router = express.Router();
const models = require("../models");
const authenticateUser = require("../guards/authenticateUser");
const parkShouldNotExist = require("../guards/parkShouldNotExist");
const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn");

//GET all items from wishlist

router.get("/", async function (req, res, next) {
  try {
    const parks = await models.Park.findAll();
    res.send(parks);
  } catch (error) {
    res.status(500).send(error);
  }
});

//POST park into wishlist DB

router.post("/", parkShouldNotExist, async function (req, res, next) {
  const { google_id, name, rating, address, image_url, latitude, longitude } =
    req.body;

  try {
    const park = await models.Park.create({
      google_id,
      name,
      rating,
      address,
      image_url,
      latitude,
      longitude,
    });

    // const favorite = await models.Favorites.create({
    //   userId: req.user.id,
    //   parkId: park.id,
    // });

    // console.log(favorite && "FAVORITE");

    res.send("Park added to wishlist!");
  } catch (error) {
    res.status(500).send({ message: "Error adding park to wishlist" });
  }
});

// REMOVE one park from wishlist
router.delete("/", async (req, res) => {
  const { id } = req.body;
  try {
    await models.Park.destroy({
      where: { id },
    });

    res.send("Item removed from wishlist.");
  } catch (error) {
    console.error(error); // Log the error for debugging purposes

    res.status(500).send(error);
  }
});

//DELETE ALL PARKS
// router.delete("/", async (req, res) => {
//   try {
//     // Delete all events
//     await models.Park.destroy({
//       where: {},
//       truncate: true, // This ensures that the table is truncated, removing all rows
//     });

//     res.send("All parks deleted successfully!");
//   } catch (error) {
//     console.error(error); // Log the error for debugging purposes
//     res.status(500).send(error);
//   }
// });

module.exports = router;
