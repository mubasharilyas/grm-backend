import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { Request, Response } from 'express'
export async function login(req: Request, res: Response) {
    let userCredentials: any = req.body
    User.find({ email: userCredentials.email })
        .exec()
        .then((user) => {
            if (user.length < 1) {
                return res.json({
                    errorMessage: "Could'nt found your account!",
                });
            } else {
                bcrypt.compare(userCredentials.password, user[0].password, (err, result) => {
                    if (result) {

                        const token = jwt.sign(
                            {
                                email: user[0].email,
                                userId: user[0]._id
                            },
                            process.env.JWT_TOKEN,
                            {
                                expiresIn: '1h'
                            }
                        )
                        return res.status(200).json({
                            token: token,
                            success: true,
                        });
                    }
                    else {
                        return res.json({
                            errorMessage: "Wrong Password",
                        });
                    }

                });
            }
        })
        .catch((err) => {
            res.json({ errorMessage: "Something has gone wrong on the server" });

        });


}


export async function register(req: Request, res: Response) {
    try {
        let existantUser = await User.findOne({ email: req.body.email })
        if (existantUser) {
            res.json({ errorMessage: "User already exist" });

        } else {
            const user = new User({
                email: req.body.email,
                password: req.body.password,
                username: req.body.userName,
                gender: req.body.gender
            })
            const result = await user.save();
            res.send(result);
        }
    }
    catch (err) {
        res.json({ errorMessage: "Something has gone wrong on the server" });
    }


}

