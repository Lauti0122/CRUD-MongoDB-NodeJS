const mongoose = require('mongoose');
(async()=>{
    try{
        const db = await mongoose.connect('mongodb://localhost:27017/notes-db')
        console.log('DB connected to', db.connection.name)
    }catch(error){
        console.log(error)
    }
})();