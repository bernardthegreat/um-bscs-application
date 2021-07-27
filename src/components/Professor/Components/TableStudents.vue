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
        <q-input dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
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
          <q-td key="contact_number" :props="props">
            {{ props.row.contact_number }}
          </q-td>
          <q-td key="answer" :props="props">
            {{ props.row.answer }}
          </q-td>
        </q-tr>
      </template>
    </q-table>
    <q-dialog v-model="studentDialog" persistent>
      <q-card style="width: 900px; max-width:1500px">
        <!-- <q-card-section class="bg-primary text-center">
          <span class="text-left text-h5 text-white text-weight-thin">
            <q-icon name="person"></q-icon>
            {{ vaccineeDetails.fullName }}
          </span>
        </q-card-section> -->
        <q-card-section class="bg-primary">
          <div class="row justify-between">
            <div class="text-left text-h5 text-white text-weight-thin">
              <q-icon name="fas fa-hospital-user" class="q-pr-md"></q-icon>
              {{ this.studentDetails[0].fullName }}
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
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <!-- <q-expansion-item
              expand-separator
              icon="fas fa-user"
              label="BACK OF VACCINE CARD"
              group="othergroup"
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
                    v-model="vaccineCardInformation.firstDoseDate"
                    label="First Dose Date"
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="vaccineCardInformation.secondDoseDate"
                    label="Second Dose Date"
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="vaccineCardInformation.manufacturer"
                    label="Vaccine Manufacturer"
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="vaccineCardInformation.batchNo"
                    label="1st Dose Batch No."
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="vaccineCardInformation.lotNo"
                    label="1st Dose Lot No."
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="vaccineCardInformation.secondDoseBatchNo"
                    label="2nd Dose Batch No."
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="vaccineCardInformation.secondDoseLotNo"
                    label="2nd Dose Lot No."
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="vaccineCardInformation.firstDoseVaccinator"
                    label="First Dose Vaccinator"
                    autocomplete="off"
                  />
                  <q-input
                    outlined
                    square
                    type="text"
                    hint=""
                    color="primary"
                    v-model="vaccineCardInformation.secondDoseVaccinator"
                    label="Second Dose Vaccinator"
                    autocomplete="off"
                  />
                </q-card-section>
              </q-card>
            </q-expansion-item> -->
          </div>
        </q-card-section>
        <!-- <q-card-section align="center" v-if="this.cardLoading" class="text-h5 text-weight-thin q-mt-xl q-pt-xl">
          LOADING DATA
        </q-card-section>
        <q-inner-loading :showing="this.cardLoading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading> -->
        <q-card-actions align="center">
          <q-btn-group>
            <q-btn
              type="button"
              color="green"
              v-if="tableTitle === 'Floating Students'"
              @click="approveStudent"
              class="q-pa-sm"
              icon="fas fa-user-check"
              label="Approve">
            </q-btn>
            <q-btn
              type="button"
              color="orange"
              @click="updateStudent"
              class="q-pa-sm"
              icon="fas fa-user-edit"
              label="Update">
            </q-btn>
          </q-btn-group>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: ['loading', 'studentDetails', 'tableTitle', 'columns'],
  name: 'TableProfessorStudents',
  data () {
    return {
      pagination: {
        rowsPerPage: 0
      },
      filter: '',
      selected: [],
      studentInformation: {
        studentNo: null,
        firstName: null,
        middleName: null,
        lastName: null,
        contactNumber: null,
        emailAddress: null,
        fbLink: null,
        hashKey: null,
        birthdate: null
      },
      studentDialog: null
    }
  },
  watch: {
    selected (val) {
      if (val.length > 0) {
        this.studentDialog = true
        this.studentInformation.studentNo = val[0].student_id
        this.studentInformation.firstName = val[0].first_name
        this.studentInformation.middleName = val[0].middle_name
        this.studentInformation.lastName = val[0].last_name
        this.studentInformation.contactNumber = val[0].contact_number
        this.studentInformation.emailAddress = val[0].emailAddress
        this.studentInformation.fbLink = val[0].fb_link
        this.studentInformation.hashKey = val[0].hash_key
        this.studentInformation.birthdate = val[0].birthdate
      }
    }
  },
  mounted () {
    console.log(this.studentDetails, 'details')
  },
  methods: {
    closeDialog () {
      this.studentDialog = false
      this.selected = []
    },
    approveStudent () {
      console.log('here')
    },
    updateStudent () {
      console.log('herererere')
    }
  }
})
</script>
