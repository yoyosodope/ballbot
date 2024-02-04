// db.ts
import { createPool, Pool } from 'mysql2/promise';

const pool: Pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'ball_bot',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
