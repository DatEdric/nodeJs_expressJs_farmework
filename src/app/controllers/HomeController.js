const Shoes = require('../models/Shoes');
const { formatCurrency } = require('../middlewares/formatCurrencyMiddleware');

class HomeController {
    home(req, res, next) {
        let perPage = 10;
        let page = parseInt(req.query.page) || 1;
        Shoes.find({})
            .skip((perPage * page) - perPage) // Calculate the number of items to skip
            .limit(perPage) // Limit the number of items per page
            .then(shoes => {
                const currencyPromises = shoes.map(shoe => {
                    return new Promise((resolve, reject) => {
                        const formattedPrice = formatCurrency(shoe.price);
                        resolve({
                            ...shoe.toObject(), // Chuyển đối tượng mongoose sang plain object
                            price: formattedPrice
                        });
                    });
                });
                return Promise.all(currencyPromises);
            })
            .then(formattedShoes => {
                Shoes.countDocuments({})
              .then(count => {
                res.render('home', {
                    shoes: formattedShoes,
                    current: page,
                    pages: Math.ceil(count / perPage)
                });
              });
            })
            .catch(next);
    }

    product(req, res) {
        res.render('productinfo');
    }
}

module.exports = new HomeController();
