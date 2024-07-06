const mongoose = require("mongoose");
const { type } = require("os");
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Shoes = new Schema({
        name_product: {
            type: String,
            maxLength:255,
            required: true,
        },
        description: {
            type: String,
            maxLength:255,
            required: true,
        },
        thumb_nail: {
            type: String,
            maxLength:255,
        },
        category: {
            type: String,
            maxLength:255,
            require: true,
        },
        size: {
            type: Number,

        },
        price: {
            type: Number,
        },
        deleted: {
            type: Boolean,
        },
        slug: {
            type: String,
            slug: "name_product",
        }

    },
    {

    },
    {
        timestamps: true,
    },
);
Shoes.plugin(mongooseDelete, {overrideMethods: 'all', deleted: true, deletedAt: null} );
mongoose.plugin(slug);

module.exports = mongoose.model('Shoes', Shoes);
