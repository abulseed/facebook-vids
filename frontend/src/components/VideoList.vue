<template>
  <div>
    <div>
      <sort-panel/>
    </div>

    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <template v-if="videos.length > 0">
        <video-card v-for="video in videos" :video="video" :key="video.title" />
      </template>
      <h1 v-else>No results</h1>
    </div>
  </div>
</template>

<script>
import VueMDCList from "vue-mdc-adapter/dist/list";
import VueMDCSelect from "vue-mdc-adapter/dist/select";
import VideoCard from "./VideoCard.vue";
import SortPanel from "./SortPanel.vue";
import { mapState } from "vuex";

export default {
  data: () => {
    return {
      sortBy: "",
      busy: false
    };
  },
  components: {
    VideoCard,
    SortPanel
  },
  mixins: [VueMDCList, VueMDCSelect],
  computed: {
    ...mapState(["videos"])
  },
  watch: {
    sortBy: function(val) {
      this.$store.commit("sortVideos", val);
    }
  },
  mounted() {
    this.$store.commit("initVideos");
  },
  methods: {
    loadMore() {
      this.busy = true;
      this.$store.commit("addNewBatch");
      this.busy = false;
    }
  }
  // methods: {
  //   loadMore: function() {
  //     this.busy = true;

  //     setTimeout(() => {
  //       for (var i = 0, j = 10; i < j; i++) {
  //         this.data.push({ name: count++ });
  //       }
  //       this.busy = false;
  //     }, 1000);
  //   }
  // }
};
</script>

<style lang="scss" scoped>
.container {
  margin: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 100fr;
}
.sort {
  grid-column: 1 / 2;
  grid-row: 1;
}
.list {
  grid-column: 1;
  grid-row: 2;
}
</style>
