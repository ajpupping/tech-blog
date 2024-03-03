
const { engine } = require('express-handlebars');
const dayjs = require('dayjs');

app.engine('handlebars', engine({
    defaultLayout: 'main',
    helpers: {
        formatDate: function (date, format = "YYYY-MM-DD") {
            return dayjs(date).format(format);
        }
    }
}));
