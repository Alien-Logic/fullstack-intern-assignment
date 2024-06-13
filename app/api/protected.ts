import type { NextApiRequest, NextApiResponse } from "next";
// import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ message: 'Authrosization header missing' });
    }

    const token = authorization.split(' ')[1];

    try {
        // const decoded = jwt.verify(token, 'secret-key') as { username: string };
        const decoded = {username: "theju"}
        res.status(200).json({ message: `Hello, ${decoded.username}` });
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
}