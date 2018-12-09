const express= require("express")
const mongodb=require("mongodb")
const bodyparser=require("body-parser")
const assert=require("assert")
const app=express()
app.use(bodyparser.json())
const mongo_url="mongodb://localhost:27017"
const data_base="contact"


mongodb.MongoClient.connect(mongo_url, (err, client)=>{
    assert.equal(err,null,"data database connection failed")
    const db=client.db(data_base)

    //get the contact list 
    app.get('/contacts', (req,res) => {
        
        db.collection("contactlist").find().toArray((err,data)=>{
         if(err)   res.send("error: can not fetch products ")
         else res.send(data)})
        });
    //get the specified contact
        app.get('/contact/:id', (req,res) => {
            let searchedpdid=req.params.id
            db.collection("contactlist").findOne({_id: searchedpdid},(err,data)=>{
             if(err)   res.send("error: can not fetch products ")
             else res.send(data)})
            });
            //create a contact
   app.post('/new_contact', (req,res) => {
        let newcontact=req.body
        db.collection("contactlist").insertOne(newcontact, (err,data)=>{
         if(err)   res.send("error: can not add contact")
         else res.send(data)})
        }); 

        //delet a contact
        app.delete('/delet_contact/:id', (req,res) => {
            let cttoremove=req.params.id
            db.collection("contactlist").findOneAndDelete({_id : cttoremove},(err,data)=>{
             if(err)   res.send("error: can not delet contact ")
             else res.send("product was deleted")})
            }); 
        //update a contact
        app.put('/modify_contact/:id', (req,res) => {
            let id=req.params.id
            let modproduct=req.body
            db.collection("contactlist").findOneAndUpdate({_id : id},{$set : {...modproduct}},(err,data)=>{
             if(err)   res.send("error: can not modify contact ")
             else res.send("contact is modified")})
            });       
})
app.listen(3007, (err)=> {
    if(err)
    console.log("server err")
    else 
    console.log("server is running on port 3000")
})