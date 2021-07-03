<template>
<div class="home">
  <div class="container">
      <div class="row-1">
        <div :class='this.bgcolor'>
          <div class="time">
            <div class="time_up">
              <a href="#" v-if='status !== 1' @click='start'><img src="../assets/img/round_play_circle_filled_white_24dp.png" width="60px" height="60px"></a>
              <a href="#" v-if='status === 1' @click='pause'><img src="../assets/img/round_pause_circle_white_24dp.png" width="60px" height="60px"></a>
              <p class="time_num">{{ timeText }}</p>
              <p class="time_name" style="font: normal normal bold 30px/39px Roboto;">{{ currentText }}</p>
            </div>
            <div class="time_down">
              <progress id="file" :max='this.program_max' :value="this.timeleft"></progress>
            </div>
          </div>
          <div class="home_todo">
            <div class="home_todo_up">
              <input class="main_text" type="text" placeholder="ADD A NEW MISSION..." v-model='newitem' @keydown.enter='additem'>
              <a href="#" @click='additem'><img src="../assets/img/round_add_circle_white_24dp.png"></a>
            </div>
            <br>
            <div class="home_todo_down" v-for='(item, idx) in list.slice(0,3)' :key='idx'>
              <div class="home_todo_list">
                <a href='#' @click="finish2(idx + '_' + item.name)"><img src='../assets/img/round_radio_button_unchecked_white_24dp.png'></a>
                <p>{{ item.name }} </p>
                <a href='#' @click='change(item.id)'><img class="list_playicon" src='../assets/img/round_play_circle_filled_white_24dp.png'></a>
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
  name: 'List',
  data () {
    return {
      newitem: '',
      timer: 0
    }
  },
  computed: {
    status () {
      return this.$store.state.status
    },
    list () {
      return this.$store.getters.list.filter(item => {
        if (item.status === false) return true
      })
    },
    list1 () {
      return this.$store.state.list
    },
    current () {
      return this.$store.state.current
    },
    music () {
      return this.$store.state.music
    },
    currentText () {
      let text = this.current
      if (text.length === 0) {
        if (this.list1.length === 0) {
          text = '沒有事項'
        } else {
          text = '請選擇要執行的事情'
        }
      }
      return text
    },
    timeleft () {
      return this.$store.state.timeleft
    },
    timeText () {
      const m = Math.floor(this.timeleft / 60)
      const s = Math.floor(this.timeleft % 60)
      return `${m} : ${s}`
    },
    isbreak () {
      return this.$store.state.isBreak
    },
    bgcolor () {
      let bgclass = 'col-14'
      if (this.isbreak === false) {
        bgclass = 'col-14'
      } else {
        bgclass = 'col-14-b'
      }
      return bgclass
    },
    program_max () {
      let pmx = this.$store.state.maxtime
      if (this.isbreak === false) {
        pmx = this.$store.state.maxtime
      } else {
        pmx = this.$store.state.maxbreak
      }
      return pmx
    }
  },
  methods: {
    additem () {
      this.$store.commit('addList', this.newitem)
      this.newitem = ''
    },
    pause () {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 2)
    },
    start () {
      if (this.status !== 2 && this.list1.length > 0) {
        this.$store.commit('start')
      }
      if (this.current.length > 0) {
        this.$store.commit('changeStatus', 1)
        this.timer = setInterval(() => {
          this.$store.commit('countdown')
          if (this.timeleft <= -1) {
            this.finish(false)
          }
        }, 1000)
      }
    },
    change (index) {
      this.$store.commit('changeOrder', index)
    },
    finish (skip) {
      clearInterval(this.timer)
      this.$store.commit('changeStatus', 0)
      this.$store.commit('addFinish')

      if (!skip) {
        const audio = new Audio()
        audio.src = this.music
        audio.play()
      }

      if (this.$store.state.isBreak === true) {
        this.start()
      }
    },
    finish2 (index) {
      this.$store.commit('addFinish2', index)
    }
  }
}
</script>
