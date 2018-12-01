const express = require('express')
const mongooes = require('mongoose')
const bodyPerser = require('body-parser')
const passport = require('passport')
const path = require('path')

//Routes
const users = require('./server/routes/Api/user')
const posts = require('./server/routes/Api/posts')
const profile = require('./server/routes/Api/profile')

const app = express()

//Body perser middleware
app.use(bodyPerser.urlencoded({
  extended: false
}))
app.use(bodyPerser.json())

//db config
const db = require('./server/config/keys').mongoUri;

//connect to mongo
mongooes
  .connect(db)
  .then(() => console.log('Connection Successful'))
  .catch(err => console.log(err))

//passport middleware
app.use(passport.initialize());

//passport config
require('./server/config/passport')(passport);


//use Routes

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`server running on port ${port}`)
})