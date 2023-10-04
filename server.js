const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

//dotenv config
dotenv.config();

connectDB();

//rest object
const app = express();


//middlewares
app.use(express.json());
app.use(morgan('dev'));

//routes
// app.get('/', (req, res) => {
//     res.status(200).send({
//         message: "Server running"
//     });
// });

// User/Patient route
app.use('/api/user', require('./routes/userRoutes'))

// doctor route
app.use('/api/doctor', require('./routes/doctorRoutes'))

//admin  routes
app.use("/api/admin", require('./routes/adminRoutes'))


//port
const port = process.env.PORT || 8080

//listen port
app.listen(port, () => {
    console.log(`Serever Running in ${process.env.DEV_MODE} Mode on port ${process.env.PORT}`)
});



