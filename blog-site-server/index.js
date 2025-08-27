const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;


app.use(cors())
app.use(express.json());



app.get('/',(req,res) =>{
    res.send("Blog are ready to show")
})

app.listen(port, () =>{
    console.log(`Blog are ready on port: ${port}`)
})