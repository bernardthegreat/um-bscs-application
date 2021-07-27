<template>
  <div style="width:250px;">
    <q-card>
      <q-form
        @submit="submitQuestion"
        ref="questionForm"
      >
        <q-card-section align="center" class="bg-primary text-white text-h5 text-weight-thin">
          ASK QUESTION
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
          <q-btn :loading="questionsLoading" icon="fa fa-question" color="primary" @click="submitQuestion">
            <span class="q-pl-md">ASK QUESTION</span>
            <template v-slot:loading>
              <q-spinner-hourglass class="on-left" />
              LOADING ...
            </template>
          </q-btn>
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
      question: null,
      questionsLoading: null
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
