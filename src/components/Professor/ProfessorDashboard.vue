<template>
  <div class="col-lg-12 col-md-12 col-xs-12 q-pa-lg">
    <div>
      <q-card class="card-border-primary">
        <q-card-section>
          <q-card>
            <q-card-section class=" bg-primary">
              <div class="row justify-between">
                <div class="text-h5 text-white text-weight-thin">
                  UM BSCS STUDENT APPLICATION PROFESSOR DASHBOARD
                </div>
                <div>
                  <q-btn-group>
                    <q-btn
                      push icon="fas fa-question-circle"
                      @click="askQuestion"
                      color="red"
                    >
                      <q-tooltip>
                        ASK QUESTION
                      </q-tooltip>
                    </q-btn>
                  </q-btn-group>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-section>
          <div class="row justify-between q-col-gutter-md">
            <div class="col-lg-6 col-md-12 col-xs-12">
              <q-card class="bg-green text-white">
                <q-card-section>
                  <div class="flex flex-center text-h6 text-weight-thin">
                    REGISTERED STUDENTS
                  </div>
                  <div class="flex flex-center text-h4 text-weight-thin">
                    <q-icon name="fas fa-user-check" class="q-pr-md" size="55px" /> {{ registeredStudents.length }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="col-lg-6 col-md-12 col-xs-12">
              <q-card class="bg-secondary text-white">
                <q-card-section>
                  <div class="flex flex-center text-h6 text-weight-thin">
                    FLOATING STUDENTS
                  </div>
                  <div class="flex flex-center text-h4 text-weight-thin">
                    <q-icon name="fas fa-user-edit" class="q-pr-md" size="55px" /> {{ floatingStudents.length }}
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          <q-card>
            <q-tabs
              v-model="tab"
              inline-label
              :breakpoint="0"
              align="justify"
              class="bg-primary text-white shadow-2"
            >
              <q-tab name="registered" label="Registered Students" />
              <q-tab name="floating" label="Floating Students" />
            </q-tabs>
            <q-separator />
            <q-tab-panels v-model="tab" animated>
              <q-tab-panel name="registered">
                <table-students :loading="this.loading" :columns="this.columns" :studentDetails="registeredStudents" :tableTitle="'Registered Students'"></table-students>
              </q-tab-panel>
              <q-tab-panel name="floating">
                <table-students :loading="this.loading" :columns="this.columns" :studentDetails="floatingStudents" :tableTitle="'Floating Students'"></table-students>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </q-card-section>
      </q-card>
      
      <q-dialog v-model="question">
        <div class="column">
          <div class="row">
            <div class="col-sm-12 col-lg-12 col-md-12 col-xs-12">
              <questions-dialog></questions-dialog>
            </div>
          </div>
        </div>
      </q-dialog>
    </div>
  </div>
</template>

<script>

import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'
import TableStudents from './Components/TableStudents.vue'
import QuestionsDialog from './Components/QuestionsDialog.vue'
export default defineComponent({
  components: { TableStudents, QuestionsDialog },
  name: 'ProfessorDashboard',
  data () {
    return {
      tab: 'floating',
      loading: null,
      columns: [
        {
          name: 'student_id',
          label: 'Student ID',
          align: 'left',
          field: 'student_id',
          sortable: true
        },
        { name: 'fullName', align: 'left', label: 'Name', field: 'fullName', sortable: true },
        { name: 'contact_number', label: 'Contact #', field: 'contact_number', align: 'left', sortable: true },
        { name: 'answer', label: 'Recitation', field: 'answer', align: 'left', sortable: true }
      ],
      question: null
    }
  },
  computed: {
    ...mapGetters({
      registeredStudents: 'students/registeredStudents',
      floatingStudents: 'students/floatingStudents'
    })
  },
  async mounted () {
    await this.getStudents()
  },
  methods: {
    async getStudents () {
      this.loading = true
      await this.$store.dispatch('students/students')
      this.loading = false
    },
    askQuestion () {
      this.question = true
    }
  }
})

</script>
