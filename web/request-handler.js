var path = require('path');
var archive = require('../helpers/archive-helpers');
// require more modules/folders here!
var helpers = require('./http-helpers.js');
var fs = require('fs');
var querystring = require('querystring');
var server = require('./basic-server.js');

var actions = {
  'GET': function(req, res) {
    //set var to find url from req body 
    //serve URL from Archive Folder
    var requestedPage = '';
    if (req.url === '/') {
      requestedPage = archive.paths.siteAssets + '/index.html';
    } else if (req.url === '/loading.html') {
      requestedPage = archive.paths.siteAssets + '/loading.html';
    } else {
      requestedPage = archive.paths.archivedSites + '/' + req.url;
    }

    fs.readFile(requestedPage, function(err, content) {
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
    var requestedURL;
    var body = '';
    req.on('data', function(chunk) {
      body += chunk;
      requestedURL = querystring.parse(body).url;
      //console.log('THIS IS THE URL REQUESTED: ', requestedURL);
      archive.isUrlInList(requestedURL, (boolean) => {
        console.log(boolean);
        if (boolean) {
          server.router['/' + requestedURL] = exports.handleRequest;
          res.writeHead(302, 
            {Location: requestedURL}, 
            helpers.headers);
          res.end();
        } else {
          archive.addUrlToList(requestedURL, () => {
            //do something after the url has been added
            res.writeHead(302, 
              {Location: '/loading.html'}, 
              helpers.headers);
            res.end();
          });
        }
      });
    });
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
    res.writeHead(405, helpers.headers);
    res.end();
  }
  
};

