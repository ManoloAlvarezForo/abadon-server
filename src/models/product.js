import mongoose from 'mongoose';
import moment from 'moment';

const Schema = mongoose.Schema;

const productSchema = new Schema({
    productId: {type: String, default: ''},
    image: String,
    productName: String,
    price: Number,
    description: String,
    isAvailable: Boolean,
    availableQuantity: Number,
    createdDate: { type: String, default: moment().format()}
});

let CounterSchema = new Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

let counter = mongoose.model('counter', CounterSchema);

productSchema.pre('save', function(next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'productId'}, {$inc: { seq: 1} }, {new: true, upsert: true}).then(function(count) {
        doc.productId = count.seq;
        next();
    })
    .catch(function(error) {
        console.error("counter error-> : "+error);
        throw error;
    });
});

/**
 * Product mongoose schema.
 */
export default mongoose.model('product', productSchema);