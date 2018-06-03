const mongoose = require('mongoose');


const linkModel = require('../models/linkModel');
const index = require('../routes/index');

const validUrl = require('valid-url');
const shortid = require('shortid');
shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@')

exports.getShortUrl = (req, res) => {
    // Step 1: få fat i original link, dvs. den brugeren har indtastet
    let body = req.body.originalLink;
    let local = req.get('host') + "/";
    linkModel.findOne({ "originalLink": body}, {"shortLink": 1, _id: 0}, function(err, link){
        if(link != null){
            res.json({ originalUrl: body, shortUrl: local + link.short });
        } else {
            // Step 2: er det en valid url? hvis ikke så returner fejl med det samme
            if(true){
                // Step 3: generate short url
                let shortCode = shortid.generate();
                let newUrl = { originalLink: body, shortLink: shortCode };
                linkModel.insert({ newUrl });
                res.json({ originalUrl: body, shortUrl: local + shortCode})
            } else {
                res.render( "notfoundurl", {
                    errorUrl: err
                });
            }
        }
    });
    
    // Step 4: save original url and short url in database
    // Step 5: render page and return short url to website
};

exports.redirectUrl = (req, res) => {
    // Step 1: få fat i short url
    const shortUrl = req.params.shortUrl;

    // Step 2: søg efter short url i db
    linkModel.findOne({ shortLink: shortUrl }, 'originalLink', function (err, link) {
        // Step 3: hvis shortUrl ikke findes i db, så vis fejl side
        console.log(err);
        if (err) {
            res.render('notfoundurl', {
                errorUrl: shortUrl
            });

            return;
        }

        // Step 4: ellers så redirect brugeren til original link
        res.redirect(link.originalLink);
    });
};