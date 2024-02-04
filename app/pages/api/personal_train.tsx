// pages/api/personal_train.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../db'; // 替換成你的 db.ts 文件的實際路徑

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const [rows, fields] = await pool.query('SELECT * FROM `personal training`');
      res.status(200).json(rows);
    } catch (error) {
      console.error('Error fetching data from MySQL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { content, data, time, note, finish } = req.body;

    try {
      await pool.query(
        'INSERT INTO `personal training` (content, data, time, note, finish) VALUES (?, ?, ?, ?, ?)',
        [content, data, time, note, finish],
      );

      res.status(201).json({ message: 'Data added successfully' });
    } catch (error) {
      console.error('Error adding data to MySQL:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
