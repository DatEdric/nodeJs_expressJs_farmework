// utils/currency.js
const numeral = require('numeral');

// Load the numeral locale for Vietnam
numeral.register('locale', 'vi', {
    delimiters: {
        thousands: ',',
        decimal: '.'
    },
    abbreviations: {
        thousand: ' nghìn',
        million: ' triệu',
        billion: ' tỷ',
        trillion: ' nghìn tỷ'
    },
    currency: {
        symbol: '₫'
    }
});

// Switch to the 'vi' locale
numeral.locale('vi');

const formatCurrency = (value) => {
    return numeral(value).format('0,0[.]00 $');
};

module.exports = { formatCurrency };
