<template>
  <div>
    <q-card square>
      <q-card-section>
        <q-card
          square
          v-for="(pinned, index) in this.otherAnnouncements"
          :key="index"
          class="q-mt-md">
          <q-card-section class="bg-primary text-white">
            <div class="row justify-between">
              <div>
                {{ pinned.name }}
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div v-html="pinned.content">
            </div>
          </q-card-section>
          <q-card-section class="bg-primary text-white">
            <div>
              Posted on: {{ pinned.createdDateTime }}
            </div>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
export default defineComponent({
  props: ['otherAnnouncements'],
  name: 'otherAnnouncements'
})

</script>
