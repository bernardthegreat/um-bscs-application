<template>
  <div>
    <q-card square>
      <q-card-section>
        <q-card
          square
          v-for="(pinned, index) in this.pinnedAnnouncements"
          :key="index"
          class="q-mt-md">
          <q-card-section class="bg-primary text-white">
            <div class="row justify-between">
              <div>
                {{ pinned.name }}
              </div>
              <div>
                {{ pinned.createdDateTime }}
              </div>
            </div>
          </q-card-section>
          <q-card-section>
            <div v-html="pinned.content">
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
  props: ['pinnedAnnouncements'],
  name: 'PinnedAnnouncements'
})

</script>
