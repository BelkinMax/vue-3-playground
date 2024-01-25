<script>
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
  name: 'CreditCardForm',
  setup() {
    const cardNumber = ref(null)
    const cardName = ref(null)
    const errors = ref([true, true])
    const hasErrors = computed(() => {
      return errors.value.some(error => error)
    })

    function validateNumber({ target: el}) {
      if (!el) return
      if (el.value.length === 16) {
        el.style.backgroundColor = 'lightgreen'
        errors.value[0] = false
      } else {
        el.style.backgroundColor = 'antiquewhite'
        errors.value[0] = true
      }
    }

    function validateName({ target: el}) {
      if (!el) return

      if (!el.value || /^[0-9]+$/.test(el.value) || el.value.length < 6) {
        el.style.backgroundColor = 'antiquewhite'
        errors.value[1] = true
      } else {
        el.style.backgroundColor = 'lightgreen'
        errors.value[1] = false
      }
    }

    function focusSubmit(el) {
      if (!el) return

      if (!hasErrors.value) {
        el.disabled = false
        el.focus()
      } else {
        el.disabled = true
      }
    }

    return {
      cardNumber,
      cardName,
      validateNumber,
      validateName,
      focusSubmit
    }
  }
})
</script>

<template>
  <div class="credit-card-form">
    <form @submit.prevent>
      <div class="field">
        <label for="cardNumber">Card Number:</label>
        <input id="cardNumber" type="text" placeholder="1234567890123456" @keydown="validateNumber" />
      </div>
      <div class="field">
        <label for="cardName">Card Holder's Name:</label>
        <input id="cardName" type="text" placeholder="Full Name" @keydown="validateName" />
      </div>

      <button :ref="focusSubmit" type="submit">Submit</button>
    </form>
  </div>
</template>

<style lang="scss" src="./credit-card-form.scss" />
