const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});
const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 500; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const camp = new Campground({
      author: "60875670b43bbd3edcbc3455",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: "blablabla",
      price: Math.floor(Math.random() * 20) + 10,
      images: [
        {
          url:
            "https://res.cloudinary.com/dyut8ucxr/image/upload/v1620097272/YelpCamp/fqhth8oo1lb0prmxllcy.jpg",
          filename: "YelpCamp/fqhth8oo1lb0prmxllcy",
        },
        {
          url:
            "https://res.cloudinary.com/dyut8ucxr/image/upload/v1620092361/YelpCamp/eq2we4sotb6lja6vvprt.jpg",
          filename: "YelpCamp/eq2we4sotb6lja6vvprt",
        },
      ],
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
