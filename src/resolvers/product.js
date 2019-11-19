import Product from '../models/product'

export const getProducts = async () => {
    return await Product.find({});
}

export const addProduct = async args => {
    const newProduct = new Product({ ...args });
    const response = await newProduct.save();
    return response;
}

export const getProductById = async id => {
    return await Product.findById(id);;
}

export const getProductsByFilter = async (query, properties = []) => {

    const regexToMatch = { $regex: new RegExp(query, 'ig') }
    const propertiesToMatch = properties.map(property => {
        return {[property]: regexToMatch}
    })

    if (query && properties.length > 0) {
        return await Product.aggregate([
            {
                $match:
                {
                    $or: propertiesToMatch
                }
            },
            {
                "$addFields": { "id": { "$toString": "$_id" } }
            }
        ]);
    } else {
        return await Product.find({})
    }
}