<template>
  <div class="col-lg-12 col-md-12 col-xs-12 q-pa-lg">
    <div>
      <q-card class="card-border-primary">
        <q-card-section>
          <q-card>
            <q-card-section class=" bg-primary">
              <div class="row justify-between">
                <div class="text-h5 text-white text-weight-thin">
                  UM BSCS STUDENT APPLICATION STUDENT DASHBOARD
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>
      </q-card>
      <q-dialog v-model="recitationDialog" persistent>
        <q-card style="width:450px;">
          <q-form
            @submit="submitAnswer"
            ref="answerForm"
          >
            <q-card-section class="bg-primary">
              <div class="row justify-between">
                <div class="text-left text-h5 text-white text-weight-thin">
                  <q-icon name="fas fa-hospital-user" class="q-pr-md"></q-icon>
                  RECITATION
                </div>
              </div>
            </q-card-section>
            <q-card-section>
              {{ this.recitationQuestion }}
            </q-card-section>
            <q-card-section>
              <q-input
                v-model="recitationAnswer"
                filled
                type="textarea"
                label="Answer"
                :rules="[ val => val && val.length > 0 || 'Please enter your Answer']"
              />
            </q-card-section>
            <q-card-actions align="center">
              <q-btn type="submit" @click="submitAnswer" label="Submit Answer" color="primary" push icon="fa fa-reply">
              </q-btn>
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'StudentDashboard',
  data () {
    return {
      recitationDialog: null,
      recitationQuestion: null,
      recitationAnswer: null,
      items: []
    }
  },
  watch: {
    async recitationDialog (val) {
      if (val) {
        await this.$store.dispatch('announcements/getAnnouncements')
        this.recitationQuestion = this.question[0].content
      }
    }
  },
  computed: {
    ...mapGetters({
      question: 'announcements/question'
    })
  },
  async mounted () {
    this.recitationDialog = false
    
    Pusher.logToConsole = true;
    var pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: 'ap1'
    });
    var channel = pusher.subscribe('my-channel');
    var self = this
    channel.bind('my-event', async function(data) {
      if (data.message === 'recitation') {
        self.recitationDialog = true
      } else {
        self.recitationDialog = FALSE
      }
    });

  },
  methods: {
    submitAnswer () {
      this.recitationDialog = false
    }
  }
})
</script>