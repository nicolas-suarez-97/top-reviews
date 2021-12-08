import {connectToDatabase} from "../lib/mongodb";
const ObjectId = require('mongodb').ObjectId;

async function get(req, res, collection, query){
    try {
        let { db } = await connectToDatabase();
        let posts = await db
            .collection(collection)
            .find(query)
            .sort({ creationDate: -1 })
            .toArray();
        return res.json({
            message: JSON.parse(JSON.stringify(posts)),
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function post(req, res, collection) {
    try {
        let { db } = await connectToDatabase();
        await db.collection(collection).insertOne(JSON.parse(req.body));
        return res.json({
            message: 'Added successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function put(req, res, collection) {
    req.body = JSON.parse(req.body)
    req.body._id = new ObjectId(req.body._id);

    try {
        let { db } = await connectToDatabase();
        await db.collection(collection).updateOne(
            {
                _id: req.body._id,
            },
            { $set: req.body }
        );
        return res.json({
            message: 'Updated successfully',
            success: true,
        });
    } catch (error) {
        console.log('error', error)
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

async function del(req, res, collection) {
    try {
        let { db } = await connectToDatabase();

        await db.collection(collection).deleteOne({
            _id: new ObjectId(req.body),
        });

        return res.json({
            message: 'Deleted successfully',
            success: true,
        });
    } catch (error) {
        return res.json({
            message: new Error(error).message,
            success: false,
        });
    }
}

export {
    get,
    post,
    put,
    del,
}