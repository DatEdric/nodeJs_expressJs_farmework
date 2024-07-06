const faker = require('faker');
const  Shoes = require('../app/models/Shoes');


 async function generateFakeData() {
    try {
        for (let i = 0; i < 50;i++) {
            const newPd = new Shoes();
            newPd.name_product = faker.commerce.productName()
            newPd.price = faker.commerce.price()
            newPd.category = faker.commerce.department()
            newPd.description = faker.commerce.productDescription()
            newPd.size = faker.datatype.number({ min: 5, max: 12 })
            newPd.thumb_nail = faker.image.imageUrl()
    
            await newPd.save();
            
        }
    } catch (error) {
        throw new Error('Error generating fake data:   ' + error.message);
    }
}
module.exports = { generateFakeData};