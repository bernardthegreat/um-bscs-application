<template>
  <div class="col-lg-12 col-md-12 col-xs-12 q-pa-lg">
    <div>
      <q-card square class="card-border-primary">
        <q-card-section class=" bg-primary">
          <div class="row justify-between">
            <div class="text-h5 text-white text-weight-thin">
              UM BSCS STUDENT APPLICATION STUDENT GRADING
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row justify-center items-center">
            <div class="col-lg-12">
              <q-card>
                <q-card-section class="bg-blue text-h5 text-weight-thin text-white" align="center">
                  STUDENT GRADING
                </q-card-section>
                <q-expansion-item
                  expand-separator
                  icon="fa fa-check"
                  label="PRELIM"
                  group="announcementGroup"
                  default-opened
                  header-class="bg-light-blue text-white"
                  class="shadow-11"
                  expand-icon-class="text-white"
                >
                  <q-card-section class="" align="center">
                    <div class="row">
                      <div class="col-6">
                        PRELIM QUIZ
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.prelimQuiz }}
                      </div>
                      <div class="col-6">
                        PRELIM CLASS STANDING
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.prelimStanding }}
                      </div>
                      <div class="col-6">
                        PRELIM SCORE
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.prelimScore }}
                      </div>
                      <div class="col-6">
                        PRELIM REMARKS
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.prelimRemarks }}
                      </div>
                      <div class="col-6">
                        TOTAL PRELIM GRADE
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.prelimGrade }}
                      </div>
                    </div>
                  </q-card-section>
                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  icon="fa fa-check"
                  label="MIDTERM"
                  group="announcementGroup1"
                  default-opened
                  header-class="bg-cyan text-white"
                  class="shadow-11"
                  expand-icon-class="text-white"
                >
                  <q-card-section class="" align="center">
                    <div class="row">
                      <div class="col-6">
                        MIDTERM QUIZ
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.midtermQuiz }}
                      </div>
                      <div class="col-6">
                        MIDTERM CLASS STANDING
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.midtermStanding }}
                      </div>
                      <div class="col-6">
                        MIDTERM SCORE
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.midtermScore }}
                      </div>
                      <div class="col-6">
                        MIDTERM REMARKS
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.midtermRemarks }}
                      </div>
                      <div class="col-6">
                        TOTAL MIDTERM GRADE
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.midtermGrade }}
                      </div>
                    </div>
                  </q-card-section>
                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  icon="fa fa-check"
                  label="FINAL"
                  group="announcementGroup2"
                  default-opened
                  header-class="bg-teal text-white"
                  class="shadow-11"
                  expand-icon-class="text-white"
                >
                  <q-card-section class="" align="center">
                    <div class="row">
                      <div class="col-6">
                        FINAL QUIZ
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.finalQuiz }}
                      </div>
                      <div class="col-6">
                        FINAL CLASS STANDING
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.finalStanding }}
                      </div>
                      <div class="col-6">
                        FINAL SCORE
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.finalScore }}
                      </div>
                      <div class="col-6">
                        FINAL REMARKS
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.finalRemarks }}
                      </div>
                      <div class="col-6">
                        TOTAL FINAL GRADE
                      </div>
                      <div class="col-6">
                        {{ gradingInfo.finalGrade }}
                      </div>
                      <div class="col-12 text-h3 q-pa-lg">
                        OVERALL FINAL GRADE {{ gradingInfo.overallGrade }}
                      </div>
                    </div>
                  </q-card-section>
                </q-expansion-item>
              </q-card>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
export default defineComponent({
  name: 'Grading',
  data () {
    return {
      gradingInfo: {
        prelimQuiz: null,
        prelimStanding: null,
        prelimScore: null,
        prelimGrade: null,
        prelimRemarks: null,
        midtermQuiz: null,
        midtermStanding: null,
        midtermScore: null,
        midtermGrade: null,
        midtermRemarks: null,
        finalQuiz: null,
        finalStanding: null,
        finalScore: null,
        finalGrade: null,
        finalRemarks: null,
        overallGrade: null
      }
    }
  },
  mounted () {
    this.checkAuthentication()
  },
  methods: {
    async checkAuthentication () {
      // const checkCookies = this.$q.cookies.has('isStudentLoggedIn')
      const $q = useQuasar()
      const checkCookies = $q.localStorage.has('isStudentLoggedIn')
      if (checkCookies) {
        this.isLoggedIn = true
        // const studentID = this.$q.cookies.get('studentID')
        const studentID = $q.localStorage.getItem('studentID')
        const studentInfo = {
          username: studentID,
          checking: true
        }
        const students = await this.$store.dispatch('students/students', studentInfo)
      } else {
        this.isLoggedIn = false
      }
    }
  }
})
</script>
