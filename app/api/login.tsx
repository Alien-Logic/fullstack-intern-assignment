import type { NextApiRequest, NextApiResponse } from "next";
import jwt from 'jsonwebtoken';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username, password } = req.body;

    if (username === 'theju' && password === 'hello@1') {
        const token = jwt.sign({ username }, 'secret-key', { expiresIn: '1h' });
        res.status(200).json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
}

