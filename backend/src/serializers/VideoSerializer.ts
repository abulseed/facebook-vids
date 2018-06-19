import * as fs from 'fs';
import { Video } from '../types/BusinessTypes';

function serialize(videos: Video[]) {
  fs.writeFile('./Videos.json', JSON.stringify(videos, null, 2), (err) => {
    if (err) {
      throw err;
    }
    console.log('Videos are saved successfully.');
  });
}

export { serialize as Serialize };
