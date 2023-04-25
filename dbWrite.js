import fs from 'fs';

function dbWrite(obj) {
  fs.writeFileSync('db.json', JSON.stringify(obj, null, 2));
};

export default dbWrite;