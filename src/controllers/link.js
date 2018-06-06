const validUrl = require('valid-url');
const shortid = require('shortid');
const linkModel = require('../models/linkModel');

// Jeg har ændret på navnet på LinkModel til linkModel <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

exports.getShortUrl = function (req, res) {
  // Step 1: få fat i original link, dvs. den brugeren har indtastet
  let originLink = req.body.URL;
  // Step 2: er det en valid url?
  if (validUrl.isUri(originLink)) {
    // Step 3: generate short url
    let shortUrl = shortid.generate();
    // check that shortid has not been used already in DB

    let fullShortUrl;
    if (process.env.NODE_ENV === 'development') {
      // Short URL for localhost
      fullShortUrl = process.env.APP_URL + process.env.PORT + '/api/redirect/' + shortUrl;
    } else {
      // Short URL for Azure
      fullShortUrl = process.env.APP_URL + '/api/redirect/' + shortUrl;
    }

    let newLink = new linkModel({
      originalLink: originLink,
      shortLink: shortUrl,
    });
    // Step 4: new linkModel in db
    newLink.save(function (err) {
      if (err) {
        console.log(err);
        res.status(502).json({ error: true, message: 'Operation failed: could not save URL in MongoDB.' });
        return;
      }
    });
    // Step 5: return shortUrl
    res.status(200).json({ error: false, shortUrl: fullShortUrl });
  } else {
    res.status(400).json({ error: true, message: 'Not a valid URI' });
  }
}

exports.redirectUrl = function (req, res) {
  // Step 1: få fat i short url
  let shortUrl = req.params.shortUrl;
  // Step 2: søg efter short url i db
  linkModel.findOne({ shortLink: shortUrl }, 'originalLink', function (err, link) {
    // Step 3: hvis shortUrl ikke findes i db, så vis fejl side
    if (err || !link) {
      res.status(404).json({ error: true, message: 'Redirect URL not found' });
      return;
    }
    // Step 4: ellers så redirect brugeren til original link
    res.status(200).json({ error: false, redirectUrl: link.originalLink });
  });
}
