<template>
  <div>
    <div>
      <mdc-select v-model="sortBy" label="Sort By">
        <option>Views</option>
        <option>Likes</option>
        <option>Shares</option>
      </mdc-select>
    </div>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <video-card v-for="video in videos" :video="video" :key="video.title" />
    </div>
  </div>
</template>

<script>
import VueMDCList from "vue-mdc-adapter/dist/list";
import VueMDCSelect from "vue-mdc-adapter/dist/select";
import VideoCard from "./VideoCard.vue";
import { mapState } from "vuex";

export default {
  data: () => {
    return {
      sortBy: "",
      busy: false
    };
  },
  components: {
    VideoCard
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
