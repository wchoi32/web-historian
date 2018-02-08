var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths 
 * many times over in the course of this sprint.
 * Consider using the `paths` object below 
 * to store frequently used file paths. This way,
 * if you move any files, you'll only 
 * need to change your code in one place! 
 * Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you 
// suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  let body = '';
  //perform callback on all urls in .txt?
  fs.readFile(this.paths.list, (err, data) => {
    if (err) { throw (err); }
    //console.log(data);//this is a buffer stream
    body += data;
    //console.log(body);//this is just a string
    body = body.split('\n'); //splits by line break into array
    //console.log(body);//gets the expected array back
    callback(body);//performs callback on array
  });
  
};

exports.isUrlInList = function(url, callback) {
  let body = '';
  //perform callback on url if url is in .txt?  
  fs.readFile(this.paths.list, (err, data) => {
    if (err) { throw (err); }
    //console.log(data);//this is a buffer stream
    body += data;
    //console.log(body);//this is just a string
    body = body.split('\n'); //splits by line break into array
    //console.log(body);//gets the expected array back
    //console.log(body.indexOf(url));
    if (body.indexOf(url) === -1) {
      callback(false);
    } else {
      callback(true);
    }//performs callback on array
  });
};

exports.addUrlToList = function(url, callback) {
  //url is a string
  //perform the callback
  fs.appendFile(this.paths.list, url, (err)=>{
    if (err) { 
      throw err; 
    }
    callback(); 
    console.log('Updated!');
  });
};

exports.isUrlArchived = function(url, callback) {

//check this.paths.archivedSites for the url?
  fs.access(this.paths.archivedSites + '/' + url, fs.constants.F_OK, (err)=>{
    if (err) { 
      callback(false); 
    } else {
      callback(true);
    }
  });
};

exports.downloadUrls = function(urls) {
  var that = this;
  urls.forEach(function(url) {
    
    fs.writeFile(that.paths.archivedSites + '/' + url, '', (err) => {
      if (err) { throw err; }
    }); 

  });

};
