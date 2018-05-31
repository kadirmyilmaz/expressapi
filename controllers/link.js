const mongoose = require('mongoose');
const linkModel = require('../models/linkModel');
const index = require('../routes/index');
const validUrl = require('valid-url');

exports.getShortUrl = () => {
    // Step 1: få fat i original link, dvs. den brugeren har indtastet
    // Step 2: er det en valid url? hvis ikke så returner fejl med det samme
    // Step 3: generate short url
    // Step 4: save original url and short url in database
    // Step 5: render page and return short url to website
};

exports.redirectUrl = (req, res) => {
    // Step 1: få fat i short url
    const shortUrl = req.params.shortUrl;

    // Step 2: søg efter short url i db
    linkModel.findOne({ shortLink: shortUrl }, 'originalLink', function (err, link) {
        // Step 3: hvis shortUrl ikke findes i db, så vis fejl side
        if (!err) {
            res.render('notfoundurl', {
                errorUrl: shortUrl
            });

            return;
        }

        // Step 4: ellers så redirect brugeren til original link
        res.redirect(link.originalLink);
    });
};