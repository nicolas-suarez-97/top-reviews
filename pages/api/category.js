import {del, get, post, put} from "../../utils/mongodb";

export default function handler (req, res) {
    const collection = "category"
    switch (req.method) {
        case 'GET': {
            return get(req, res, collection,req.query);
        }

        case 'POST': {
            return post(req, res, collection);
        }

        case 'PUT': {
            return put(req, res, collection);
        }

        case 'DELETE': {
            return del(req, res, collection);
        }
    }
}