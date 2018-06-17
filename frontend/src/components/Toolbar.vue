<template>
  <mdc-toolbar fixed>
    <mdc-toolbar-row>
      <mdc-toolbar-section align-start>
        <mdc-toolbar-title>List of Videos</mdc-toolbar-title>
      </mdc-toolbar-section>
      <mdc-toolbar-section align-end>
        <input type="text" v-model="query">
      </mdc-toolbar-section>
    </mdc-toolbar-row>
  </mdc-toolbar>
</template>

<script>
import VueMDCToolbar from "vue-mdc-adapter/dist/toolbar";

export default {
  mixins: [VueMDCToolbar],
  data() {
    return {
      query: ""
    };
  },
  watch: {
    query: function(val) {
      this.$store.commit("filterVidoes", val);
    }
  }
};
</script>

