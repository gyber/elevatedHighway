var ForgeSDK = require('forge-apis');
var CLIENT_ID = 'LRE6sqU031Fg2oDN11el1GnaNZbmeVBr', CLIENT_SECRET = 'GKhkvDyrxuvIHYjp';

var autoRefresh = true;

var oAuth2TwoLegged = new ForgeSDK.AuthClientTwoLegged(CLIENT_ID,CLIENT_SECRET,[
    'data:read',
    'data:write',
    'bucket:read',
    'bucket:update',
    'bucket:create'
],autoRefresh);

var BucketsApi = new ForgeSDK.BucketsApi();
var ObjectsApi = new ForgeSDK.ObjectsApi();

var bucketKey = 'gyberd_forge_sample_lre6squ031fg2odn11el1gnanzbmevbr';

oAuth2TwoLegged.authenticate().then(function(credentials){
    BucketsApi.getBuckets({},oAuth2TwoLegged,credentials).then(function(Buckets){
        //console.log(Buckets);
        console.log(Buckets.body.items);
        //console.log(Buckets.body.items[0]);
        //console.log(Buckets.body.items[1]);
        //bucketKey = Buckets.body.items[0].bucketKey;
        //exports.bucketKey = bucketKey;
    });

    ObjectsApi.getObjects(bucketKey,{},oAuth2TwoLegged,oAuth2TwoLegged.getCredentials()).then(function(result){
        console.log(result.body);
    },function(err){
        console.log(err);
    });
    
},function(err){
    console.log(err);
});

//exports.bucketKey = bucketKey;
//while(!bucketKey);