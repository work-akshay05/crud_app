const express = require('express')
const noteModel=require('./model/notes.model');
const cors=require('cors');

const app=express();
app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

app.post('/api/notes',async (req,res)=>{
    const {title,description}=req.body;
    const note= await noteModel.create({
        title,description
    });

    res.status(201).json({
        message:"post request sent",
        note
    })
})
app.get('/api/notes',async (req,res)=>{
    const notes=await noteModel.find();
    res.status(200).json({
        message:"get req sent",
        notes
    });
})
app.delete('/api/notes/:id',async (req,res)=>{
    const id=await req.params.id;
    await noteModel.findByIdAndDelete(id);
    res.status(200).json({
        message:"check kr delete kr dia hu"
    })
    
})
app.patch('/api/notes/:id',async (req,res)=>{
    const id=await req.params.id;
    const {description}=await req.body;
    console.log(id,description);
    await noteModel.findByIdAndUpdate(id,{description});
    res.status(200).json({
        message:"check kriyo hogeya hoga update"
    })
})

module.exports=app;