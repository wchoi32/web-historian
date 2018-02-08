var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var helpers = require('./http-helpers.js');
var fs = require('fs');

var actions = {
  'GET': function(req, res) {
    //set var to find url from req body 
    //serve URL from Archive Folder
    //helpers.serveAssets(res, archive.siteAssets, function(err, content) {
    //if (err) { throw err; }
    fs.readFile(archive.paths.siteAssets + '/index.html', function(err, content) {
      if (err) {
        console.log('error: ', err);
      } else {
        res.writeHead(200, helpers.headers);
        res.end(content, 'utf-8');
      }
    });
    //res.end(archive.paths.list);
  },
  'POST': function(req, res) {
  //req should have a URL website on it somehwere?  in data?
  //archive helpers thing to check if the URL is in .txt
  // IF exists on txt
  //return with a 302
  // ELSE it doesn't exist on txt
  //do the add to txt file
  //helpers.serveAssets(res, loading.html, callback);
  // redirect to loading.html & trigger download to sites.txt
  },
  'OPTIONS': function(req, res) {
    //send the headers
  }
};

exports.handleRequest = function (req, res) {
  thisAction = actions[req.method];
  if (thisAction) {
    thisAction(req, res);
  } else {
    //return a 404
  }
  
};

