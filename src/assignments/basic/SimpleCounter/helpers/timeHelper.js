export function ms(ms) {
  return {
    getDays() {
      return Math.floor(ms / (1000 * 60 * 60 * 24)) || 0
    },
    getHours() {
      return Math.floor((ms / (1000 * 60 * 60)) % 24) || 0
    },
    getMinutes() {
      return Math.floor((ms / 1000 / 60) % 60) || 0
    },
    getSeconds() {
      return Math.floor((ms / 1000) % 60) || 0
    }
  }
}
