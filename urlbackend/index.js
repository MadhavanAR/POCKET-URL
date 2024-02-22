const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const shortid = require("shortid");
const Url = require("./Url");
const utils = require("./Util/util");

// configure dotenv
dotenv.config();
const app = express();

// cors for cross origin requesters to the frontend application
app.use(cors());
//
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch(err => {
    console.log(err.message);
  });

// get all saved URLs
app.get("/all", async (req, res, next) => {
  Url.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

// URL shortener endpoint
app.post("/short", async (req, res) => {
  console.log("HERE", req.body.url);
  const { origUrl } = req.body;
  const base = process.env.DOMAIN_URL;

  const urlId = shortid.generate();
  if (utils.validateUrl(origUrl)) {
    try {
      let url = await Url.findOne({ origUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          origUrl,
          shortUrl,
          urlId,
          date: new Date(),
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Server Error");
    }
  } else {
    res.status(400).json("Invalid Original Url");
  }
});

// redirect endpoint
app.get("/:urlId", async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    console.log(url);
    if (url) {
      url.clicks++;
      url.save();
      return res.redirect(url.origUrl);
    } else res.status(404).json("Not found");
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
});

// Port Listenning on 3333
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running at PORT ${PORT}`);
});


// const Express = require('express')
// const app = new Express();
// const cors = require('cors');

// var mongoose = require('mongoose');

// var bodyParser = require('body-parser');
// var path = require('path')

// mongoose.connect("mongodb://127.0.0.1:27017/",{
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

// app.use(bodyParser.json({ limit: '20mb' }));
// app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));


// app.get("/", (req, res) => {
//     res.json({ message: "Backend is running... Fine" });
// });

// app.listen(3001, (error) => {
//     if (!error) {
//         console.log(`Server is running on port: ${3001}!`); // eslint-disable-line
//     }
// });