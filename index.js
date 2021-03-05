/* Require modules and files */
const upload=require('express-fileupload');
const route=require('./routes/route');
const mongoose=require('mongoose');
const express=require('express');


/* Create express app */
const app=express();

/* Set puclic path */
app.use(express.static('public'));

app.use(upload());

/* Port setting */
const port = process.env.PORT || 3000;


/* Mongoose Connection */
// var mongoLink= "mongodb://localhost:27017/excelToJson";
var mongoLink="mongodb+srv://xyz1234:jadoo@1234@pastebinapp.dfwfw.mongodb.net/AddExcelData?retryWrites=true&w=majority";
mongoose.connect(mongoLink, { useNewUrlParser: true , useUnifiedTopology: true }).then(() => console.log('Database Connected!')).catch(err => {
console.log(err);
});


/* Routes */
app.use('/',route);

/* Listening  */
app.listen(port,function(){
    console.log("Listening on port "+port);
});