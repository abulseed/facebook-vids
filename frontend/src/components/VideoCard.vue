<template>
  <mdc-card style="margin: 10px;">
    <mdc-card-header :title="video.title" :subtitle="video.parent_name">
    </mdc-card-header>
    <div class="details">
      <mdc-caption class="views"> Views: {{ video.views }} </mdc-caption>
      <mdc-caption class="likes"> Likes: {{ video.likes }} </mdc-caption>
      <mdc-caption class="comments"> Comments: {{ video.comments }} </mdc-caption>
      <mdc-caption class="shares"> Shares: {{ video.shares }} </mdc-caption>
      <mdc-caption class="published"> Published: {{ video.published }} </mdc-caption>
    </div>
  </mdc-card>
</template>

<script>
import VueMDCCard from "vue-mdc-adapter/dist/card";
import VueMDCTypography from "vue-mdc-adapter/dist/typography";

export default {
  mixins: [VueMDCCard, VueMDCTypography],
  props: {
    video: {
      type: Object,
      default: {
        title: "Default",
        parent_name: "Default",
        views: "Default",
        likes: "Default",
        comments: "Default",
        shares: "Default",
        published: "Default"
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.details {
  text-align: center;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr 1fr 1fr;
}
.views {
  grid-column: 1 / 2;
  grid-row: 1;
}
.likes {
  grid-column: 2 / 3;
  grid-row: 1;
}
.comments {
  grid-column: 1 / 2;
  grid-row: 2;
}
.shares {
  grid-column: 2 / 3;
  grid-row: 2;
}
.published {
  grid-column: 1 / 3;
  grid-row: 3;
}
</style>
