<template>
  <div>
    <mdc-layout-grid>
      <mdc-layout-cell desktop="6">
        <mdc-select v-model="sortBy" label="Sort By">
          <option>Views</option>
          <option>Likes</option>
          <option>Shares</option>
        </mdc-select>
      </mdc-layout-cell>
      <mdc-layout-cell desktop="6">
        <mdc-select v-model="order" label="Order">
          <option>ASC</option>
          <option>DESC</option>
        </mdc-select>
      </mdc-layout-cell>
    </mdc-layout-grid>
  </div>
</template>

<script>
import VueMDCSelect from "vue-mdc-adapter/dist/select";
import VueMDCGrid from "vue-mdc-adapter/dist/layout-grid";
export default {
  data: () => {
    return {
      order: "ASC",
      sortBy: "",
      busy: false
    };
  },
  mixins: [VueMDCGrid, VueMDCSelect],
  watch: {
    sortBy: function(val) {
      this.$store.commit("sortVideos", { sortBy: val, order: this.order });
    },
    order: function(val) {
      this.$store.commit("sortVideos", { sortBy: this.sortBy, order: val });
    }
  }
};
</script>

