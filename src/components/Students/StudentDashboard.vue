<template>
  <div class="row q-pa-lg q-col-gutter-md">
    <div class="col-lg-8 col-md-12 col-xs-12">
      <div>
        <q-card square class="card-border-primary">
          <q-card-section class=" bg-primary">
            <div class="row justify-between">
              <div class="text-h5 text-white text-weight-thin">
                UM BSCS STUDENT APPLICATION STUDENT DASHBOARD
              </div>
              <!-- <div>
                <q-btn color="secondary" @click="openDialog" icon="fa fa-hand-sparkles"></q-btn>
              </div> -->
            </div>
          </q-card-section>
          <q-card-section>
            <q-expansion-item
              expand-separator
              icon="fa fa-user"
              label="STUDENT INFORMATION"
              group="somegroup"
              default-opened
              header-class="bg-green text-white"
              class="shadow-11"
              expand-icon-class="text-white"
            >
              <q-card>
                <q-card-section>
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="studentInformation.studentNo"
                    label="Student #"
                    autocomplete="off"
                    readonly
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="studentInformation.lastName"
                    label="Last Name"
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="studentInformation.firstName"
                    label="First Name"
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="studentInformation.middleName"
                    label="Middle Name"
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    label="Email Address"
                    hint=""
                    color="primary"
                    autocomplete="off"
                    v-model="studentInformation.emailAddress"
                    :rules="[ val => val && val.length > 0 || 'Please enter your Email', isValidEmail]"
                  />
                  <q-input
                    outlined
                    square
                    ref="birthdate"
                    v-model="studentInformation.birthdate"
                    mask="date"
                    :rules="['date']"
                    label="Birthdate"
                    hint=""
                    autocomplete="off"
                  >
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="studentInformation.birthdate">
                            <div class="row items-center justify-end">
                              <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                          </q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                  <q-input
                    outlined
                    square
                    type="number"
                    hint=""
                    color="primary"
                    v-model="studentInformation.contactNumber"
                    label="Contact Number"
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="studentInformation.fbLink"
                    label="FB Link"
                    autocomplete="off"
                  />
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn 
                    :loading="updateLoading"
                    icon="fas fa-user-edit"
                    color="orange"
                    @click="updateStudent"
                    type="button"
                  >
                    <span class="q-pl-md">UPDATE STUDENT INFO</span>
                    <template v-slot:loading>
                      <q-spinner-hourglass class="on-left" />
                      LOADING ...
                    </template>
                  </q-btn>
                </q-card-actions>
              </q-card>
            </q-expansion-item>
          </q-card-section>
          <q-inner-loading :showing="this.studentLoading">
            <q-spinner-ball size="90px" color="primary" />
          </q-inner-loading>
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
                <q-banner class="bg-orange text-white">
                  <template v-slot:avatar>
                    <q-icon name="fa fa-question-circle" color="white" />
                  </template>
                  {{ this.recitationQuestion }}
                </q-banner>
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
              <q-inner-loading :showing="this.cardLoading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>
            </q-form>
          </q-card>
        </q-dialog>
      </div>
    </div>
    <div class="col-lg-4 col-md-12 col-xs-12">
      <q-card square class="card-border-primary">
        <q-card-section class=" bg-primary">
          <div class="row justify-between">
            <div class="text-h5 text-white text-weight-thin">
              ANNOUNCEMENTS
            </div>
            <!-- <div>
              <q-btn color="secondary" @click="openDialog" icon="fa fa-hand-sparkles"></q-btn>
            </div> -->
          </div>
        </q-card-section>
        <q-card-section>
          <q-expansion-item
            expand-separator
            icon="fa fa-thumbtack"
            label="PINNED ANNOUNCEMENTS"
            group="announcementGroup"
            default-opened
            header-class="bg-secondary text-white"
            class="shadow-11 q-ma-md"
            expand-icon-class="text-white"
            v-if="this.pinnedAnnouncements.length > 0"
          >
            <pinned-announcements :pinnedAnnouncements="pinnedAnnouncements"></pinned-announcements>
          </q-expansion-item>
          
          <q-expansion-item
            expand-separator
            icon="fa fa-bullhorn"
            label="OTHER ANNOUNCEMENTS"
            group="otherAnnouncementGroup"
            default-opened
            header-class="bg-secondary text-white"
            class="shadow-11 q-ma-md"
            expand-icon-class="text-white"
            v-if="this.otherAnnouncements.length > 0"
          >
            <other-announcements :otherAnnouncements="otherAnnouncements"></other-announcements>
          </q-expansion-item>
        </q-card-section>
        <q-card-section align="center" v-if="cardLoading">
          <div class="text-h5 text-weight-thin">
            LOADING ANNOUNCEMENTS
          </div>
        </q-card-section>
        <q-inner-loading :showing="this.cardLoading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card>
    </div>
  </div>
