export function ms(ms) {
  return {
    getDays() {
      return Math.floor(ms / (1000 * 60 * 60 * 24))
    },
    getHours() {
      return Math.floor((ms / (1000 * 60 * 60)) % 24)
    },
    getMinutes() {
      return Math.floor((ms / 1000 / 60) % 60)
    },
    getSeconds() {
      return Math.floor((ms / 1000) % 60)
    }
  }
}
