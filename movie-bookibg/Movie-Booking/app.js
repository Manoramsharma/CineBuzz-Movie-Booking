const express= require('express');
const ejs=require('ejs');
const bodyParser= require('body-parser');
const _ = require('lodash');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine','ejs');





let port=process.env.PORT;
if(port==null || port=="")
{
    port=3000;
}
app.listen(port,()=>{
    console.log("Server is up and running !1");
})

