import Axios from 'axios';
import { Config } from '../cli/ConsoleUtil';
import { pipe, pipeP, tryCatch, isNil, until, empty } from 'ramda';
import { Video } from '../types/BusinessTypes';

const startAggregation = tryCatch<Promise<Video[]>>(
  pipeP<Config, any[], Video[]>(
    pipe<Config, string, Promise<any[]>>(buildUrl, makeApiCall),
    mapToVideos),
  (e) => {
    throw e;
  });

function buildUrl(config: Config) {
  return `https://graph.facebook.com/v3.0/${config.page_name}/videos?limit=500&fields=id,title,from,`
    + `likes.limit(0).summary(total_count),comments.limit(0).summary(total_count)&access_token=${config.access_token}`;
}

async function makeApiCall(url: string) {
  try {
    const response = await Axios.get(url);
    const result = response.data.data;
    return result;
  } catch (error) {
    throw error;
  }
}

async function mapToVideos(data: any[]) {
  return data.map((d: any) => {
    const v: Video = {
      id: d.id,
      title: d.title,
      page_name: d.from.name,
      page_id: d.from.id,
      comments_count: d.comments.summary.total_count,
      likes_count: d.likes.summary.total_count,
    };
    return v;
  });
}

function buildVideoPostUrl(input: any) {
  return `https://graph.facebook.com/v3.0/${input.page_id}_${input.id}/?fields=shares`
    + `&access_token=${input.access_token}`;
}

async function getSharesCountFromApi(url: string): Promise<number> {
  let response;
  try {
    response = await Axios.get(url);
  } catch (error) {
    throw error;
  }
  try {
    return response.data.shares.count;
  } catch (error) {
    return 0;
  }
}

const fillSharesCount = tryCatch(pipe<any, string, Promise<number>>(buildVideoPostUrl, getSharesCountFromApi),
  (e) => {
    throw e;
  });

export { startAggregation as StartAggregation, fillSharesCount as FillSharesCount };
