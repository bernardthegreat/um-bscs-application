<template>
  <div>
    <div class="column q-pa-lg">
      <div class="row justify-center">
        <div class="col-lg-6 col-xs-12 col-sm-12">
          <q-card square class="shadow-24" style="max-height:auto">
            <q-card-section class="bg-primary">
              <div class="text-h5 text-center text-weight-thin text-white">
                UM BSCS REGISTRATION
              </div>
            </q-card-section>
            <q-form
              @submit="onSubmitRegistration"
              ref="studentInformation"
              class="q-gutter-md"
              v-if="!registrationStatus"
            >
              <q-card-section>
                <q-input
                  outlined
                  square
                  type="text"
                  label="Student No."
                  hint="Refers to your ID"
                  color="primary"
                  autocomplete="off"
                  v-model="studentInformation.studentNo"
                  :rules="[ val => val && val.length > 0 || 'Please enter your Student No.']"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  label="Last Name"
                  hint=""
                  color="primary"
                  autocomplete="off"
                  v-model="studentInformation.lastName"
                  :rules="[ val => val && val.length > 0 || 'Please enter your Last Name']"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  label="First Name"
                  hint=""
                  color="primary"
                  autocomplete="off"
                  v-model="studentInformation.firstName"
                  :rules="[ val => val && val.length > 0 || 'Please enter your First Name']"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  label="Middle Name"
                  hint=""
                  color="primary"
                  autocomplete="off"
                  v-model="studentInformation.middleName"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  label="Email Address"
                  hint=""
                  color="primary"
                  autocomplete="off"
                  v-model="studentInformation.email"
                  :rules="[ val => val && val.length > 0 || 'Please enter your Email', isValidEmail]"
                />
                <q-input
                  outlined
                  square
                  type="number"
                  label="Contact Number"
                  hint=""
                  color="primary"
                  autocomplete="off"
                  v-model="studentInformation.contactNo"
                  :rules="[ val => val && val.length > 0 || 'Please enter your Contact #']"
                />
                <q-input
                  outlined
                  square
                  type="text"
                  label="Facebook Profile"
                  hint=""
                  color="primary"
                  autocomplete="off"
                  v-model="studentInformation.fbLink"
                  :rules="[ val => val && val.length > 0 || 'Please enter your Facebook Profile Link']"
                />
              </q-card-section>
              <q-card-actions align="center">
                <q-btn
                  push 
                  color="primary"
                  type="submit" 
                  icon="fas fa-user-check" 
                  :loading="disableRegistrationButton"
                  style="width: 180px;">
                  <span class="q-pl-md">REGISTER</span>
                  <template v-slot:loading>
                    <q-spinner-hourglass class="on-left" />
                    PROCESSING...
                  </template>
                </q-btn>
              </q-card-actions>
            </q-form>
            <div v-else>
              <div class="row justify-center q-ma-lg q-col-gutter-lg">
                <div class="col-lg-12 text-center">
                  <q-icon name="fas fa-check-circle" color="green" size="125px"></q-icon>
                </div>
                <div class="col-lg-12 text-h5 text-weight-thin text-center q-pb-md">
                  <div>
                    YOU HAVE SUCCESSFULLY REGISTERED
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Registration',
  data () {
    return {
      registrationStatus: false,
      disableRegistrationButton: null,
      studentInformation: {
        studentNo: null,
        lastName: null,
        firstName: null,
        middleName: null,
        email: null,
        contactNo: null,
        fbLink: null
      }
    }
  },
  methods: {
    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    },
    async onSubmitRegistration () {
      this.disableRegistrationButton = true
      var register = await this.$store.dispatch('students/registerStudent', this.studentInformation)
      console.log(register)
      this.triggerSuccess()
    },
    triggerSuccess () {
      // we need to get the notification reference
      // otherwise it will never get dismissed ('ongoing' type has timeout 0)
      var notif = this.$q.notify({
        type: 'ongoing',
        message: 'Registering student ...'
      })
      // simulate delay
      setTimeout(async () => {
        notif({
          type: 'positive',
          message: 'Successfully registered student!',
          timeout: 1000
        })
        this.registrationStatus = true
        this.disableRegistrationButton = false
      }, 3000)
    }
  }
}
</script>