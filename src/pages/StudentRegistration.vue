<template>
  <q-page>
    <registration />
  </q-page>
</template>

<script>
import Registration from "src/components/Students/Registration.vue";
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StudentRegistration',
  components: { Registration }
})
</script>