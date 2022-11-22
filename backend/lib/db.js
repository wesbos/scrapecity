// Setup the DB
import { Low } from 'npm:lowdb';
import { JSONFile } from 'npm:lowdb/node';

const adapter = new JSONFile('db.json');
const db = new Low(adapter);
await db.read();
db.data = db.data || { twitter: [], instagram: [], tiktok: [] }
db.write();

export default db;
