<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'RToB'
})
</script>

<template>
  <div class="r-to-b">
    <svg width="480" height="480" viewBox="0 0 480 480" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="mask0_261_37" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="-1" width="480" height="481">
        <rect x="480" y="480" width="480" height="480" transform="rotate(-180 480 480)" fill="#D9D9D9"/>
      </mask>
      <g mask="url(#mask0_261_37)">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M242.045 256.248L375.888 292.111L340.025 158.269L242.045 256.248ZM272.955 247.966L353.26 269.484L331.742 189.178L272.955 247.966Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M360 240.718L480 310L480 171.436L360 240.718ZM392 240.718L464 282.287L464 199.149L392 240.718Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M300 240.718L420 310L420 171.436L300 240.718ZM332 240.718L404 282.287L404 199.149L332 240.718Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M197.573 323.145L331.415 287.282L233.436 189.303L197.573 323.145ZM220.2 300.518L300.506 279L241.718 220.212L220.2 300.518Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M224.188 417.956L322.168 319.976L188.325 284.113L224.188 417.956ZM232.47 387.046L291.258 328.258L210.952 306.741L232.47 387.046Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M239.718 540L309 420L170.436 420L239.718 540ZM239.718 508L281.287 436L198.149 436L239.718 508Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M239.718 480L309 360L170.436 360L239.718 480ZM239.718 448L281.287 376L198.149 376L239.718 448Z" fill="#F5E8DD"/>
        <path fill-rule="evenodd" clip-rule="evenodd" d="M420 240.718L540 310L540 171.436L420 240.718ZM452 240.718L524 282.287L524 199.149L452 240.718Z" fill="#F5E8DD"/>
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.r-to-b {
  display: flex;

  svg {
    aspect-ratio: 1;
    height: 48px;
    width: 48px;
  }
}
</style>