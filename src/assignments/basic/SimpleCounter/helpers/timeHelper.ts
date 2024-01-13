export function ms(ms: number) {
  return {
    getDays(): number {
      return Math.floor(ms / (1000 * 60 * 60 * 24)) || 0
    },
    getHours(): number {
      return Math.floor((ms / (1000 * 60 * 60)) % 24) || 0
    },
    getMinutes(): number {
      return Math.floor((ms / 1000 / 60) % 60) || 0
    },
    getSeconds(): number {
      return Math.floor((ms / 1000) % 60) || 0
    }
  }
}
