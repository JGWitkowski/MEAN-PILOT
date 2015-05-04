var express = require("express"),
    stylus = require("stylus"),
    logger = require("morgan");
    bodyParser = require("body-parser"),
    mongoose =  require("mongoose");

function compile(str, path){
  return stylus(str).set("filename", path);
}


var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

app.set('views', __dirname + "/server/views");
app.set("view engine", "jade");
app.use(stylus.middleware({
  src: __dirname + "/public",
  compile: compile
}));
app.use(express.static(__dirname + "/public"));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

if(env === "development"){
  mongoose.connect('mongodb://localhost/helloworld');
}
else {
  mongoose.connect('mongodb://jgwitkowski:12in2mo.@ds045137.mongolab.com:45137/helloworld');
}
var db = mongoose.connection;
db.on('error', console.error.bind(console,"connection error..."));
db.once('open', function(){
  console.log("helloworld db opened...");
})

var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model("Message", messageSchema);
var mongoMessage;
Message.findOne().exec(function(err,messageDoc){
  mongoMessage = messageDoc.message; 
})

app.get("*", function(req, res){
	res.render('index', {
    mongoMessage: mongoMessage
  });
});

var port = process.env.PORT || 3030;

app.listen(port);
console.log("Listening on port " + port + ".....");