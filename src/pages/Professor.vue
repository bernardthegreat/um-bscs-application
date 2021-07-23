<template>
  <q-page
    class="window-height row justify-center items-center"
  >
    <login></login>
  </q-page>
</template>

<script>
import Login from 'src/components/Professor/Login.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { Login },
  name: 'Professor'
})
</script>
