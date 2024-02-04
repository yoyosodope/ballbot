// pages/api/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, account, password } = req.body;

  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO account (name, account, password) VALUES (?, ?, ?)',
      [name, account, password]
    );
    connection.release();

    res.status(200).json({ message: '註冊成功' });
  } catch (error: any) {
    console.error('Error in registration:',error);
    console.error('Server-side error:', error);
  // 寫入日誌文件或其他日誌記錄系統
    // 將錯誤信息寫入伺服器端的日誌文件
    // 這裡可以使用你喜歡的日誌庫，例如winston、morgan等
    // 這裡是示例使用console.log
    console.log(error);
    res.status(500).json({ message: '註冊失敗', error: error.stack});
  }
}
