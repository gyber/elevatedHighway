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
var DerivativesApi = new ForgeSDK.DerivativesApi();

var bucketKey = 'gyberd_forge_sample_lre6squ031fg2odn11el1gnanzbmevbr';
var objectId = 'urn:adsk.objects:os.object:gyberd_forge_sample_lre6squ031fg2odn11el1gnanzbmevbr/ehb.rvt';

var sourceUrn = Buffer.from(objectId,'utf8');
var base64Urn = sourceUrn.toString('base64');
var job={};

console.log(sourceUrn);
console.log(base64Urn);

job.input={urn:base64Urn};
job.output={formats:[
    {
    type:'svf',
    views:['2d','3d']
    }
]};

oAuth2TwoLegged.authenticate().then(function(credentials){
    DerivativesApi.getManifest(base64Urn,{},oAuth2TwoLegged,oAuth2TwoLegged.getCredentials()).then(function(result){
        console.log(result);
    });
},function(err){
    console.log(err);
});