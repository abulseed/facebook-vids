import Vue from "vue";
import Vuex from "vuex";
import * as videosJson from '../data-source.json';

Vue.use(Vuex);

const videosArr = videosJson.default;

export default new Vuex.Store({
  state: {
    videos: [],
    offset: 0,
    pageSize: 10,
    filtered: false,
    filterPayload: "",
    sorted: false,
    sortedPayload: "",
    order: "asc",
  },
  mutations: {
    initVideos(state) {
      state.videos = videosArr.slice(state.offset, state.pageSize);
      console.log(state.videos.length);
      state.offset = state.pageSize;
    },
    addNewBatch(state) {
      let tmpArr = videosArr;
      const tmp = state.offset;
      state.offset = tmp + state.pageSize;
      if (state.filtered) {
        tmpArr = tmpArr.filter(v => v.title.toLowerCase().includes(state.filterPayload)
          || v.parent_name.toLowerCase().includes(state.filterPayload));
      }
      if (state.sorted) {
        if (state.order === 'asc') {
          tmpArr = tmpArr.sort((a, b) => a[state.sortedPayload] - b[state.sortedPayload])
        } else {
          tmpArr = tmpArr.sort((a, b) => b[state.sortedPayload] - a[state.sortedPayload])
        }
      }
      tmpArr = tmpArr.slice(tmp, state.offset);
      for (let index = 0; index < tmpArr.length; index++) {
        state.videos.push(tmpArr[index]);
      }
    },
    filterVidoes(state, payload) {
      let tmpArr = videosArr;
      state.filterPayload = payload;
      state.offset = 0;
      if (payload && payload.length > 0) {
        tmpArr = tmpArr.filter(v => v.title.toLowerCase().includes(payload)
          || v.parent_name.toLowerCase().includes(payload));
        state.filtered = true;
      } else {
        state.filtered = false;
      }
      if (state.sorted) {
        if (state.order === 'asc') {
          tmpArr = tmpArr.sort((a, b) => a[state.sortedPayload] - b[state.sortedPayload])
        } else {
          tmpArr = tmpArr.sort((a, b) => b[state.sortedPayload] - a[state.sortedPayload])
        }
      }
      state.videos = tmpArr.slice(state.offset, state.pageSize);
      state.offset = state.pageSize;
    },
    sortVideos(state, payload) {
      let tmpArr = videosArr;
      const sortBy = payload.sortBy.toLowerCase();
      const order = payload.order.toLowerCase();
      state.sortedPayload = sortBy;
      state.order = order;
      state.offset = 0;
      console.log(sortBy);
      if (state.filtered) {
        tmpArr = tmpArr.filter(v => v.title.toLowerCase().includes(state.filterPayload)
          || v.parent_name.toLowerCase().includes(state.filterPayload));
      }
      if (sortBy && sortBy.length > 0) {
        if (order === 'asc') {
          tmpArr = tmpArr.sort((a, b) => a[sortBy] - b[sortBy]);
        } else {
          tmpArr = tmpArr.sort((a, b) => b[sortBy] - a[sortBy]);
        }
        state.sorted = true;
      } else {
        state.sorted = false;
      }
      state.videos = tmpArr.slice(state.offset, state.pageSize)
      state.offset = state.pageSize;
    }
  },
});
