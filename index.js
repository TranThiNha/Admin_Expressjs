var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Cau hinh ejs
//app.set("view engine","ejs");
//app.set("views","./views");

app.use("/build",express.static(__dirname + '/build'));
app.use("/vendors",express.static(__dirname + '/vendors'));
app.use("/src",express.static(__dirname + '/src'));
app.use(express.static(__dirname + '/production/images'));

app.set("view engine","ejs");
app.set("views","./views");


app.locals.data = [{first_name: 'Nha',middle_name:"Thi", last_name: "Tran",birthday:"16-02-1996",gender:"female"}]


app.get("/admin",function(req,res){
  res.render("tables",{data:req.app.locals.data});
});

app.get("/form",function(req,res){
  res.render("form");
});


app.post('/admin',function(req,res){

    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var middlename = req.body.middlename;
    var radioMale = req.body.radioMale;
    var radioFemale = req.body.radioFemale;
    var birthday = req.body.birthday;

   
    if (radioMale == 'true'){
        var item = {first_name: firstname,middle_name:middlename, last_name: lastname,birthday:birthday,gender:"male"};
        app.locals.data.push(item);

    }else{
        var item = {first_name: firstname,middle_name:middlename, last_name: lastname,birthday:birthday,gender:"female"};        
        app.locals.data.push(item);
    }

    res.end(lastname);
});

app.locals.index = 0

app.post('/detail',function(req,res){
    app.locals.index = req.body.index;

});

app.post('/delete',function(req,res){
    var deleteIndex = req.body.index;
    app.locals.data.splice(deleteIndex,1);
});

app.post('/responddetail',function(req,res){
    var editIndex = req.body.index;
    app.locals.data.splice(editIndex,1);
    
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var middlename = req.body.middlename;
    var gender = req.body.gender;
    var birthday = req.body.birthday;

    var item = {first_name: firstname,middle_name:middlename, last_name: lastname,birthday:birthday,gender:gender};
    app.locals.data.splice(editIndex,0, item);        

});



app.get("/detail",function(req,res){
  res.render("detail",{data:app.locals.data, index: app.locals.index});
});



app.listen(3000,function(){
  console.log("Started on PORT 3000");
})
