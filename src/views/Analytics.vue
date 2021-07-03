<template>
<div class="analytics">
  <div class="container">
    <div class="row-1">
      <div class="col-15">
        <div class="pomodo_title">
          <div class="pomodo_title_group">
            <p>ANALYTICS</p>
          </div>
        </div>
        <div class="pomodo_content">
          <div class="analytics_focustime">
            <div class="right_label_title">
              <p>FOCUS TIME</p>
            </div>
            <div class="analytics_focustime_content">
              <div class="analytics_focustime_content_title">
                <div class="today">TODAY</div>
                <div class="week">WEEK</div>
              </div>
              <div class="analytics_focustime_content_data">
                <div class="today_data">
                  <p class="tomato_num" v-if='today.length !== ""'>{{ today.length }}</p>
                  <p class="tomato_num" v-else>0</p>
                  <p class="tomato_name">/TOMATO</p>
                </div>
                <div class="week_data">
                  <p class="tomato_num" v-if='week.length !== ""'>{{ week.length }}</p>
                  <p class="tomato_num" v-else>0</p>
                  <p class="tomato_name">/TOMATO</p></div>
              </div>
            </div>
          </div>
          <div class="analytics_chart">
            <div class="right_label_title">
              <p>CHART</p>
            </div>
            <div class="right_chart">
              <apexchart width="737.5" height="320" type="bar" :options="options" :series="series"></apexchart>
            </div>
            <div class="year">
              <p>{{ Nyear }}</p>
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
  name: 'analytics',
  data () {
    return {
      Nyear: new Date().getFullYear(),
      series: [
        {
          name: 'Data1',
          data: [90, 45, 80, 63, 90, 45, 80, 63, 90, 45, 80, 63]
        }
      ],
      options: {
        xaxis: {
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        }
      }
    }
  },
  computed: {
    today () {
      return this.$store.state.finished.filter(item => {
        if (item.year === new Date().getFullYear() && item.month === new Date().getMonth() + 1 && item.date === new Date().getDate()) return true
      })
    },
    week () {
      const today = new Date()
      const d = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
      const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
      const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7)
      return this.$store.state.finished.filter(item => {
        if (item.year === today.getFullYear() && item.weeks === weekNo) return true
      })
    }
  }
  // async mounted () {
  //   try {
  //     this.series[0].data = this.$store.state.finished.map(item => {
  //       return { y: item.count, x: item.month }
  //     })
  //   } catch (error) {
  //     alert('錯誤')
  //   }
  // }
}
</script>
