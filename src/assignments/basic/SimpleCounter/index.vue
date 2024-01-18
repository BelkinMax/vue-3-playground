<script>
import { defineComponent } from 'vue'
import { ms } from './helpers/timeHelper.js'
import CountdownSegment from './components/CountdownSegment.vue'

export default defineComponent({
  name: 'SimpleCounter',
  components: {
    CountdownSegment
  },
  setup() {
    const counterDate = null
    const timerData = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0
    }
    let timer = 0
    let timerInterval = null

    onDateInputUpdate()

    function onDateInputUpdate(newValue) {
      resetTimer()

      if (newValue) {
        initTimer(newValue)
      }
    }
    function initTimer(dateValue) {
      const timeLeft = getTimeLeft(dateValue)

      setTimeLeft(timeLeft - timer)
      timer += 1000

      timerInterval = setInterval(() => {
        setTimeLeft(timeLeft - timer)
        timer += 1000
      }, 1000)
    }

    function resetTimer() {
      if (!timerInterval) {
        return
      }

      clearInterval(timerInterval)
      timer = 0
      timerData.days = 0
      timerData.hours = 0
      timerData.minutes = 0
      timerData.seconds = 0
    }

    function getTimeLeft(dateValue) {
      const now = new Date()
      const date = new Date(dateValue)

      return date.getTime() - now.getTime()
    }

    function setTimeLeft(timeLeft = 0) {
      const { getDays, getHours, getMinutes, getSeconds } = ms(timeLeft)

      timerData.days = getDays()
      timerData.hours = getHours()
      timerData.minutes = getMinutes()
      timerData.seconds = getSeconds()
    }

    return {
      counterDate,
      timerData
    }
  }
})
</script>

<template>
  <div class="countdown-box">
    <div class="countdown-clock">
      <CountdownSegment label="days" :number="timerData.days" />
      <CountdownSegment label="hours" :number="timerData.hours" />
      <CountdownSegment label="minutes" :number="timerData.minutes" />
      <CountdownSegment label="seconds" :number="timerData.seconds" />
    </div>
    <input v-model="counterDate" type="datetime-local" class="date-input" />
  </div>
</template>

<style lang="scss" src="./simple-counter.scss" />
