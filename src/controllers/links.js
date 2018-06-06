'use strict';

const validUrl = require('valid-url');
const shortid = require('shortid');
const LinkModel = require('../models/linkModel');

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

exports.getShortUrl = (req, res) => {
  // Step 1: få fat i original link, dvs. den brugeren har indtastet
  const originLink = req.body.URL;
  // Step 2: er det en valid url?
  if (validUrl.isUri(originLink)) {
    // Step 3: generate short url
    const shortUrl = shortid.generate();
    let fullShortUrl;
    const redirectUrl = req.body.redirectType ? 'r' : 'redirect';
    if (process.env.NODE_ENV === 'development') {
      // Short URL for localhost
      fullShortUrl = `${process.env.APP_URL + process.env.PORT}/api/${redirectUrl}/${shortUrl}`;
    } else {
      // Short URL for Azure
      fullShortUrl = `${process.env.APP_URL}/api/${redirectUrl}/${shortUrl}`;
    }

    const newLink = new LinkModel({
      originalLink: originLink,
      shortLink: shortUrl,
    });
    // Step 4: new linkModel in db
    newLink.save((err) => {
      if (err) {
        res.status(502).json({ error: true, message: 'Operation failed: could not save URL in MongoDB.' });
      }
    });
    // Step 5: return shortUrl
    res.status(200).json({ error: false, shortUrl: fullShortUrl });
  } else {
    res.status(400).json({ error: true, message: 'Not a valid URI' });
  }
};

exports.redirectUrl = (req, res) => {
  // Step 1: få fat i short url
  const shortUrl = req.params.shortUrl;
  // Step 2: søg efter short url i db
  LinkModel.findOne({ shortLink: shortUrl }, 'originalLink', (err, link) => {
    // Step 3: hvis shortUrl ikke findes i db, så vis fejl side
    if (err || !link) {
      res.status(404).json({ error: true, message: 'Redirect URL not found' });
      return;
    }
    // Step 4: ellers så redirect brugeren til original link
    res.status(200).json({ error: false, redirectUrl: link.originalLink });
  });
};

exports.redirect = (req, res) => {
  const shortUrl = req.params.shortUrl;
  LinkModel.findOne({ shortLink: shortUrl }, 'originalLink', (err, link) => {
    if (err || !link) {
      res.render('notfoundurl', {
        error: true,
        message: 'Redirect URL not found',
      });
      return;
    }
    res.redirect(link.originalLink);
  });
};
