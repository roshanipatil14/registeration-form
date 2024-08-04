const express = require("express")
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const dotenv= require("dotenv");

const app =express ();
dotenv.config();

const port = process.env.PORT || 3000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.1stacdt.mongodb.net/registerationFormDB` ,{
    // useNewUrlParser : true,
    // useUnifiedTopology : true,
        
});


// registeration schema
const registerationSchema = new mongoose.Schema({
    name : String ,
    email :  String ,
    password : String 
});

// model of registeration schema

const Registeration = mongoose.model("Registeration" ,registerationSchema );


app.use(bodyParser.urlencoded ({ extended: true }));
app.use(bodyParser.json());

app.get("/",(req,res) => {
    res.sendFile(__dirname +"/pages/index.html");
})
app.post("/register",async (req, res)=> {

    try
    {
        const { name, email, password} = req.body;

        const existingUser = await Registeration.findOne({email : email});
        // check for existing user
        if(!existingUser) {
            const registerationData = new Registeration({
                        name,
                        email,
                        password, 
            });

        await registerationData.save();
        res.redirect("/success");
        }

   
        else
        {
        console.log("User already exist");
        res.redirect("/error");
        }
}
    catch(error)
    {
        console.log(error);
        res.redirect("error");

    }
})

app.get("/success", (req, res) => {
    res.sendFile(__dirname+"/pages/success.html");
    })
    
app.get("/error", (req, res) => {
    res.sendFile(__dirname+"/pages/error.html");
    })

app.listen(port, ()=>{
    console.log(`server is running on port ${port}`);
})




















