const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const fs = require('fs');
const path = require('path');
const methodOverride = require('method-override');

// Routes
const users = require('./routes/api/users');
const api = require('./routes/api/api');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const products = require('./routes/api/products');
const events = require('./routes/api/events');
const categories = require('./routes/api/categories');
const eventcategories = require('./routes/api/eventcategories');
const eventthreads = require('./routes/api/eventthreads');
const notes = require('./routes/api/notes');
const photos = require('./routes/api/photos');
const documents = require('./routes/api/documents');
const messages = require('./routes/api/messages');
const groups = require('./routes/api/groups');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {pingTimeout: 60000});

require('./socket')(io)

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// DB config
const db = require("./config/keys").mongoURI;

// Connect to Mongodb
mongoose.connect(db, { useFindAndModify: false });

// Passport middleware
app.use(passport.initialize());

app.use(cors());
app.use('/static',express.static(path.join(__dirname, 'static')));

// Passport Config
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/api', api);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/products', products);
app.use('/api/events', events);
app.use('/api/notes', notes);
app.use('/api/categories', categories);
app.use('/api/eventcategories', eventcategories);
app.use('/api/eventthreads', eventthreads);
app.use('/api/documents', documents);
app.use('/api/photos', photos);
app.use('/api/messages', messages);
app.use('/api/groups', groups);

// Heroku settings
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

module.exports = app;