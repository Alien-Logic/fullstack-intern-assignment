import type { NextApiRequest, NextApiResponse } from "next";
// import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (username === 'theju' && password === 'hello@1') {
            // const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });
            const token = "hello";
            res.status(200).json({ token });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } else {
        res.status(405).end('Requested method not allowed')
    }
    
}

