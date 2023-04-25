import fs from 'fs';

function dbRead() {
  return JSON.parse(fs.readFileSync('db.json'));
};

export default dbRead;