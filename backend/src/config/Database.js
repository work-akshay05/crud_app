require('dotenv').config()
const mongoose=require('mongoose')

const connectToDb=()=>{
    mongoose.connect(`${process.env.MONGO_URI}`)
    .then(()=>{
        console.log("Db is connected");
    })
    .catch((e)=>{
        console.error(`something went wrong in DB: ${e}`);
    })
}

module.exports=connectToDb;