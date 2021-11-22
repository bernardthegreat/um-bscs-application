<template>
  <q-card>
    <q-card-section align="center">
      <q-expansion-item
        expand-separator
        icon="fas fa-user"
        label="PRELIM"
        group="gradingTerm"
        class="bg-primary text-white shadow-11"
        dark
      >
        <q-card>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="prelimGrades.prelimQuizItems"
                  label="Prelim Quiz Items"
                  autocomplete="off"
                  :rules="[ val => val && val.length > 0 || 'Please enter Quiz Items']"
                  ref="prelimQuizItems"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="prelimGrades.prelimQuiz"
                  label="Prelim Quiz"
                  autocomplete="off"
                  :rules="[ val => val && val.length > 0 || 'Please enter Quiz Score']"
                  ref="prelimQuizScore"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="prelimGrades.prelimExamItems"
                  label="Prelim Exam Items"
                  autocomplete="off"
                  :rules="[ val => val && val.length > 0 || 'Please enter Exam Items']"
                  ref="prelimExamItems"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="prelimGrades.prelimExam"
                  label="Prelim Exam"
                  autocomplete="off"
                  :rules="[ val => val && val.length > 0 || 'Please enter Exam Score']"
                  ref="prelimExamScore"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="prelimGrades.prelimQuizAverage"
                  label="Prelim Quiz Average"
                  autocomplete="off"
                  disable
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="prelimGrades.prelimExamAverage"
                  label="Prelim Exam Average"
                  autocomplete="off"
                  disable
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="prelimGrades.prelimClassStanding"
                  label="Prelim Class Standing"
                  autocomplete="off"
                  :rules="[ val => val && val.length > 0 || 'Please enter Class Standing']"
                  ref="prelimClassStanding"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="prelimGrades.prelimGrade"
                  label="Prelim Grade"
                  autocomplete="off"
                  disable
                />
              </div>
              <div class="col-12">
                <q-input
                  autogrow
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="prelimGrades.prelimRemarks"
                  label="Prelim Remarks"
                  autocomplete="off"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn 
              :loading="prelimLoading"
              icon="fas fa-user-edit"
              color="orange"
              @click="submitGrade('prelim')"
              type="button"
            >
              <span class="q-pl-md">SAVE PRELIM GRADE</span>
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
        icon="fas fa-user"
        label="MIDTERM"
        group="gradingTerm"
        class="bg-primary text-white shadow-11"
        dark
      >
        <q-card>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="midtermGrades.midtermQuizItems"
                  label="Midterm Quiz Items"
                  autocomplete="off"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="midtermGrades.midtermQuiz"
                  label="Midterm Quiz"
                  autocomplete="off"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="midtermGrades.midtermExamItems"
                  label="Midterm Exam Items"
                  autocomplete="off"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="midtermGrades.midtermExam"
                  label="Midterm Exam"
                  autocomplete="off"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="midtermGrades.midtermQuizAverage"
                  label="Midterm Quiz Average"
                  autocomplete="off"
                  disable
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="midtermGrades.midtermExamAverage"
                  label="Midterm Exam Average"
                  autocomplete="off"
                  disable
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="midtermGrades.midtermClassStanding"
                  label="Midterm Class Standing"
                  autocomplete="off"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="midtermGrades.midtermGrade"
                  label="Midterm Grade"
                  autocomplete="off"
                  disable
                />
              </div>
              <div class="col-12">
                <q-input
                  autogrow
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="midtermGrades.midtermRemarks"
                  label="Midterm Remarks"
                  autocomplete="off"
                />
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn 
              :loading="midtermLoading"
              icon="fas fa-user-edit"
              color="orange"
              @click="submitGrade('midterm')"
              type="button"
            >
              <span class="q-pl-md">SAVE MIDTERM GRADE</span>
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
        icon="fas fa-user"
        label="FINAL"
        group="gradingTerm"
        class="bg-primary text-white shadow-11"
        dark
      >
        <q-card>
          <q-card-section>
            <div class="row q-col-gutter-md">
              <div class="col-6">
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="finalGrades.finalQuizItems"
                  label="Final Quiz Items"
                  autocomplete="off"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="finalGrades.finalQuiz"
                  label="Final Quiz"
                  autocomplete="off"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="finalGrades.finalExamItems"
                  label="Final Exam Items"
                  autocomplete="off"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="finalGrades.finalExam"
                  label="Final Exam"
                  autocomplete="off"
                />
              </div>
              <div class="col-6">
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="finalGrades.finalQuizAverage"
                  label="Final Quiz Average"
                  autocomplete="off"
                  disable
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="finalGrades.finalExamAverage"
                  label="Final Exam Average"
                  autocomplete="off"
                  disable
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="finalGrades.finalClassStanding"
                  label="Final Class Standing"
                  autocomplete="off"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="finalGrades.finalGrade"
                  label="Final Grade"
                  autocomplete="off"
                  disable
                />
              </div>
              <div class="col-12">
                <q-input
                  autogrow
                  outlined
                  square
                  type="text"
                  hint=""
                  color="primary"
                  v-model="finalGrades.finalRemarks"
                  label="Final Remarks"
                  autocomplete="off"
                />
              </div>
              <div class="col-12 text-h3 flex flex-center text-black" v-if="finalGrades.finalOverallGrade !== null">
                OVERALL GRADE: {{ finalGrades.finalOverallGrade }}
              </div>
            </div>
          </q-card-section>
          <q-card-actions align="center">
            <q-btn 
              :loading="finalLoading"
              icon="fas fa-user-edit"
              color="orange"
              @click="submitGrade('finals')"
              type="button"
            >
              <span class="q-pl-md">SAVE FINAL GRADE</span>
              <template v-slot:loading>
                <q-spinner-hourglass class="on-left" />
                LOADING ...
              </template>
            </q-btn>
          </q-card-actions>
        </q-card>
      </q-expansion-item>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'Grading',
  props: ['studentInformation'],
  data () {
    return {
      prelimGrades: {
        prelimQuiz: null,
        prelimQuizItems: null,
        prelimQuizAverage: 0,
        prelimExam: null,
        prelimExamItems: null,
        prelimExamAverage: 0,
        prelimClassStanding: null,
        prelimGrade: null,
        prelimRemarks: null,
        prelimStatus: null,
        term: 'prelim'
      },
      prelimLoading: null,
      midtermGrades: {
        midtermQuiz: null,
        midtermQuizItems: null,
        midtermQuizAverage: 0,
        midtermExam: null,
        midtermExamItems: null,
        midtermExamAverage: 0,
        midtermClassStanding: null,
        midtermGrade: null,
        midtermRemarks: null,
        midtermStatus: null,
        term: 'mditerm'
      },
      midtermLoading: null,
      finalGrades: {
        finalQuiz: null,
        finalQuizItems: null,
        finalQuizAverage: 0,
        finalExam: null,
        finalExamItems: null,
        finalExamAverage: 0,
        finalClassStanding: null,
        finalGrade: null,
        finalRemarks: null,
        finalStatus: null,
        finalOverallGrade: null,
        term: 'finals'
      },
      finalLoading: null
    }
  },
  watch: {
    studentGrades (val) {
      this.formatOverallGrades()
    },
    prelimGrades: {
      async handler (val) {
        this.formatPrelimGrade(val)
      },
      deep: true
    },
    midtermGrades: {
      async handler (val) {
        this.formatMidtermGrade(val)
      },
      deep: true
    },
    finalGrades: {
      async handler (val) {
        this.formatFinalGrade(val)
      },
      deep: true
    },
  },
  computed: {
    ...mapGetters({
      studentGrades: 'students/studentGrades'
    })
  },
  methods: {
    formatOverallGrades () {
      if (this.studentGrades.length > 0) {
        this.prelimGrades.prelimQuiz = this.studentGrades[0].prelim_quiz
        this.prelimGrades.prelimQuizItems = this.studentGrades[0].prelim_quiz_items
        this.prelimGrades.prelimExam = this.studentGrades[0].prelim_exam
        this.prelimGrades.prelimExamItems = this.studentGrades[0].prelim_exam_items
        this.prelimGrades.prelimClassStanding = this.studentGrades[0].prelim_class_standing
        this.prelimGrades.prelimRemarks = this.studentGrades[0].prelim_remarks
        this.midtermGrades.midtermQuiz = this.studentGrades[0].midterm_quiz
        this.midtermGrades.midtermQuizItems = this.studentGrades[0].midterm_quiz_items
        this.midtermGrades.midtermExam = this.studentGrades[0].midterm_exam
        this.midtermGrades.midtermExamItems = this.studentGrades[0].midterm_exam_items
        this.midtermGrades.midtermClassStanding = this.studentGrades[0].midterm_class_standing
        this.midtermGrades.midtermRemarks = this.studentGrades[0].midterm_remarks
        this.finalGrades.finalQuiz = this.studentGrades[0].final_quiz
        this.finalGrades.finalQuizItems = this.studentGrades[0].final_quiz_items
        this.finalGrades.finalExam = this.studentGrades[0].final_exam
        this.finalGrades.finalExamItems = this.studentGrades[0].final_exam_items
        this.finalGrades.finalClassStanding = this.studentGrades[0].final_class_standing
        this.finalGrades.finalRemarks = this.studentGrades[0].final_remarks
      }
    },
    formatPrelimGrade (prelimGrade) {
      if (prelimGrade.prelimQuizItems !== null) {
        const computedPrelimQuiz = ((50 / prelimGrade.prelimQuizItems) * prelimGrade.prelimQuiz + 50).toFixed(2)
        prelimGrade.prelimQuizAverage = computedPrelimQuiz
      }
      
      if (prelimGrade.prelimExamItems !== null) {
        const computedPrelimExam = ((50 / prelimGrade.prelimExamItems) * prelimGrade.prelimExam + 50).toFixed(2)
        prelimGrade.prelimExamAverage = computedPrelimExam
      }

      if (prelimGrade.prelimExamAverage !== 0 && prelimGrade.prelimQuizAverage !== 0) {
        const computeTotalPrelimGrade = ((prelimGrade.prelimExamAverage * 0.7) + (prelimGrade.prelimQuizAverage * 0.3)).toFixed(1)
        const finalPrelimGrade = ((Number(computeTotalPrelimGrade) + Number(prelimGrade.prelimClassStanding)) / 2).toFixed(1)
        prelimGrade.prelimGrade = finalPrelimGrade
      }
    },
    formatMidtermGrade (midtermGrade) {
      if (midtermGrade.midtermQuizItems !== null) {
        const computedMidtermQuiz = ((50 / midtermGrade.midtermQuizItems) * midtermGrade.midtermQuiz + 50).toFixed(2)
        midtermGrade.midtermQuizAverage = computedMidtermQuiz
      }
      
      if (midtermGrade.midtermExamItems !== null) {
        const computedMidtermExam = ((50 / midtermGrade.midtermExamItems) * midtermGrade.midtermExam + 50).toFixed(2)
        midtermGrade.midtermExamAverage = computedMidtermExam
      }

      if (midtermGrade.midtermExamAverage !== 0 && midtermGrade.midtermQuizAverage !== 0) {
        const computeTotalMidtermGrade = ((midtermGrade.midtermExamAverage * 0.7) + (midtermGrade.midtermQuizAverage * 0.3)).toFixed(1)
        const finalMidtermGrade = ((Number(computeTotalMidtermGrade) + Number(midtermGrade.midtermClassStanding)) / 2).toFixed(1)
        midtermGrade.midtermGrade = finalMidtermGrade
      }
    },
    formatFinalGrade (finalGrade) {
      if (finalGrade.finalQuizItems !== null) {
        const computedFinalQuiz = ((50 / finalGrade.finalQuizItems) * finalGrade.finalQuiz + 50).toFixed(2)
        finalGrade.finalQuizAverage = computedFinalQuiz
      }
      
      if (finalGrade.finalExamItems !== null) {
        const computedFinalExam = ((50 / finalGrade.finalExamItems) * finalGrade.finalExam + 50).toFixed(2)
        finalGrade.finalExamAverage = computedFinalExam
      }

      if (finalGrade.finalExamAverage !== 0 && finalGrade.finalQuizAverage !== 0) {
        const computeTotalFinalGrade = ((finalGrade.finalExamAverage * 0.7) + (finalGrade.finalQuizAverage * 0.3)).toFixed(1)
        const finalFinalGrade = ((Number(computeTotalFinalGrade) + Number(finalGrade.finalClassStanding)) / 2).toFixed(1)
        finalGrade.finalGrade = finalFinalGrade
      }

      if (this.prelimGrades.prelimGrade !== null
          && this.midtermGrades.midtermGrade !== null
          && this.finalGrades.finalGrade !== null
      ) {
        finalGrade.finalOverallGrade = ((Number(this.prelimGrades.prelimGrade) + Number(this.midtermGrades.midtermGrade) + Number(this.finalGrades.finalGrade)) / 3).toFixed(1)
      }
    },
    async submitGrade (term) {
      
      const overallGrades = {
        prelimQuiz: this.prelimGrades.prelimQuiz,
        prelimQuizItems: this.prelimGrades.prelimQuizItems,
        prelimQuizAverage: this.prelimGrades.prelimQuizAverage,
        prelimExam: this.prelimGrades.prelimExam,
        prelimExamItems: this.prelimGrades.prelimExamItems,
        prelimExamAverage: this.prelimGrades.prelimExamAverage,
        prelimClassStanding: this.prelimGrades.prelimClassStanding,
        prelimGrade: this.prelimGrades.prelimGrade,
        prelimRemarks: this.prelimGrades.prelimRemarks,
        prelimStatus: this.prelimGrades.prelimStatus,
        midtermQuiz: this.midtermGrades.midtermQuiz,
        midtermQuizItems: this.midtermGrades.midtermQuizItems,
        midtermQuizAverage: this.midtermGrades.midtermQuizAverage,
        midtermExam: this.midtermGrades.midtermExam,
        midtermExamItems: this.midtermGrades.midtermExamItems,
        midtermExamAverage: this.midtermGrades.midtermExamAverage,
        midtermClassStanding: this.midtermGrades.midtermClassStanding,
        midtermGrade: this.midtermGrades.midtermGrade,
        midtermRemarks: this.midtermGrades.midtermRemarks,
        midtermStatus: this.midtermGrades.midtermStatus,
        finalQuiz: this.finalGrades.finalQuiz,
        finalQuizItems: this.finalGrades.finalQuizItems,
        finalQuizAverage: this.finalGrades.finalQuizAverage,
        finalExam: this.finalGrades.finalExam,
        finalExamItems: this.finalGrades.finalExamItems,
        finalExamAverage: this.finalGrades.finalExamAverage,
        finalClassStanding: this.finalGrades.finalClassStanding,
        finalGrade: this.finalGrades.finalGrade,
        finalRemarks: this.finalGrades.finalRemarks,
        finalStatus: this.finalGrades.finalStatus,
        finalOverallGrade: this.finalGrades.finalOverallGrade,
        studentID: this.studentInformation.studentNo
      }
      
      if (term === 'prelim') {
        const prelimQuizItems = this.$refs.prelimQuizItems.validate()
        const prelimQuizScore = this.$refs.prelimQuizScore.validate()
        const prelimExamItems = this.$refs.prelimExamItems.validate()
        const prelimExamScore = this.$refs.prelimExamScore.validate()
        const prelimClassStanding = this.$refs.prelimClassStanding.validate()
        if (prelimQuizItems && prelimQuizScore && prelimExamItems && prelimExamScore && prelimClassStanding) {
          
          await this.$store.dispatch('students/saveGrades', overallGrades)
        }
      } else if (term === 'midterm') {
        this.midtermGrades.student_id = this.studentInformation.studentNo
        await this.$store.dispatch('students/saveGrades', overallGrades)
      } else {
        this.finalGrades.student_id = this.studentInformation.studentNo
        await this.$store.dispatch('students/saveGrades', overallGrades)
      }
    },
  }
})
</script>
