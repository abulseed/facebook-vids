import * as readline from 'readline';
import * as async from 'async';
import { URL } from 'url';
import { StartAggregation, VideoMainMapper } from '../graph/ApiAdapter';
import { Video } from '../types/BusinessTypes';
import { Serialize } from '../serializers/VideoSerializer';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export interface Config {
  access_token: string;
  page_name: string;
}

const config: Config = {
  access_token: '',
  page_name: '',
};

function buildConfig() {
  async.series([
    (callback) => {
      rl.write('Welcome!\n');
      rl.question('Please paste a Facebook Graph Api access token. Then press ENTER.\n', (token) => {
        config.access_token = token;
        callback();
      });
    },
    (callback) => {
      rl.write('\n');
      rl.question('Please paste a Facebook page URL. Then press ENTER.\n', (url) => {
        const a = new URL(url);
        config.page_name = a.pathname.replace('/', '');
        callback();
      });
    },
  ], async () => {
    try {
      rl.close();
      console.time('Total_Time');
      console.time('Load_Data_From_Api');
      const videosData: any[] = await StartAggregation(config);
      console.timeEnd('Load_Data_From_Api');
      console.time('Load_Each_Share');
      const promises = videosData.map(VideoMainMapper);
      const vv = await Promise.all(promises);
      console.timeEnd('Load_Each_Share');
      console.time('Serialize');
      Serialize(vv);
      console.timeEnd('Serialize');
      console.timeEnd('Total_Time');
    } catch (error) {
      throw error;
    }
  });
}

export { buildConfig as BuildConfig };
