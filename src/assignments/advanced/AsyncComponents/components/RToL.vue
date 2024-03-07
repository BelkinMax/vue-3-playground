<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RToL'
})
</script>

<template>
  <div class="r-to-l">
    <svg width="480" height="480" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_261_37" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="480" height="480">
        <rect x="480" y="480" width="480" height="480" transform="rotate(-180 480 480)" fill="#D9D9D9"/>
      </mask>
      <g mask="url(#mask0_261_37)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M240 240.718L360 310L360 171.436L240 240.718ZM272 240.718L344 282.287L344 199.149L272 240.718Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M120 240.718L240 310L240 171.436L120 240.718ZM152 240.718L224 282.287L224 199.149L152 240.718Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.08524e-06 240.718L120 310L120 171.436L9.08524e-06 240.718ZM32 240.718L104 282.287L104 199.149L32 240.718Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M360 240.718L480 310L480 171.436L360 240.718ZM392 240.718L464 282.287L464 199.149L392 240.718Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M300 240.718L420 310L420 171.436L300 240.718ZM332 240.718L404 282.287L404 199.149L332 240.718Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M180 240.718L300 310L300 171.436L180 240.718ZM212 240.718L284 282.287L284 199.149L212 240.718Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M60 240.718L180 310L180 171.436L60 240.718ZM92 240.718L164 282.287L164 199.149L92 240.718Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M-60 240.718L60 310L60 171.436L-60 240.718ZM-28 240.718L44 282.287L44 199.149L-28 240.718Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M420 240.718L540 310L540 171.436L420 240.718ZM452 240.718L524 282.287L524 199.149L452 240.718Z" fill="#F5E8DD"/>
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.r-to-l {
  display: flex;

  svg {
    aspect-ratio: 1;
    height: 48px;
    width: 48px;
  }
}
</style>