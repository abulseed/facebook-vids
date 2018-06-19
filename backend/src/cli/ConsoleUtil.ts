import * as readline from 'readline';
import * as async from 'async';
import { URL } from 'url';
import { partial } from 'ramda';
import { StartAggregation, FillSharesCount } from '../graph/ApiAdapter';
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
      console.time('Crawl_Videos');
      const videos: Video[] = await StartAggregation(config);
      const promises = videos.map(async (v: Video) => {
        const tmp = v;
        tmp.shares_count = await FillSharesCount({ page_id: v.page_id, id: v.id, access_token: config.access_token });
        return tmp;
      });
      const vv = await Promise.all(promises);
      Serialize(vv);
      console.timeEnd('Crawl_Videos');
    } catch (error) {
      throw error;
    }
  });
}

export { buildConfig as BuildConfig };
