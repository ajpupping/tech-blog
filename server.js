const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const { engine } = require('express-handlebars');
const helpers = require('./utils/helpers');


const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const secret = process.env.SESSION_SECRET;

app.use(session({
secret: secret,
store: new SequelizeStore({
    db: sequelize
}),
resave: false,
saveUninitialized: true, 
cookie: {
    maxAge: 30 * 60 * 1000
}
}));

app.engine('handlebars', engine({
    defaultLayout: 'main',
    partialsDir: path.join(__dirname, 'views/partials'),
    helpers: helpers
    }));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port 3001');
    });
});

const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);