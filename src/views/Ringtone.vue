<template>
<div class="ringtone">
  <div class="container">
    <div class="row-1">
      <div class="col-15">
        <div class="pomodo_title">
          <div class="pomodo_title_group">
            <p>RINGTONES</p>
          </div>
        </div>
        <div class="pomodo_content">
          <div class="ringtones_work">
            <div class="right_label_title">
              <p>WORK</p>
            </div>
            <div class="radio_list">
              <div class="radio_group">
                 <div class="radios" v-for="(items,index) in items" :key="index">
                   <a href='#' v-if='sound === items.src'><img src="../assets/img/round_radio_button_checked_brown_24dp.png"></a>
                   <a href='#' v-else><img src="../assets/img/round_radio_button_unchecked_brown_24dp.png" @click='selectwork(items.src)'></a>
                   <p> {{ items.name }} </p>
                 </div>
              </div>
            </div>
          </div>
          <div class="ringtones_break">
            <div class="right_label_title">
              <p>BREAK</p>
            </div>
            <div class="radio_list">
              <div class="radio_group">
                <div class="radios" v-for="(items,index) in items" :key="index">
                  <a href='#' v-if='sound1 === items.src'><img src="../assets/img/round_radio_button_checked_brown_24dp.png"></a>
                  <a href='#' v-else ><img src="../assets/img/round_radio_button_unchecked_brown_24dp.png" @click='selectbreak(items.src)'></a>
                  <p> {{ items.name }} </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'ringtone',
  data () {
    return {
      items: [
        { name: 'NONE', src: 'NONE.mp3' },
        { name: 'DEFAULT', src: 'DEFAULT.mp3' },
        { name: 'ALARM', src: 'ALARM.mp3' },
        { name: 'ALERT', src: 'ALERT.mp3' },
        { name: 'BEEP', src: 'BEEP.mp3' },
        { name: 'BELL', src: 'BELL.mp3' },
        { name: 'BIRD', src: 'BIRD.mp3' },
        { name: 'BUGLE', src: 'BUGLE.mp3' },
        { name: 'DIGITAL', src: 'DIGITAL.mp3' },
        { name: 'DROP', src: 'DROP.mp3' },
        { name: 'HORE', src: 'HORN.mp3' },
        { name: 'MUSIC', src: 'MUSIC.mp3' },
        { name: 'RING', src: 'RING.mp3' },
        { name: 'WARNING', src: 'WARNING.mp3' },
        { name: 'WHISTLE', src: 'WHISTLE.mp3' }
      ]
    }
  },
  computed: {
    sound () {
      return this.$store.state.sound
    },
    sound1 () {
      return this.$store.state.sound1
    }
  },
  methods: {
    selectwork (item) {
      if (item === 'none') {
        if (this.audio) this.audio.pause()
        this.audio = null
      } else {
        if (this.audio) this.audio.pause()
        this.audio = new Audio(require('../assets/audio/' + item))
        this.audio.play()
      }
      this.$store.commit('selectWSound', item)
    },
    selectbreak (item1) {
      if (item1 === 'none') {
        if (this.audio) this.audio.pause()
        this.audio = null
      } else {
        if (this.audio) this.audio.pause()
        this.audio = new Audio(require('../assets/audio/' + item1))
        this.audio.play()
      }
      this.$store.commit('selectBSound', item1)
    }
  }
}
</script>
