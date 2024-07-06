const { log } = require('console');
const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ecco_website_');

        console.log("connected to DB successfully");
    } catch (error) {
        console.log("connected to DB fail");
        
    }
}

module.exports = { connect}
  