</template>

<script>
import OtherAnnouncements from 'src/components/Announcements/OtherAnnouncements.vue';
import PinnedAnnouncements from 'src/components/Announcements/PinnedAnnouncements.vue';
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  components: { PinnedAnnouncements, OtherAnnouncements },
  props: ['studentInfo'],
  name: 'StudentDashboard',
  data () {
    return {
      recitationDialog: null,
      recitationQuestion: null,
      recitationAnswer: null,
      items: [],
      cardLoading: null,
      studentLoading: null,
      updateLoading: null,
      studentInformation: {
        studentNo: null,
        firstName: null,
        middleName: null,
        lastName: null,
        contactNumber: null,
        emailAddress: null,
        fbLink: null,
        hashKey: null,
        birthdate: null,
        fullName: null
      },
    }
  },
  watch: {
    async recitationDialog (val) {
      if (val) {
        this.cardLoading = true
        await this.$store.dispatch('announcements/getAnnouncements')
        this.recitationQuestion = this.question[0].content
        this.cardLoading = false
      }
    }
  },
  computed: {
    ...mapGetters({
      question: 'announcements/question',
      pinnedAnnouncements: 'announcements/pinnedAnnouncements',
      otherAnnouncements: 'announcements/otherAnnouncements'
    })
  },
  async created () {
    this.getAnnouncements()
    this.recitationDialog = false
    
    Pusher.logToConsole = true;
    var pusher = new Pusher(process.env.PUSHER_KEY, {
      cluster: 'ap1'
    });
    var channel = pusher.subscribe('my-channel');
    var self = this
    channel.bind('my-event', async function(data) {
      if (data.message === 'recitation') {
        self.recitationAnswer = null
        self.recitationDialog = true
      } else if (data.message === 'remove-recitation') {
        self.recitationAnswer = null
        self.recitationDialog = false
      } else {
        self.recitationDialog = false
      }
    });
    
    this.studentLoading = true
    setTimeout(async () => {
      await this.formatStudentInfo()
    }, 2000)
  },
  methods: {
    async getAnnouncements () {
      this.cardLoading = true
      await this.$store.dispatch('announcements/getAnnouncements')
      this.cardLoading = false
    },
    formatStudentInfo () {
      if (this.studentInfo.length > 0) {
        this.studentInformation.studentNo = this.studentInfo[0].student_id
        this.studentInformation.firstName = this.studentInfo[0].first_name
        this.studentInformation.middleName = this.studentInfo[0].middle_name
        this.studentInformation.lastName = this.studentInfo[0].last_name
        this.studentInformation.contactNumber = this.studentInfo[0].contact_number
        this.studentInformation.emailAddress = this.studentInfo[0].email_address
        this.studentInformation.fbLink = this.studentInfo[0].fb_link
        this.studentInformation.hashKey = this.studentInfo[0].hash_key
        this.studentInformation.birthdate = this.studentInfo[0].birthdate
        this.studentInformation.fullName = this.studentInfo[0].fullName
        this.studentLoading = false
      }
    },
    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    },
    submitAnswer () {
      this.$refs.answerForm.validate().then(async valid => {
        if (valid) {
          const answerInfo = {
            studentNo: this.studentInformation.studentNo,
            question: this.recitationQuestion,
            answer: this.recitationAnswer
          }
          const answer = await this.$store.dispatch('students/answerQuestion', answerInfo) 

          this.recitationDialog = false
        }
      })
    },
    
    async updateStudent () {
      try {
        this.updateLoading = true
        const updateStudent = await this.$store.dispatch('students/updateStudentProfile', this.studentInformation)
        if (updateStudent.message !== null) {
          this.$emit('getStudents')
          this.triggerSucccess()
        }
      } catch (error) {
        console.log(error)
      }
    },
    triggerSucccess () {
      // we need to get the notification reference
      // otherwise it will never get dismissed ('ongoing' type has timeout 0)
      const notif = this.$q.notify({
        type: 'ongoing',
        message: 'updating student...'
      })

      // simulate delay
      setTimeout(() => {
        notif({
          type: 'positive',
          message: 'Student successfully updated!',
          timeout: 1000
        })
        this.updateLoading = false
      }, 3000)
    },
  }
})
</script>