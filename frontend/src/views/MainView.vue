<template>
  <mdc-layout-app>

    <div slot="toolbar">
      <toolbar/>
    </div>

    <main>
      <video-list/>
    </main>

  </mdc-layout-app>
</template>


<script>
import VueMDCAppLayout from "vue-mdc-adapter/dist/layout-app";
import Toolbar from "../components/Toolbar.vue";
import VideoList from "../components/VideoList.vue";

export default {
  mixins: [VueMDCAppLayout],
  components: {
    Toolbar,
    VideoList
  }
};
</script>
