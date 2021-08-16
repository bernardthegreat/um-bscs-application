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
              <div>
                <q-btn-group>
                  <q-btn push color="secondary" @click="openDialog" icon="fa fa-hand-sparkles"></q-btn>
                  <q-btn push color="secondary" @click="openSurvey" icon="fa fa-poll-h" v-if="!disableSurveyDialog"></q-btn>
                </q-btn-group>
              </div>
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
                  <q-banner class="bg-cyan text-white">
                    <template v-slot:avatar>
                      <q-icon name="fab fa-google-drive" color="white" />
                    </template>
                    <div>
                      Access your Google Drive 
                      <a :href="studentInformation.googleDrive" target="_blank">here</a>
                    </div>
                  </q-banner>
                </q-card-section>
                <q-card-actions align="center" class="q-pb-md">
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

            <q-expansion-item
              expand-separator
              icon="fa fa-user"
              label="OTHER INFORMATION"
              group="somegroup"
              header-class="bg-green text-white"
              class="shadow-11"
              expand-icon-class="text-white"
              v-if="enableOtherInfo"
            >
              <q-card>
                <q-card-section align="center">
                  <div class="row items-center justify-center">
                    <div class="col-lg-6 col-md-6">
                      <q-card square style="height: 220px;">
                        <q-card-section class="bg-blue-grey text-white text-h5 text-weight-thin" align="center">
                          SURVEY RESULTS
                        </q-card-section>
                        <q-card-section class="items-center">
                          <div v-for="(results, index) in studentInformation.roleResults" :key="index">
                            {{ results.replace(':', ' - ').toUpperCase() }}
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                    <div class="col-lg-6 col-md-6">
                      <q-card square style="height: 220px;">
                        <q-card-section class="bg-blue-grey text-white text-h5 text-weight-thin" align="center">
                          GROUP {{ studentInformation.groupName }}
                        </q-card-section>
                        <q-card-section class="items-center">
                          <div v-for="(groupMembers, index) in this.groupMates" :key="index">
                            {{ groupMembers.last_name.toUpperCase() }}, 
                            {{ groupMembers.first_name.toUpperCase() }} 
                            {{ groupMembers.middle_name === null ? '' : groupMembers.middle_name.toUpperCase() }} -
                            {{ groupMembers.final_role.toUpperCase() }}
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>
                <q-card-section>
                  <q-input
                    outlined
                    v-model="studentInformation.firstRole"
                    label="First Role"
                    hint=""
                    readonly
                    :rules="[ val => val && val.length > 0 || 'Please enter your desired First Role']"
                  />
                  <q-input
                    outlined
                    v-model="studentInformation.secondRole"
                    label="Second Role"
                    hint=""
                    readonly
                    :rules="[ val => val && val.length > 0 || 'Please enter your desired Second Role']"
                  />
                  <q-input
                    outlined
                    v-model="studentInformation.thirdRole"
                    label="Third Role"
                    hint=""
                    readonly
                    :rules="[ val => val && val.length > 0 || 'Please enter your desired Third Role']"
                  />
                  <q-input
                    outlined
                    v-model="studentInformation.fourthRole"
                    label="Fourth Role"
                    hint=""
                    readonly
                    :rules="[ val => val && val.length > 0 || 'Please enter your desired Fourth Role']"
                  />
                  <q-input
                    outlined
                    v-model="studentInformation.finalRole"
                    label="Official Role"
                    hint=""
                    readonly
                    :rules="[ val => val && val.length > 0 || 'Please enter your desired Final Role']"
                  />
                  <!-- <q-select
                    outlined
                    v-model="studentInformation.finalRole"
                    :options="roles"
                    label="Official Role"
                    hint=""
                    :rules="[ val => val && val.length > 0 || 'Please enter your desired Third Role']"
                  /> -->
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-card-section>
          <q-inner-loading :showing="this.studentLoading">
            <q-spinner-ball size="90px" color="primary" />
          </q-inner-loading>
        </q-card>
        <q-dialog v-model="recitationDialog">
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
              <q-card-section v-if="currentAnswer !== null">
                <q-banner class="bg-green text-white">
                  <template v-slot:avatar>
                    <q-icon name="fa fa-check" color="white" />
                  </template>
                  CURRENT ANSWER: {{ this.currentAnswer }}
                </q-banner>
              </q-card-section>
              <q-card-section v-if="errorRecitation !== null">
                {{ this.errorRecitation }}
              </q-card-section>
              <q-card-actions align="center">
                <q-btn type="submit" @click="submitAnswer" label="Submit Answer" color="primary" push icon="fa fa-reply"></q-btn>
              </q-card-actions>
              <q-inner-loading :showing="this.cardLoading">
                <q-spinner-gears size="50px" color="primary" />
              </q-inner-loading>
            </q-form>
          </q-card>
        </q-dialog>
        <q-dialog v-model="surveyDialog">
          <div style="width:1300px;max-width:1600px;">
            <div>
              <q-card>
                <q-card-section class="bg-primary text-h5 text-weight-thin text-white" align="center">
                  SURVEY
                </q-card-section>
                <q-card-section>
                  <div class="row justify-center q-col-gutter-md">
                    <div class="col-lg-4" v-bind:key="key" v-for="(questions, key) in this.questionsArray">
                      <q-card class="q-ma-md" style="height:225px;">
                        <q-card-section align="center" class="bg-green text-white">
                          <div class="text-h6 text-weight-thin">
                            {{ questions.question.toUpperCase() }}
                          </div>
                        </q-card-section>
                        <q-card-section align="center" class="q-pt-lg">
                          <div>
                            <q-radio size="lg" keep-color v-model="questions.isActive" :val="true" label="Yes" color="green" />
                            <q-radio size="lg" keep-color v-model="questions.isActive" :val="false" label="No" color="red" />
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>
                </q-card-section>
                <q-card-section v-if="surveyError !== null">
                  <div class="row justify-center">
                    <div class="col-lg-3 col-xs-12 col-sm-12">
                      <q-banner rounded class="bg-negative text-white">
                        <template v-slot:avatar>
                          <q-icon name="fa fa-times" color="white" />
                        </template>
                        {{ surveyError.toUpperCase() }}
                      </q-banner>
                    </div>
                  </div>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn push icon="fa fa-save" color="green" label="Submit Survey" @click="submitSurvey"></q-btn>
                </q-card-actions>
                <q-card-section align="center" v-if="surveyLoading">
                  <div class="text-h5 text-weight-thin">
                    PROCESSING SURVEY
                  </div>
                </q-card-section>
                <q-inner-loading :showing="this.surveyLoading">
                  <q-spinner-gears size="50px" color="primary" />
                </q-inner-loading>
              </q-card>
            </div>
          </div>
        </q-dialog>

        <q-dialog v-model="roleDialog">
          <q-card style="width:450px;">
            <q-card-section class="bg-primary text-white text-h5 text-weight-thin"  align="center">
              YOUR ROLE
            </q-card-section>
            <q-card-section class="text-h5 text-weight-thin" align="center">
              <div v-if="studentInformation.finalRole !== null">
                CONGRATULATIONS YOU ARE A {{ studentInformation.finalRole === null ? '' : studentInformation.finalRole.toUpperCase() }} !
              </div>
            </q-card-section>
            <q-inner-loading :showing="this.roleLoading">
              <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>
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
import PinnedAnnouncements from 'src/components/Announcements/PinnedAnnouncements.vue'
import OtherAnnouncements from 'src/components/Announcements/OtherAnnouncements.vue'
import Survey from 'src/assets/files/survey.json'
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
export default defineComponent({
  components: { PinnedAnnouncements, OtherAnnouncements },
  props: ['studentInfo'],
  name: 'StudentDashboard',
  data () {
    return {
      color: null,
      surveyDialog: null,
      recitationDialog: null,
      recitationQuestion: null,
      recitationAnswer: null,
      currentAnswer: null,
      items: [],
      cardLoading: null,
      studentLoading: null,
      updateLoading: null,
      surveyLoading: null,
      disableSurveyDialog: null,
      disableRecitation: false,
      enableOtherInfo: false,
      roleDialog: false,
      roleName: null,
      roleLoading: false,
      errorRecitation: null,
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
        fullName: null,
        firstRole: null,
        secondRole: null,
        thirdRole: null,
        fourthRole: null,
        finalRole: null,
        roleResults: null,
        groupName: null,
        googleDrive: null,
        answer: null
      },
      questionsArray: Survey,
      surveyError: null,
      roles: [
        "System Analyst",
        "UI / UX Designer",
        "Programmer",
        "Debugger or Tester",
        "Researcher"
      ]
    }
  },
  watch: {
    async recitationDialog (val) {
      if (val) {
        this.cardLoading = true
        // await this.$store.dispatch('announcements/getAnnouncements')
        this.recitationQuestion = this.question[0].content
        this.currentAnswer = this.studentInformation.answer
        this.cardLoading = false
      }
    },
    studentInfo: {
      async handler (val) {
        // console.log(val, 'val')
      },
      deep: true
    },
    async roleDialog (val) {
      if (val) {
        await this.$emit('getStudents')
        this.roleLoading = true
        setTimeout(async () => {
          await this.formatStudentInfo()
          this.enableOtherInfo = true
          this.roleLoading = false
        }, 3500)
      }
    }
  },
  computed: {
    ...mapGetters({
      question: 'announcements/question',
      pinnedAnnouncements: 'announcements/pinnedAnnouncements',
      otherAnnouncements: 'announcements/otherAnnouncements',
      configurations: 'configurations/configurations',
      wsConnection: 'students/wsConnection',
      groupMates: 'students/groupMates'
    })
  },
  async created () {
    this.getAnnouncements()
    this.recitationDialog = false
    this.getConfiguration()
    this.shuffleSurvey()
    this.studentLoading = true
    setTimeout(async () => {
      await this.formatStudentInfo()
      // await this.checkWSMessages()
    }, 3500)
  },
  methods: {
    // async checkWSMessages () {
    //   if (this.wsConnection !== null) {
    //     this.wsConnection.onmessage = async (data) => {
    //       const split = data.data.split(': ')
    //       // console.log(split)
    //       if (split[0] === 'other-ws') {
    //         if (split[1] === 'ask-question') {
    //           this.openDialog()
    //         } else if (split[1] === 'close-question-dialog') {
    //           this.recitationDialog = false
    //         } else if (split[1] === `show-roles`) {
    //           this.roleDialog = true
    //         }
    //       }
    //     }
    //   }
    // },
    openDialog () {
      this.recitationDialog = true
    },
    openSurvey () {
      this.surveyDialog = true
    },
    async submitSurvey () {
      const filterNull = this.questionsArray.filter((result) => result.isActive === null)
      if (filterNull.length > 0) {
        this.surveyError = 'Please answer all questions'
      } else {
        this.surveyLoading = true
        this.surveyError = null
        const filterYesAnswers = this.questionsArray.filter((result) => result.isActive)
        const systemAnalyst = filterYesAnswers.filter((result) => result.role === 'system_analyst')
        const uiUXDesigner = filterYesAnswers.filter((result) => result.role === 'ui_ux_designer')
        const programmer = filterYesAnswers.filter((result) => result.role === 'programmer')
        const debuggerOrTester = filterYesAnswers.filter((result) => result.role === 'debugger_or_tester')
        const researcher = filterYesAnswers.filter((result) => result.role === 'researcher')

        var systemAnalystScore = 0
        for (let i = 0; i < systemAnalyst.length; i++) {
          systemAnalystScore += systemAnalyst[i].score;
          systemAnalyst.overallScore = systemAnalystScore
          systemAnalyst.name = 'System Analyst'
        }

        var uiUXDesignerScore = 0
        for (let i = 0; i < uiUXDesigner.length; i++) {
          uiUXDesignerScore += uiUXDesigner[i].score;
          uiUXDesigner.overallScore = uiUXDesignerScore
          uiUXDesigner.name = 'UI / UX Designer'
        }

        var programmerScore = 0
        for (let i = 0; i < programmer.length; i++) {
          programmerScore += programmer[i].score;
          programmer.overallScore = programmerScore
          programmer.name = 'Programmer'
        }

        var debuggerOrTesterScore = 0
        for (let i = 0; i < debuggerOrTester.length; i++) {
          debuggerOrTesterScore += debuggerOrTester[i].score;
          debuggerOrTester.overallScore = debuggerOrTesterScore
          debuggerOrTester.name = 'Debugger or Tester'
        }

        var researcherScore = 0
        for (let i = 0; i < researcher.length; i++) {
          researcherScore += researcher[i].score;
          researcher.overallScore = researcherScore
          researcher.name = 'Researcher'
        }
        const surveyResult = [
          systemAnalyst,
          uiUXDesigner,
          programmer,
          debuggerOrTester,
          researcher
        ]
        const survey = await this.$store.dispatch('survey/computeSurvey', surveyResult)
        if (survey.message !== null) {
          this.$emit('getStudents')
          this.disableSurveyDialog = true
          this.triggerSurveySucccess()
        }
      }
    },
    async shuffleSurvey () {
      for (let i = Survey.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [Survey[i], Survey[j]] = [Survey[j], Survey[i]];
      }
    },
    async getConfiguration () {
      await this.$store.dispatch('configurations/getConfigurations')
      const recitation = this.configurations.filter((result) => result.name === 'students_recitation')
      if (!recitation[0].active) {
        this.disableRecitation = true
      }
    },
    async getAnnouncements () {
      this.cardLoading = true
      await this.$store.dispatch('announcements/getAnnouncements')
      this.cardLoading = false
    },
    removeRole (index) {
      const shallowCopyArray = Array.from(this.roles)
      shallowCopyArray.splice(index, 1)
      this.roles = shallowCopyArray
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
        this.studentInformation.firstRole = this.studentInfo[0].first_role
        this.studentInformation.secondRole = this.studentInfo[0].second_role
        this.studentInformation.thirdRole = this.studentInfo[0].third_role
        this.studentInformation.fourthRole = this.studentInfo[0].fourth_role
        this.studentInformation.finalRole = this.studentInfo[0].final_role
        this.studentInformation.roleResults = this.studentInfo[0].role_results
        this.studentInformation.groupName = this.studentInfo[0].group_name
        this.studentInformation.googleDrive = this.studentInfo[0].google_drive
        this.studentInformation.answer = this.studentInfo[0].answer
        this.studentLoading = false
        if (this.studentInformation.finalRole !== null) {
          this.enableOtherInfo = true
        }
        if (this.studentInfo[0].role_results !== null) {
          this.disableSurveyDialog = true
        }
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
          if (answer.message !== null) {
            this.errorRecitation = null
            this.recitationDialog = false
          } else {
            this.errorRecitation = answer.error
          }
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
    triggerSurveySucccess () {
      // we need to get the notification reference
      // otherwise it will never get dismissed ('ongoing' type has timeout 0)
      const notif = this.$q.notify({
        type: 'ongoing',
        message: 'Saving survey...'
      })

      // simulate delay
      setTimeout(() => {
        notif({
          type: 'positive',
          message: 'Student successfully completed this Survey!',
          timeout: 1000
        })
        this.surveyLoading = false
        this.surveyDialog = false
      }, 3000)
    },
  }
})
</script>