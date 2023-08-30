import { Config, JsonDB } from 'node-json-db';

const db = new JsonDB(
  new Config('src/shared/database/database', true, true, '/', true),
);

function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export { db, generateUUID };
