<template>
  <div>
    <q-table
      dense
      virtual-scroll
      v-model:pagination="pagination"
      :rows-per-page-options="[0]"
      :rows="this.studentDetails"
      :columns="columns"
      row-key="student_id"
      :filter="filter"
      selection="single"
      v-model:selected="selected"
      :loading="loading"
      style=" max-height: 415px; overflow-y:auto;"
      :title="this.tableTitle"
    >
      <template v-slot:top-right>
        <div class="row q-gutter-md">
          <q-btn-group>
            <q-btn
              push icon="fas fa-sync-alt"
              @click="resyncData"
              color="green"
            >
              <q-tooltip>
                RETRIEVE DATA
              </q-tooltip>
            </q-btn>
            <q-btn
              color="primary"
              icon-right="fa fa-download"
              no-caps
              @click="exportTable"
            />
            <q-btn
              color="primary"
              icon-right="fa fa-download"
              no-caps
              @click="exportGrades"
            />
          </q-btn-group>
          <q-input dense debounce="300" v-model="filter" placeholder="Search">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
      </template>
      <template v-slot:loading>
        <q-inner-loading showing color="primary" />
      </template>
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td auto-width>
            <q-toggle v-model="props.selected" checked-icon="add" unchecked-icon="remove" />
          </q-td>
          <q-td key="student_id" :props="props">
            {{ props.row.student_id }}
          </q-td>
          <q-td key="fullName" :props="props">
            {{ props.row.fullName }}
          </q-td>
          <q-td key="question" :props="props">
            {{ props.row.question }}
          </q-td>
          <q-td key="answer" :props="props">
            {{ props.row.answer }}
          </q-td>
          <q-td key="answerDateTime" :props="props">
            {{ props.row.answerDateTime }}
          </q-td>
          <q-td key="first_role" :props="props">
            {{ props.row.first_role }}
          </q-td>
          <q-td key="second_role" :props="props">
            {{ props.row.second_role }}
          </q-td>
          <q-td key="third_role" :props="props">
            {{ props.row.third_role }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="studentDialog" persistent>
      <q-card style="width: 900px; max-width:1500px">
        <q-card-section class="bg-primary">
          <div class="row justify-between">
            <div class="text-left text-h5 text-white text-weight-thin">
              <q-icon name="fas fa-hospital-user" class="q-pr-md"></q-icon>
              {{ this.studentInformation.fullName }}
            </div>
            <q-btn dense color="white" flat icon="close" @click="closeDialog" v-close-popup>
              <q-tooltip content-class="bg-white text-primary">CLOSE</q-tooltip>
            </q-btn>
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            <q-expansion-item
              expand-separator
              icon="fas fa-user"
              label="STUDENT INFORMATION"
              group="othergroup"
              default-opened
              class="q-ma-md bg-primary text-white shadow-11"
              dark
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
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="studentInformation.hashKey"
                    label="Hashkey"
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="studentInformation.firstRole"
                    label="First Role"
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="studentInformation.secondRole"
                    label="Second Role"
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="studentInformation.thirdRole"
                    label="Third Role"
                    autocomplete="off"
                  />
                  <q-select
                    outlined
                    v-model="studentInformation.fourthRole"
                    :options="roles"
                    label="Fourth Role"
                    hint=""
                    :rules="[ val => val && val.length > 0 || 'Please enter your desired Fourth Role']"
                  />
                </q-card-section>
                <q-card-section align="center">
                  <q-banner class="bg-orange text-white">
                    <div v-for="(results, index) in studentInformation.roleResults" :key="index">
                      {{ results.replace(':', ' - ').toUpperCase() }}
                    </div>
                  </q-banner>
                </q-card-section>
                <q-card-actions align="center">
                  <q-btn-group>
                    <q-btn 
                      :loading="approveLoading"
                      icon="fas fa-user-check"
                      color="green"
                      @click="approveStudent"
                      v-if="tableTitle === 'Floating Students'"
                      type="button"
                    >
                      <span class="q-pl-md">APPROVE</span>
                      <template v-slot:loading>
                        <q-spinner-hourglass class="on-left" />
                        LOADING ...
                      </template>
                    </q-btn>
                    <q-btn 
                      :loading="updateLoading"
                      icon="fas fa-user-edit"
                      color="orange"
                      @click="updateStudent"
                      type="button"
                    >
                      <span class="q-pl-md">UPDATE</span>
                      <template v-slot:loading>
                        <q-spinner-hourglass class="on-left" />
                        LOADING ...
                      </template>
                    </q-btn>
                  </q-btn-group>
                </q-card-actions>
              </q-card>
            </q-expansion-item>
            <q-expansion-item
              expand-separator
              icon="fas fa-user"
              label="GRADING"
              group="othergroup"
              class="q-ma-md bg-primary text-white shadow-11"
              dark
            >
              <grading :studentInformation="this.studentInformation"></grading>
            </q-expansion-item>
          </div>
        </q-card-section>
        <q-inner-loading :showing="this.studentDialogLoading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
        <!-- <q-card-section align="center" v-if="this.cardLoading" class="text-h5 text-weight-thin q-mt-xl q-pt-xl">
          LOADING DATA
        </q-card-section>
        <q-inner-loading :showing="this.cardLoading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading> -->
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { exportFile, useQuasar } from 'quasar'
function wrapCsvValue (val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}
import Grading from './Grading.vue'
export default defineComponent({
  components: { Grading },
  props: ['studentDetails', 'tableTitle', 'columns', 'allGrades'],
  name: 'TableProfessorStudents',
  data () {
    return {
      pagination: {
        rowsPerPage: 0
      },
      filter: '',
      selected: [],
      loading: null,
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
        roleResults: null
      },
      studentDialog: null,
      approveLoading: null,
      updateLoading: null,
      studentDialogLoading: null,
      roles: [
        "System Analyst",
        "UI / UX Designer",
        "Programmer",
        "Debugger or Tester",
        "Researcher"
      ],
      gradesColums: [
        {
          name: 'fullName',
          label: 'Student Name',
          align: 'left',
          field: 'fullName',
          sortable: true
        },
        { name: 'prelim', align: 'left', label: 'Prelim', field: 'prelim', sortable: true },
        { name: 'midterm', label: 'Midterm', field: 'midterm', align: 'left', sortable: true },
        { name: 'class_standing', label: 'Class Standing', field: 'class_standing', align: 'left', sortable: true }
      ]
    }
  },
  watch: {
    async selected (val) {
      if (val.length > 0) {
        this.studentDialog = true
        this.studentDialogLoading = true
        this.studentInformation.studentNo = val[0].student_id
        this.studentInformation.firstName = val[0].first_name
        this.studentInformation.middleName = val[0].middle_name
        this.studentInformation.lastName = val[0].last_name
        this.studentInformation.contactNumber = val[0].contact_number
        this.studentInformation.emailAddress = val[0].email_address
        this.studentInformation.fbLink = val[0].fb_link
        this.studentInformation.hashKey = val[0].hash_key
        this.studentInformation.birthdate = val[0].birthdate
        this.studentInformation.fullName = val[0].fullName
        this.studentInformation.firstRole = val[0].first_role
        this.studentInformation.secondRole = val[0].second_role
        this.studentInformation.thirdRole = val[0].third_role
        this.studentInformation.fourthRole = val[0].fourth_role
        this.studentInformation.roleResults = val[0].role_results
        await this.$store.dispatch('students/getStudentGrades', this.studentInformation.studentNo)
        this.studentDialogLoading = false
      }
    },
    studentDetails (val) {
      if (val.length > 0) {
        this.getGrades()
      }
    }
  },
  methods: {
    closeDialog () {
      this.studentDialog = false
      this.selected = []
    },
    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    },
    async approveStudent () {
      this.approveLoading = true
      const approvalStudent = await this.$store.dispatch('professors/approveStudent', this.studentInformation)
      if (approvalStudent.message !== null) {
        this.triggerSucccess()
      }
    },
    async updateStudent () {
      this.approveLoading = true
      const approvalStudent = await this.$store.dispatch('professors/updateFourthRole', this.studentInformation)
      if (approvalStudent.message !== null) {
        this.triggerSucccess()
      }
    },
    async resyncData () {
      this.loading = true
      await this.$store.dispatch('students/students')
      this.loading = false
    },
    triggerSucccess () {
      // we need to get the notification reference
      // otherwise it will never get dismissed ('ongoing' type has timeout 0)
      const notif = this.$q.notify({
        type: 'ongoing',
        message: 'Processing approval of student...'
      })

      // simulate delay
      setTimeout(() => {
        notif({
          type: 'positive',
          message: 'Student successfully verified!',
          timeout: 1000
        })
        this.approveLoading = false
        this.closeDialog()
        this.resyncData()
      }, 3000)
    },
    async getGrades () {
      await this.$store.dispatch('professors/getAllGrades')
    },
    exportGrades () {
      // naive encoding to csv format
      var grades = []
      for (var result of this.allGrades) {
        const studentGrades = {
          fullName: `${result.studentInfo.last_name}, ${result.studentInfo.first_name}`,
          prelim: Math.round(Number(result.grades.prelim_grade)),
          midterm: Math.round(Number(result.grades.midterm_grade)),
          class_standing: Math.round(Number(result.grades.final_overall_grade))
        }
        grades.push(studentGrades)
      }
      console.log(grades)
      const content = [this.gradesColums.map(col => wrapCsvValue(col.label))].concat(
        grades.map(row => this.gradesColums.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[ col.field === void 0 ? col.name : col.field ],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        'Students.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        $q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    },
    exportTable () {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
        this.studentDetails.map(row => this.columns.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[ col.field === void 0 ? col.name : col.field ],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        'Students.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        $q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    },
  }
})
</script>
