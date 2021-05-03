const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsyncs");
const Review = require("../models/review");
const Campground = require("../models/campground");
const reviews = require("../controllers/reviews");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");

// add reviews for a campground
router.post("/", isLoggedIn, validateReview, catchAsync(reviews.createReveiw));

// delete reviews
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  catchAsync(reviews.deleteReview)
);

module.exports = router;
