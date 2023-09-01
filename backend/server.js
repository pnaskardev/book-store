const express = require('express');
const dotnev = require('dotenv');
const cors = require('cors');
const { default: mongoose } = require('mongoose');


const bookRoutes=require('./routes/bookRoutes');
// INITIALIZATIONS
dotnev.config();
const app = express();


// MIDDLEWARES
app.use(express.json());
app.use(cors());

// If you want to give access to custom URLS/ Custom Origins
// app.use(cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
// }));

// ROUTES
app.use('healthCheck',(req,res,next)=>{
    console.log("Api working properly");
    res.sendStatus(200);
});


app.use('/books',bookRoutes);


// CONNECT TO DB
mongoose
.connect(process.env.DATABASE_URI)
.then(()=>{
    console.log('Connected to DB');
    app.listen(process.env.PORT,()=>{
        console.log(`Server is running on PORT: ${process.env.PORT}`);
    })
}).catch((error)=>{
    console.log(error);
})

