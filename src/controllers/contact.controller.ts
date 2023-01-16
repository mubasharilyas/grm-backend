
import { Contact } from '../models/contact.model';

import { Request, Response } from 'express'

export async function getContacts(req: Request, res: Response) {
    let sort: any = {};
    sort.contactName = +req.params.sort;
    let search = {};
    search = req.params.cName ? { contactName: req.params.cName } : {};
    let page = Number(req.params.page) * 1 - 1;
    let skip = 10 * page;
    try {
        const [contacts, count] = await Promise.all(
            [
                Contact.find(search).limit(10).skip(skip).sort(sort),
                Contact.countDocuments(search)
            ])
        res.status(200).send({ totalCount: count, contacts });
    }
    catch (err) {
        res.json({ errorMessage: "Something has gone wrong on the server" });
    }

}
export async function contactStates(req: Request, res: Response) {

    try {
        const stats = await Contact.aggregate([
            {
                $group: {
                    _id: '$contactState',
                    count: { $sum: 1 }
                }
            },
            {
                $group: {
                    _id: null,
                    totalStates: { $sum: 1 },
                    totalContacts: { $sum: '$count' }
                }
            },
            {
                $project: { _id: 0 }
            }
        ])
        res.status(200).send(stats[0]);
    } catch (error) {
        res.json({ errorMessage: "Something has gone wrong on the server" });
    }


}
export async function createContact(req: Request, res: Response) {
    let cId = req.params.id;

    try {
        if (cId) {
            const result = await Contact.findOneAndUpdate({ contactId: cId }, { $set: req.body.data }, { new: true });
            res.send(result);
        }
        else {
            const result = await Contact.create(req.body.data);
            res.send(result);
        }
    } catch (error) {
        res.json({ errorMessage: "Something has gone wrong on the server" });
    }

}
