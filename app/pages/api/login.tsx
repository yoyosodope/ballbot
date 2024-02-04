// api/login.ts

import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../db';
import bcrypt from 'bcryptjs';
import { RowDataPacket } from 'mysql2';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { name, password } = req.body;

  try {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM account WHERE name = ?', [name]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const user = rows[0];

    if (!user || typeof user.password === 'undefined') {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({ message: 'Login successful', userId: user.id });
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
