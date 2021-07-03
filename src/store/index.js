import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const time = parseInt(process.env.VUE_APP_TIME)
const timeBreak = parseInt(process.env.VUE_APP_TIME_BREAK)

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sound: 'NONE.mp3',
    sound1: 'NONE.mp3',
    list: [],
    finished: [],
    current: '',
    timeleft: time,
    isBreak: false,
    // 0 = 停止
    // 1 = 倒數中
    // 2 = 暫停
    maxtime: time,
    maxbreak: timeBreak,
    status: 0,
    music: ''
  },
  mutations: {
    selectWSound (state, data) {
      state.sound = data
    },
    selectBSound (state, data) {
      state.sound1 = data
    },
    addList (state, data) {
      const num = Math.floor(Date.now())
      state.list.push({
        id: num,
        name: data,
        edit: false,
        model: data,
        status: false
      })
    },
    addList2 (state, data) {
      const num = Math.floor(Date.now())
      const name = data.split('_')
      state.finished.splice(name[0], 1)
      state.list.push({
        id: num,
        name: name[1],
        edit: false,
        model: name[1],
        status: false
      })
    },
    start (state) {
      if (state.isBreak) {
        state.current = '休息一下'
        state.music = require('../assets/audio/' + state.sound1)
      } else {
        state.music = require('../assets/audio/' + state.sound)
      }
    },
    changeStatus (state, data) {
      state.status = data
    },
    changeOrder (state, data) {
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].id === data) {
          state.current = state.list[i].name
          state.list[i].status = true
        } else {
          state.list[i].status = false
        }
      }
    },
    countdown (state) {
      state.timeleft--
    },
    addFinish (state) {
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1
      const date = today.getDate()
      const week = today.getDay()
      const d = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
      const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
      if (!state.isBreak) {
        state.finished.push({
          name: state.current,
          year: year,
          month: month,
          date: date,
          week: week,
          weeks: weekNo
        })
      }
      state.current = ''

      if (state.list.length > 0) {
        state.isBreak = !state.isBreak
      }
      state.timeleft = state.isBreak ? timeBreak : time
    },
    addFinish2 (state, data) {
      const name = data.split('_')
      state.list.splice(name[0], 1)
      const today = new Date()
      const year = today.getFullYear()
      const month = today.getMonth() + 1
      const date = today.getDate()
      const week = today.getDay()
      const d = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
      const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
      state.finished.push({
        name: name[1],
        year: year,
        month: month,
        date: date,
        week: week,
        weeks: weekNo
      })
    }
  },
  getters: {
    list (state) {
      return state.list
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState({
      key: 'pomodoro'
    })
  ]
})
