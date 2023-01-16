
import { Alert } from '../models/alert.model';
import { Request, Response } from 'express';
export async function getAlerts(req: Request, res: Response) {
    let sort: any = {};
    sort.errorCategory = +req.params.sort;
    let page = Number(req.params.page) * 1 - 1;
    let offset = 10 * page;
    try {

        const [alerts, count] = await Promise.all(
            [
                Alert.find().limit(10).skip(offset).sort(sort),
                Alert.countDocuments()
            ]
        )
        res.json({ totalCount: count, alerts });
    }
    catch (err) {
        res.json({ errorMessage: "Something has gone wrong on the server" });
    }
}
