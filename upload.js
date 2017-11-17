var ForgeSDK = require('forge-apis');
var fs = require('fs');
var path = require('path');
var CLIENT_ID = 'LRE6sqU031Fg2oDN11el1GnaNZbmeVBr', CLIENT_SECRET = 'GKhkvDyrxuvIHYjp';

var autoRefresh = true;

var oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(CLIENT_ID, CLIENT_SECRET, [
    'data:read',
    'data:write',
    'bucket:read',
    'bucket:update',
    'bucket:create'
], autoRefresh);

var BucketsApi = new ForgeSDK.BucketsApi();
var ObjectsApi = new ForgeSDK.ObjectsApi();

var bucketKey = 'gyberd_forge_sample_lre6squ031fg2odn11el1gnanzbmevbr';

//var bucketKey = require('./app.js').bucketKey;
//console.log(bucketKey);

oAuth2TwoLegged.authenticate().then(function (credentials) {
    fs.readFile(path.join(__dirname, './rvt/ehc.rvt'), function (err, data) {
        ObjectsApi.uploadObject(bucketKey, 'ehc.rvt', data.length, data, {}, oAuth2TwoLegged, oAuth2TwoLegged.getCredentials()).then(function(result){
            console.log(result.body);
        },function(err){
            console.log(err);
        });
    });
}, function (err) {
    console.log(err);
});