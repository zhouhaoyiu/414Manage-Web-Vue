<template>
  <div>
    <video
      class="video"
      width="720px"
      height="720px"
      controls
      style="outline: none"
    >
      <source src="../assets/dasima.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<script>
// 引入video样式
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
export default {
  data() {
    return {

    }
  }
}
</script>

<style>
.video {
  position: absolute;
  left: 30%;
  top: 15%;
}
</style>
