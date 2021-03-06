const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsyncs");
const Campground = require("../models/campground");
const campgrounds = require("../controllers/campgrounds");
const { isLoggedIn, isAuthor, validateCampground } = require("../middleware");
const multer = require("multer");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

router
  .route("/")
  // show all campgrounds
  .get(catchAsync(campgrounds.index))
  // adding new campground

  .post(
    isLoggedIn,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.createCampground)
  );

router.get("/new", isLoggedIn, campgrounds.renderNewForm);

router
  .route("/:id")
  // show info of one campground
  .get(catchAsync(campgrounds.showCampground))
  // edit campground
  .put(
    isLoggedIn,
    isAuthor,
    upload.array("image"),
    validateCampground,
    catchAsync(campgrounds.updateCampground)
  )
  // delete campground
  .delete(isLoggedIn, isAuthor, campgrounds.deleteCampground);

router.get(
  "/:id/edit",
  isLoggedIn,
  isAuthor,
  catchAsync(campgrounds.renderEditForm)
);

module.exports = router;
