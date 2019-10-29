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
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');
const products = require('./routes/api/products');
const categories = require('./routes/api/categories');
const notes = require('./routes/api/notes');
const photos = require('./routes/api/photos');
const documents = require('./routes/api/documents');
const messages = require('./routes/api/messages');
const groups = require('./routes/api/groups');

const app = express();

// Body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


// DB config
const db = require("./config/keys").mongoURI;

// Connect to Mongodb
mongoose.connect(db);

// Passport middleware
app.use(passport.initialize());

app.use(cors());
app.use('/static',express.static(path.join(__dirname, 'static')));

// Passport Config
require('./config/passport')(passport);

// Use routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);
app.use('/api/products', products);
app.use('/api/notes', notes);
app.use('/api/categories', categories);
app.use('/api/documents', documents);
app.use('/api/photos', photos);
app.use('/api/messages', messages);
app.use('/api/groups', groups);

// Heroku settings
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));