<template>
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { useQuasar } from 'quasar';

export default defineComponent({
  name: 'App',
  setup() {
    const $q = useQuasar();
    void $q.bex.send('getProducts');
  },
});
</script>

<style>
.menu {
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 13px;
  color: #aaaaaa;

  max-width: 250px;
  width: 250px;
  background: #fafafa;
  margin-top: 8px !important;
  padding: 19px 7px 19px 31px;
  border-radius: 10px;
  box-shadow: -5px -5px 20px #ffffff, 5px 5px 20px rgba(174, 174, 192, 0.5);
}

.menu-title {
  font-weight: bold;
  font-size: 16px;

  color: #666666;
}

.menu-item {
  padding: 0;
}

.menu-item:not(.menu-title) {
  padding-left: 10px;
}

.menu-item.selected {
  font-weight: bold;
  color: #666666;
}
</style>
