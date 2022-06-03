const express =require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){
  const apiKey ="2172797&appid=67738795adfa7a93d2a762a64f3d3194";
  const query=req.body.cityname;
  const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"id="+apiKey;

  https.get(url,function(response){
    console.log(response.statusCode);

    response.on("data",function(data){
      const weatherdata=JSON.parse(data);
      const temp= weatherdata.main.temp;
      const weatherDescription=weatherdata.weather[0].description
      const icon = weatherdata.weather[0].icon;
      res.write("<h1>It is "+weatherDescription+" outside</h1>");
      res.write("The temperature is "+ temp + " degrees")
      res.send();
    })
  });
})

app.listen(3000,function(){
  console.log("Server is running")
});
