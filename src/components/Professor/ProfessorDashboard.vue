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
                    <q-btn
                      push icon="fas fa-users"
                      @click="openGroupingsDialog"
                      color="green"
                    >
                      <q-tooltip>
                        SHUFFLE STUDENTS
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
                <table-students @getStudents="getStudents" :loading="this.loading" :columns="this.columns" :studentDetails="floatingStudents" :tableTitle="'Floating Students'"></table-students>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </q-card-section>
      </q-card>
      
      <q-dialog v-model="questionDialog">
        <div class="column">
          <div class="row">
            <div class="col-sm-12 col-lg-12 col-md-12 col-xs-12">
              <questions-dialog @closeDialog="questionDialog = false" :wsConnection="wsConnection"></questions-dialog>
            </div>
          </div>
        </div>
      </q-dialog>
      <q-dialog v-model="groupingsDialog">
        <div class="column">
          <div class="row">
            <div class="col-sm-12 col-lg-12 col-md-12 col-xs-12">
              <q-card style="width: 500px; max-width:800px;">
                <q-card-section class="bg-primary text-h5 text-white" align="center">
                  GROUPINGS
                </q-card-section>
                <q-card-section>
                  <q-select
                    outlined
                    v-model="studentRoles.finalRole"
                    :options="roles"
                    label="Official Role"
                    hint=""
                    :rules="[ val => val && val.length > 0 || 'Please enter your desired Third Role']"
                  />
                </q-card-section>
                <q-card-section align="center">
                  <q-btn push label="SHUFFLE" @click="shuffleStudents" icon="fa fa-sync" color="primary"></q-btn>
                </q-card-section>
                <q-inner-loading :showing="this.groupingsLoading">
                  <q-spinner-pie size="50px" color="primary" />
                </q-inner-loading>
              </q-card>
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
      tab: 'registered',
      loading: null,
      groupingsLoading: null,
      columns: [
        {
          name: 'student_id',
          label: 'Student ID',
          align: 'left',
          field: 'student_id',
          sortable: true
        },
        { name: 'fullName', align: 'left', label: 'Name', field: 'fullName', sortable: true },
        { name: 'question', label: 'Question', field: 'question', align: 'left', sortable: true },
        { name: 'answer', label: 'Answer', field: 'answer', align: 'left', sortable: true },
        { name: 'answerDateTime', label: 'Answer D/T', field: 'answerDateTime', align: 'left', sortable: true },
        { name: 'first_role', label: 'Primary Role', field: 'first_role', align: 'left', sortable: true },
        { name: 'second_role', label: 'Secondary Role', field: 'second_role', align: 'left', sortable: true },
        { name: 'third_role', label: 'Tertiary Role', field: 'third_role', align: 'left', sortable: true },
      ],
      questionDialog: null,
      groupingsDialog: null,
      roles: [
        "System Analyst",
        "UI / UX Designer",
        "Programmer",
        "Debugger or Tester",
        "Researcher"
      ],
      studentRoles: {
        finalRole: null
      }
    }
  },
  computed: {
    ...mapGetters({
      registeredStudents: 'students/registeredStudents',
      floatingStudents: 'students/floatingStudents',
      wsConnection: 'students/wsConnection'
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
      this.questionDialog = true
    },
    async openGroupingsDialog () {
      this.groupingsDialog = true
    },
    async shuffleStudents () {
      this.groupingsLoading = true
      await this.$store.dispatch('survey/getShuffledStudents', this.studentRoles)
      this.groupingsLoading = false
      this.sendToWS('Role')
    },
    sendToWS (wsMessage) {
      this.wsConnection.send(wsMessage)
    }
  }
})

</script>
