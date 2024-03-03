const dayjs = require('dayjs');

const helpers = {
    format_date: (date) => {
        return dayjs(date).format('YYYY-MM-DD');
    },
};

module.exports = helpers;