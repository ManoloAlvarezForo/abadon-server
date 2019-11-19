import Client from '../models/client'

export const getClients = async () => {
    return await Client.find({});
}

export const addClient = async args => {
    const newClient = new Client({ ...args });
    const response = await newClient.save();
    return response;
}

export const getClientById = async id => {
    return await Client.findById(id);;
}

export const getClientsByFilter = async (query, properties = []) => {

    const regexToMatch = { $regex: new RegExp(query, 'ig') }
    const propertiesToMatch = properties.map(property => {
        return {[property]: regexToMatch}
    })

    if (query && properties.length > 0) {
        return await Client.aggregate([
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
        return await Client.find({})
    }
}