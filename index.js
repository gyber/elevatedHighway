var express = require('express');
var path = require('path');

var ForgeSDK = require('forge-apis');
var CLIENT_ID = 'LRE6sqU031Fg2oDN11el1GnaNZbmeVBr', CLIENT_SECRET = 'GKhkvDyrxuvIHYjp';
var autoRefresh = true;
var oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(CLIENT_ID, CLIENT_SECRET, [
    'viewables:read'
], autoRefresh);

var app = express();

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'rvt')));

app.get('/test', function (requsest, response) {
    response.render('test', { vera: 'yiru' });
});

var credentials = {};
var credentials_time,credentials_expire;
//var d1970 = new Date();

app.use('/', function (request, response, next) {

    //console.log(((new Date()).getTime()-credentials_time)/1000);
    //console.log(credentials_expire-1);
    //console.log(((new Date()).getTime()-credentials_time)/1000>=credentials_expire-1);
    //console.log(credentials);
    if ((Object.keys(credentials)).length==0 || ((new Date()).getTime()-credentials_time)/1000>=credentials_expire-1){
        oAuth2TwoLegged.authenticate().then(function (another_credentials) {


            credentials=another_credentials;
            credentials_time=(new Date()).getTime();
            credentials_expire=another_credentials.expires_in;
            //credentials_expire=20;
            
            next();
            //console.log(credentials);
            //console.log(credentials.access_token);
        });
    }
    else {
        next();
    }
    //    console.log('mid');
    //    next();
});

app.get('/', function (request, response) {
    response.render('bmap', {});
});

app.get('/app', function (request, response) {
    response.render('viewer', {
        _accessToken: credentials.access_token,
        _urn: 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Z3liZXJkX2ZvcmdlX3NhbXBsZV9scmU2c3F1MDMxZmcyb2RuMTFlbDFnbmFuemJtZXZici92LnJ2dA'
    });
});

app.get('/eha', function (request, response) {
    response.render('viewer', {
        _accessToken: credentials.access_token,
        _urn: 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Z3liZXJkX2ZvcmdlX3NhbXBsZV9scmU2c3F1MDMxZmcyb2RuMTFlbDFnbmFuemJtZXZici9laGEucnZ0'
    });
});

app.get('/ehb', function (request, response) {
    response.render('viewer', {
        _accessToken: credentials.access_token,
        _urn: 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Z3liZXJkX2ZvcmdlX3NhbXBsZV9scmU2c3F1MDMxZmcyb2RuMTFlbDFnbmFuemJtZXZici9laGIucnZ0'
    });
});

app.get('/ehc', function (request, response) {
    response.render('viewer', {
        _accessToken: credentials.access_token,
        _urn: 'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Z3liZXJkX2ZvcmdlX3NhbXBsZV9scmU2c3F1MDMxZmcyb2RuMTFlbDFnbmFuemJtZXZici9laGMucnZ0'
    });
});

app.listen(3000);
