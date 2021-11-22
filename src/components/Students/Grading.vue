<template>
  <div class="col-lg-12 col-md-12 col-xs-12 q-pa-lg">
    <div>
      <q-card square class="card-border-primary">
        <q-card-section class=" bg-primary">
          <div class="row justify-between">
            <div class="text-h5 text-white text-weight-thin">
              UM BSCS STUDENT APPLICATION STUDENT GRADE
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row justify-center items-center">
            <div class="col-lg-12">
              <q-card>
                <q-card-section class="bg-blue text-h5 text-weight-thin text-white" align="center">
                  STUDENT GRADE
                </q-card-section>
                <q-expansion-item
                  expand-separator
                  icon="fa fa-check"
                  label="PRELIM"
                  group="announcementGroup"
                  header-class="bg-light-blue text-white"
                  class="shadow-11"
                  expand-icon-class="text-white"
                >
                  <q-card-section align="center">
                    <q-card>
                      <q-card-section align="center" class="text-overline bg-light-blue text-white">
                        PRELIM GRADE BREAKDOWN
                      </q-card-section>
                      <q-card-section>
                        <div class="row">
                          <div class="col-6 bg-light-blue text-white q-pa-sm">
                            PRELIM QUIZ
                          </div>
                          <div class="col-6 bg-light-blue text-white q-pa-sm">
                            {{ gradingInfo.prelimQuiz }}
                          </div>
                          <div class="col-6 q-pa-sm">
                            PRELIM QUIZ ITEMS
                          </div>
                          <div class="col-6 q-pa-sm">
                            {{ gradingInfo.prelimQuizItems }}
                          </div>
                          <div class="col-6 bg-light-blue text-white q-pa-sm">
                            PRELIM SCORE
                          </div>
                          <div class="col-6 bg-light-blue text-white q-pa-sm">
                            {{ gradingInfo.prelimScore }}
                          </div>
                          <div class="col-6 q-pa-sm">
                            PRELIM EXAM ITEMS
                          </div>
                          <div class="col-6 q-pa-sm">
                            {{ gradingInfo.prelimExamItems }}
                          </div>
                          <div class="col-6 bg-light-blue text-white q-pa-sm">
                            PRELIM CLASS STANDING
                          </div>
                          <div class="col-6 bg-light-blue text-white q-pa-sm">
                            {{ gradingInfo.prelimStanding }}
                          </div>
                          <div class="col-6 q-pa-sm">
                            TOTAL PRELIM GRADE
                          </div>
                          <div class="col-6 q-pa-sm">
                            {{ gradingInfo.prelimGrade }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-card-section>
                  <q-card-section>
                    <q-card>
                      <q-card-section align="center" class="text-overline bg-light-blue text-white">
                        PRELIM REMARKS
                      </q-card-section>
                      <q-card-section>
                        <div class="row text-center">
                          <div class="col-12">
                            {{ gradingInfo.prelimRemarks }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-card-section>
                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  icon="fa fa-check"
                  label="MIDTERM"
                  group="announcementGroup1"
                  header-class="bg-cyan text-white"
                  class="shadow-11"
                  expand-icon-class="text-white"
                >

                  <q-card-section align="center">
                    <q-card>
                      <q-card-section align="center" class="text-overline bg-cyan text-white">
                        MIDTERM GRADE BREAKDOWN
                      </q-card-section>
                      <q-card-section>
                        <div class="row">
                          <div class="col-6 bg-cyan text-white q-pa-sm">
                            MIDTERM QUIZ
                          </div>
                          <div class="col-6 bg-cyan text-white q-pa-sm">
                            {{ gradingInfo.midtermQuiz }}
                          </div>
                          <div class="col-6 q-pa-sm">
                            MIDTERM QUIZ ITEMS
                          </div>
                          <div class="col-6 q-pa-sm">
                            {{ gradingInfo.midtermQuizItems }}
                          </div>
                          <div class="col-6 bg-cyan text-white q-pa-sm">
                            MIDTERM SCORE
                          </div>
                          <div class="col-6 bg-cyan text-white q-pa-sm">
                            {{ gradingInfo.midtermScore }}
                          </div>
                          <div class="col-6 q-pa-sm">
                            MIDTERM EXAM ITEMS
                          </div>
                          <div class="col-6 q-pa-sm">
                            {{ gradingInfo.midtermExamItems }}
                          </div>
                          <div class="col-6 bg-cyan text-white q-pa-sm">
                            MIDTERM CLASS STANDING
                          </div>
                          <div class="col-6 bg-cyan text-white q-pa-sm">
                            {{ gradingInfo.midtermStanding }}
                          </div>
                          <div class="col-6 q-pa-sm">
                            TOTAL MIDTERM GRADE
                          </div>
                          <div class="col-6 q-pa-sm">
                            {{ gradingInfo.midtermGrade }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-card-section>
                  <q-card-section>
                    <q-card>
                      <q-card-section align="center" class="text-overline bg-cyan text-white">
                        MIDTERM REMARKS
                      </q-card-section>
                      <q-card-section>
                        <div class="row text-center">
                          <div class="col-12">
                            {{ gradingInfo.midtermRemarks }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-card-section>
                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  icon="fa fa-check"
                  label="FINAL"
                  group="announcementGroup1"
                  header-class="bg-teal text-white"
                  class="shadow-11"
                  expand-icon-class="text-white"
                >
                  <q-card-section align="center">
                    <q-card>
                      <q-card-section align="center" class="text-overline bg-teal text-white">
                        FINAL GRADE BREAKDOWN
                      </q-card-section>
                      <q-card-section>
                        <div class="row">
                          <div class="col-6 bg-teal text-white q-pa-sm">
                            FINAL QUIZ
                          </div>
                          <div class="col-6 bg-teal text-white q-pa-sm">
                            {{ gradingInfo.finalQuiz }}
                          </div>
                          <div class="col-6 q-pa-sm">
                            FINAL QUIZ ITEMS
                          </div>
                          <div class="col-6 q-pa-sm">
                            {{ gradingInfo.finalQuizItems }}
                          </div>
                          <div class="col-6 bg-teal text-white q-pa-sm">
                            FINAL SCORE
                          </div>
                          <div class="col-6 bg-teal text-white q-pa-sm">
                            {{ gradingInfo.finalScore }}
                          </div>
                          <div class="col-6 q-pa-sm">
                            FINAL EXAM ITEMS
                          </div>
                          <div class="col-6 q-pa-sm">
                            {{ gradingInfo.finalExamItems }}
                          </div>
                          <div class="col-6 bg-teal text-white q-pa-sm">
                            FINAL CLASS STANDING
                          </div>
                          <div class="col-6 bg-teal text-white q-pa-sm">
                            {{ gradingInfo.finalStanding }}
                          </div>
                          <div class="col-6 q-pa-sm">
                            TOTAL FINAL GRADE
                          </div>
                          <div class="col-6 q-pa-sm">
                            {{ gradingInfo.finalGrade }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-card-section>
                  <q-card-section>
                    <q-card>
                      <q-card-section align="center" class="text-overline bg-teal text-white">
                        FINAL REMARKS
                      </q-card-section>
                      <q-card-section>
                        <div class="row text-center">
                          <div class="col-12">
                            {{ gradingInfo.finalRemarks }}
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-card-section>
                </q-expansion-item>

                <q-expansion-item
                  expand-separator
                  icon="fa fa-check"
                  label="OVERALL FINAL GRADE"
                  group="announcementGroup1"
                  header-class="bg-green text-white"
                  class="shadow-11"
                  expand-icon-class="text-white"
                >
                  <q-card-section align="center">
                    <q-card>
                      <q-card-section align="center" class="text-overline bg-green text-white">
                        OVERALL FINAL GRADE: 
                      </q-card-section>
                      <q-card-section align="center">
                        <div class="col-12 text-h3 q-pa-lg">
                          {{ gradingInfo.overallGrade }}
                        </div>
                      </q-card-section>
                    </q-card>
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
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'Grading',
  data () {
    return {
      studentID: null,
      gradingInfo: {
        prelimQuiz: 0,
        prelimQuizItems: 0,
        prelimStanding: 0,
        prelimScore: 0,
        prelimExamItems: 0,
        prelimGrade: 0,
        prelimRemarks: null,
        midtermQuiz: 0,
        midtermQuizItems: 0,
        midtermStanding: 0,
        midtermScore: 0,
        midtermExamItems: 0,
        midtermGrade: 0,
        midtermRemarks: null,
        finalQuiz: 0,
        finalQuizItems: 0,
        finalStanding: 0,
        finalScore: 0,
        finalExamItems: 0,
        finalGrade: 0,
        finalRemarks: null,
        overallGrade: 0
      }
    }
  },
  async mounted () {
    await this.checkAuthentication()
    await this.getStudentGrades()
  },
  computed: {
    ...mapGetters({
      studentGrades: 'students/studentGrades',
      studentInfo: 'students/studentInfo'
    })
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
    },
    async getStudentGrades () {
      await this.$store.dispatch('students/getStudentGrades', this.studentInfo[0].student_id)
      this.gradingInfo.prelimQuiz = this.studentGrades[0].prelim_quiz
      this.gradingInfo.prelimQuizItems = this.studentGrades[0].prelim_quiz_items
      this.gradingInfo.prelimStanding = this.studentGrades[0].prelim_class_standing
      this.gradingInfo.prelimScore = this.studentGrades[0].prelim_exam
      this.gradingInfo.prelimExamItems = this.studentGrades[0].prelim_exam_items
      this.gradingInfo.prelimGrade = this.studentGrades[0].prelim_grade
      this.gradingInfo.prelimRemarks = this.studentGrades[0].prelim_remarks
      this.gradingInfo.midtermQuiz = this.studentGrades[0].midterm_quiz
      this.gradingInfo.midtermQuizItems = this.studentGrades[0].midterm_quiz_items
      this.gradingInfo.midtermStanding = this.studentGrades[0].midterm_class_standing
      this.gradingInfo.midtermScore = this.studentGrades[0].midterm_exam
      this.gradingInfo.midtermExamItems = this.studentGrades[0].midterm_exam_items
      this.gradingInfo.midtermGrade = this.studentGrades[0].midterm_grade
      this.gradingInfo.midtermRemarks = this.studentGrades[0].midterm_remarks
      this.gradingInfo.finalQuiz = this.studentGrades[0].final_quiz
      this.gradingInfo.finalQuizItems = this.studentGrades[0].final_quiz_items
      this.gradingInfo.finalStanding = this.studentGrades[0].final_class_standing
      this.gradingInfo.finalScore = this.studentGrades[0].final_exam
      this.gradingInfo.finalExamItems = this.studentGrades[0].final_exam_items
      this.gradingInfo.finalGrade = this.studentGrades[0].final_grade
      this.gradingInfo.finalRemarks = this.studentGrades[0].final_remarks
      this.gradingInfo.overallGrade = this.studentGrades[0].final_overall_grade
    }
  }
})
</script>
