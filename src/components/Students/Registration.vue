<template>
  <div>
    <div class="column q-pa-lg">
      <div class="row justify-center">
        <div class="col-lg-6 col-xs-12 col-sm-12">
          <q-card square class="shadow-24" style="max-height:auto">
            <q-form
              @submit="onSubmitRegistration"
              ref="studentInformation"
              class="q-gutter-md"
              v-if="!registrationStatus"
            >
              <q-card-section class="bg-primary">
                <div class="text-h5 text-center text-weight-thin text-white">
                  UM BSCS REGISTRATION
                </div>
              </q-card-section>
              <div v-if="!this.registrationLoading">
                <div v-if="!disableRegistrationForm">
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
                  <q-card-section align="center">
                    
                    <vue-recaptcha v-if="showRecaptcha" siteKey="6LdATK8bAAAAAJ6IkKZE579Sd55FmzgqVj3MsG4d"
                      size="normal" 
                      theme="light"
                      :tabindex="0"
                      @verify="recaptchaVerified"
                      @expire="recaptchaExpired"
                      @fail="recaptchaFailed"
                      ref="vueRecaptcha">
                    </vue-recaptcha>
                  </q-card-section>
                  <q-card-section v-if="errorMessage !== null">
                    <q-banner class="bg-red q-my-md text-white">
                      <template v-slot:avatar>
                        <q-icon name="fas fa-exclamation-triangle" />
                      </template>
                      {{ this.errorMessage }}
                    </q-banner>
                  </q-card-section>
                  <q-card-actions align="center">
                    <q-btn
                      push 
                      color="primary"
                      type="submit" 
                      icon="fas fa-user-check" 
                      :loading="disableRegistrationButton"
                      :disable="disableButton"
                      style="width: 180px;">
                      <span class="q-pl-md">REGISTER</span>
                      <template v-slot:loading>
                        <q-spinner-hourglass class="on-left" />
                        PROCESSING...
                      </template>
                    </q-btn>
                  </q-card-actions>
                </div>
                <div v-else>
                  <q-card-section align="center" class="text-h5">
                    REGISTRATION WAS CLOSED. PLEASE CONTACT YOUR PROFESSOR!
                  </q-card-section>
                </div>
              </div>
              <q-card-section>
                <q-inner-loading :showing="this.registrationLoading">
                  <q-spinner-gears size="50px" color="primary" />
                </q-inner-loading>
              </q-card-section>
              <q-card-section v-if="this.registrationLoading" align="center" class="text-h5">
                CHECKING CONFIGURATIONS
              </q-card-section>
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
import { defineComponent } from 'vue'
import vueRecaptcha from 'vue3-recaptcha2'
import { mapGetters } from 'vuex'
export default defineComponent({
  name: 'Registration',
  components: { vueRecaptcha },
  data () {
    return {
      showRecaptcha: true,
      registrationStatus: false,
      disableRegistrationButton: null,
      errorMessage: null,
      disableButton: true,
      registrationLoading: false,
      disableRegistrationForm: false,
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
  computed: {
    ...mapGetters({
      configurations: 'configurations/configurations'
    })
  },
  mounted () {
    this.checkConfiguration()
  },
  methods: {
    async checkConfiguration () {
      this.registrationLoading = true
      await this.$store.dispatch('configurations/getConfigurations')
      const studentsRegistration = this.configurations.filter((result) => result.name === 'students_registration')
      if (!studentsRegistration[0].active) {
        this.disableRegistrationForm = true
      }
      this.registrationLoading = false
    },
    isValidEmail (val) {
      const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/
      return emailPattern.test(val) || 'Invalid email'
    },
    async onSubmitRegistration () {
      this.disableRegistrationButton = true
      this.disableButton = true
      const studentInfo = {
        username: this.studentInformation.studentNo,
        checking: true
      }
      const studentLogin = await this.$store.dispatch('students/students', studentInfo)
      if (studentLogin.success === 'Success') {
        this.errorMessage = 'You are already registered'
        this.disableButton = false
        this.disableRegistrationButton = false
      } else {
        var register = await this.$store.dispatch('students/registerStudent', this.studentInformation)
        this.triggerSuccess()
      }
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
        this.disableButton = false
        this.disableRegistrationButton = false
      }, 3000)
    },
    recaptchaVerified(response) {
      if (response !== '') {
        this.disableButton = false
        this.errorMessage = null
        return { message: 'success' }
      } else {
        return { message: 'error' }
      }
    },
    recaptchaExpired() {
      this.$refs.vueRecaptcha.reset();
    },
    recaptchaFailed() {
      this.disableButton = true
    },
  }
})
</script>