const path = require('path');
const express = require('express');
const session = require('express-session');
const handlebars = require('express-handlebars');
const routes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const secret = process.env.SESSION_SECRET;

app.use(session({
secret: secret,
    cookie: { 
        maxAge: 1000 * 60 * 60 * 2, 
        httpOnly: true,
        secure: true,
        sameSite: 'strict' 
    }, 
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
}));

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log('Server is running on port 3001');
    });
});

const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);