<template>
  <div>
    <q-card style="width:450px;">
      <q-form
        class="q-px-sm q-pt-sm q-pb-xs"
        @keydown.enter.prevent="submitQuestion"
        ref="questionForm"
      >
        <q-card-section align="center" class="bg-primary text-white text-h5 text-weight-thin">
          ASK A QUESTION
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="question"
            filled
            type="textarea"
            label="Question"
            :rules="[ val => val && val.length > 0 || 'Please enter your Question']"
          />
        </q-card-section>
        <q-card-actions align="center">
          <q-btn label="Ask Question" type="submit" @click="submitQuestion" color="primary" push></q-btn>
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
export default defineComponent({
  data () {
    return {
      question: null
    }
  },
  methods: {
    async submitQuestion () {
      const questionRequest = {
        name: 'Recitation',
        content: this.question,
        active: '1',
        type: 2
      }
      await this.$store.dispatch('professors/askQuestion', questionRequest)
    }
  }
})
</script>
