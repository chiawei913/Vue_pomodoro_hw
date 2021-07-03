<template>
<div id="todo">
  <div class="container">
    <div class="row-1">
      <div class="col-15">
        <div class="pomodo_title">
          <div class="pomodo_title_group">
            <p>TO-DO LIST</p>
            <input class="todo_list_text" type="text" placeholder="ADD A NEW MISSION..." v-model='newitem' @keydown.enter='additem'>
            <a href='#' @click='additem'><img src="../assets/img/round_add_circle_brown_24dp.png"></a>
          </div>
        </div>
        <div class="pomodo_content">
          <div class="todo_collapse_todo">
            <div class="right_label_title">
              <p>TO DO</p>
              <img class="todo_uppand_img" v-b-toggle.accordion-1 variant="info" :src='src[currentSrc]' @click='changeImage()'>
            </div>
            <b-collapse id="accordion-1"  accordion="my-accordion" role="tabpanel" class="right_todo">
              <div class="todo_collapse_todo_list" v-for='(item, idx) in list' :key='idx'>
                <a href='#' @click="finish2(idx + '_' + item.name)"><img src='../assets/img/round_radio_button_unchecked_brown_24dp.png'></a>
                <p>{{ item.name }}</p>
                <a href='#' @click='change(item.id)'><img class="todo_list_playicon" src='../assets/img/round_play_circle_filled_brown_24dp.png'></a>
              </div>
            </b-collapse>
          </div>
          <br>
          <div class="todo_collapse_done">
            <div class="right_label_title">
              <p>DONE</p>
              <img class="todo_uppand_img" v-b-toggle.accordion-2 variant="info" :src='src[currentSrc1]' @click='changeImage1()'>
            </div>
            <b-collapse id="accordion-2" accordion="my-accordion" role="tabpanel" class="right_todo">
              <div class="todo_collapse_done_list" v-for='(item, idx) in finished' :key='idx'>
                <a href='#' @click="additem2(idx + '_' + item.name)"><img src='../assets/img/round_check_circle_brown_24dp.png'></a>
                <del>{{ item.name }}</del>
                <div class="circle_group">
                  <img class='circle' src='../assets/img/round_circle_brown_24dp.png'>
                </div>
              </div>
            </b-collapse>
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
      src: [require('../assets/img/baseline_uppand_more_white_24dp.png'), require('../assets/img/baseline_expand_more_white_24dp.png')],
      currentSrc: 0,
      currentSrc1: 0
    }
  },
  computed: {
    list () {
      return this.$store.getters.list.filter(item => {
        if (item.status === false) return true
      })
    },
    finished () {
      return this.$store.state.finished
    }
  },
  methods: {
    additem () {
      this.$store.commit('addList', this.newitem)
      this.newitem = ''
    },
    additem2 (index) {
      this.$store.commit('addList2', index)
    },
    changeImage () {
      if (this.currentSrc < this.src.length - 1) {
        this.currentSrc = this.currentSrc + 1
        this.currentSrc1 = 0
      } else {
        this.currentSrc = 0
      }
    },
    changeImage1 () {
      if (this.currentSrc1 < this.src.length - 1) {
        this.currentSrc1 = this.currentSrc1 + 1
        this.currentSrc = 0
      } else {
        this.currentSrc1 = 0
      }
    },
    finish2 (index) {
      this.$store.commit('addFinish2', index)
    },
    change (index) {
      this.$store.commit('changeOrder', index)
    }
  }
}
</script>
