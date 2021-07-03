<template>
  <div class="app">
    <div :class='this.bgcolor'>
      <div class="left_menu">
        <div class="font">
          <p>POMODORO</p>
        </div>
        <div class="icon">
          <router-link to="/"><img src="./assets/img/round_schedule_white_24dp.png"></router-link>
          <router-link to="/Todo"><img src="./assets/img/round_format_list_bulleted_white_24dp.png"></router-link>
          <router-link to="/Analytics"><img src="./assets/img/round_insert_chart_white_24dp.png"></router-link>
          <router-link to="/Ringtone"><img src="./assets/img/baseline_library_music_white_24dp.png"></router-link>
        </div>
      </div>
    </div>
    <keep-alive>
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  computed: {
    isbreak () {
      return this.$store.state.isBreak
    },
    bgcolor () {
      let bgclass = 'col-13'
      if (this.isbreak === false) {
        bgclass = 'col-13'
      } else {
        bgclass = 'col-13-b'
      }
      return bgclass
    }
  }
}
</script>

<style lang="stylus">
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap')
</style>
