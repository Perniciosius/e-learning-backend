const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')
const dbConfig = require('./config/db_config')
const app = express()
const PORT = process.env.PORT || 8080

const userRoutes = require('./routes/user')
const classRoutes = require('./routes/class')
const lessonRoutes = require('./routes/lesson')
const courseRoutes = require('./routes/course')
const messageRoutes = require('./routes/message')
const authJWT = require('./utils/jwt_auth')

// request - response log
app.use(morgan('dev'))

// parse body
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// serve static files
app.use('/static', express.static(path.join(__dirname, '/static')))


// connect database
mongoose.connect(dbConfig.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log('Connected to database')
}).catch((err) => {
    console.log(err)
    process.exit()
})

// routes
app.use('/user', userRoutes)
app.use('/class', authJWT, classRoutes)
app.use('/course', authJWT, courseRoutes)
app.use('/lesson', authJWT, lessonRoutes)
app.use('/message', authJWT, messageRoutes)

app.use((req, res) => {
    res.sendStatus(404);
})

// interrupt signal handler
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        process.exit(0);
    });
});

// listen
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);
});