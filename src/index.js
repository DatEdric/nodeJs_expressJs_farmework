//Import các module cần thiết:
const express = require('express');
const exphbs = require('express-handlebars').engine;
const Handlebars = require('handlebars');
const methodOverride = require('method-override');
const path = require('path');
const morgan = require('morgan');
const app = express();
const port = 3000
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

//Import và sử dụng các route từ file routes/index.js
const route = require('./routes');

const db = require('./config/db/index');
const Shoes = require('./app/models/Shoes');
const SortMiddleware = require('./app/middlewares/SortMiddleware')

// app.use(formatCurrencyMiddleware);

// connect to mongoDB
db.connect();

//Thiết lập đường dẫn tĩnh để phục vụ các file tĩnh:
app.use(express.static(path.join(__dirname, '/resources/public')));

//Thiết lập middleware để phân tích các request body
app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(methodOverride('_method'));
app.use(express.json());
app.use(SortMiddleware);
app.use(bodyParser.json());
app.use(cookieParser());


//Thiết lập middleware để log các request HTTP:
app.use(morgan('combined'));

app.engine(
    'hbs',
    exphbs({
        extname: '.hbs',
        handlebars: allowInsecurePrototypeAccess(Handlebars), // them config nay`ne`a 
        helpers: {
            sum: (a, b) => a + b,
            isSelected: (optionValue, categoryValue) => {
                return optionValue === categoryValue ? 'selected' : '';
            },
            eachRow: function(context, itemsPerRow, options) {
                let out = '';
                for (let i = 0; i < context.length; i += itemsPerRow) {
                    out += '<div class="row">';
                    for (let j = 0; j < itemsPerRow && i + j < context.length; j++) {
                        out += options.fn(context[i + j]);
                    }
                    out += '</div>';
                }
                return out;
            },
            range: (start, end) => {
                const rangeArray = [];
                for (let i = start; i <= end; i++) {
                    rangeArray.push(i);
                }
                return rangeArray;
            },
            eq: (a, b) => a === b,
            gt: (a, b) => a > b,
            lt: (a, b) => a < b,
            add: (a, b) => a + b,
            subtract: (a, b) => a - b,

            sortTable: (field, sort) => {
                
            }
        }
        
        
    }),
);




//Thiết lập engine template Handlebars
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

// khởi tạo các route
route(app);
//Fake data product

//Lắng nghe trên cổng đã định
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

// module.exports = app;
