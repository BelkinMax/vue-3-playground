<script>
import { defineComponent } from 'vue';
import EmptyCell from './components/EmptyCell.vue';

export default defineComponent({
  name: 'AsyncComponents',
  components: {
    EmptyCell
  },
  setup() {
    const AVAILABLE_DIRECTIONS = ['up' ,'right', 'bottom', 'left'];
    const directions = {
      left: { right: 'LToR', up: 'LToU', bottom: 'LToB' },
      right: { left: 'RToL', bottom: 'RToB', up: 'RToU' },
      up: { down: 'UToB', right: 'UToR', left: 'UToL' },
      bottom: { up: 'BToU', left: 'BToL', right: 'BToR' }
    };
    function getRandomDirection () {
      return AVAILABLE_DIRECTIONS[Math.floor(Math.random() * AVAILABLE_DIRECTIONS.length)]
    }
    function getRandomDirectionComponent() {
      const fromDirection = getRandomDirection();
      const toDirection = getRandomDirection();
      const path = `./components/${directions[fromDirection][toDirection]}.vue`;

      return loadComponent(path);
    }

    /*
    *  TODO:
    *  Implement loadComponent function that returns a component by path
    *  If the path is invalid use a EmptyCell
    *  The components that are not used should not be imported
    *
    *  BONUS: Implement composable
    *
    *  const { getByPath } = useDirectionComponent(FallbackComponent)
    *
    *  and move all the direction component related logic there
    * */

    function loadComponent (path) {
      return EmptyCell
    }

    return {
      getRandomDirectionComponent
    }
  }
})
</script>

<template>
  <div class="grid-wrapper">
    <div class="grid">
      <div v-for="row in 10" :key="row" class="grid-row">
        <span v-for="col in 10" :key="`${row}-${col}`" class="grid-element">
          <component :is="getRandomDirectionComponent()" />
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .grid {
    display: flex;
    flex-direction: column;
    padding: 10px;
    background-color: #F5E8DD;

    .grid-row {
      display: flex;

      .grid-element {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 48px;
        width: 48px;
        overflow: hidden;
        background-color: #B5C0D0;
      }
    }
  }
}
</style>