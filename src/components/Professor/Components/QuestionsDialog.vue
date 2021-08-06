<template>
  <div>
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
          <q-btn-group>
            <q-btn push :loading="questionsLoading" icon="fa fa-question" color="primary" @click="submitQuestion">
              <span class="q-pl-md">ASK QUESTION</span>
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                LOADING ...
              </template>
            </q-btn>
            <q-btn push :loading="resendLoading" icon="fa fa-paper-plane" color="orange" @click="sendMessageRequest">
              <span class="q-pl-md">RESEND QUESTION</span>
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                LOADING ...
              </template>
            </q-btn>
            <q-btn push :loading="removeLoading" icon="fa fa-times" color="red" @click="removeMessage">
              <span class="q-pl-md">REMOVE QUESTION</span>
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                LOADING ...
              </template>
            </q-btn>
          </q-btn-group>
        </q-card-actions>
      </q-form>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { defineComponent } from 'vue';
export default defineComponent({
  data () {
    return {
      question: null,
      questionsLoading: null,
      resendLoading: null,
      removeLoading: null
    }
  },
  computed: {
    ...mapGetters({
      wsConnection: 'students/wsConnection'
    })
  },
  methods: {
    async submitQuestion () {
      this.$refs.questionForm.validate().then(async valid => {
        if (!valid) {
          this.formHasError = true
        } else {
          this.questionsLoading = true
          const questionRequest = {
            name: 'Recitation',
            content: this.question,
            active: '1',
            type: 2
          }
          const question = await this.$store.dispatch('professors/askQuestion', questionRequest)
          if (question.message !== null) {
            this.triggerSucccess()
            this.sendMessageRequest()
            // this.$emit('closeDialog', false)
          }
        }
      })
    },
    sendToWS (wsMessage) {
      this.wsConnection.send(wsMessage)
    },
    async sendMessageRequest () {
      this.resendLoading = true
      this.sendToWS('other-ws: ask-question')
      this.resendLoading = false
    },
    async removeMessage () {
      this.removeLoading = true
      this.sendToWS('other-ws: close-question-dialog')
      this.removeLoading = false
    },
    triggerSucccess () {
      // we need to get the notification reference
      // otherwise it will never get dismissed ('ongoing' type has timeout 0)
      const notif = this.$q.notify({
        type: 'ongoing',
        message: 'Processing question...'
      })

      // simulate delay
      setTimeout(() => {
        notif({
          type: 'positive',
          message: 'Question successfully sent to the Students',
          timeout: 1000
        })
        this.questionsLoading = false
        this.question = null
      }, 3000)
    },
  }
})
</script>
