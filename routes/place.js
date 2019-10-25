const express = require("express");
const router = express.Router();
const placeController = require("./controllers/place.controller");

router.get("/", placeController.getPlaceAll);
router.get("/search", placeController.getSearchedPlace);
router.get("/myplace/:user_id", placeController.getMyPlace);
router.get("/favorite/:user_id", placeController.getMyFavorite);
router.delete("/myplace/:myplace_id", placeController.deleteMyPlace);
router.post("/create", placeController.createPlace);
router.get("/:place_id", placeController.getPlaceDetails);

module.exports = router;
