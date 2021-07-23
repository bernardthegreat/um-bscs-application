<template>
  <q-page
    class="window-height row justify-center items-center"
  >
    <div class="column q-pa-lg" style="width:450px;height:511px;">
      <div class="row">
        <div class="col-sm-12 col-lg-12 col-md-12 col-xs-12">
          <q-card square class="shadow-24" style="max-height:auto">
            <q-card-section class="bg-primary">
              <h4 class="text-h5 text-white q-my-md text-center text-overline">
                UM STUDENT APP - PROFESSOR
              </h4>
            </q-card-section>
            <q-card-section>
              <q-form
                class="q-px-sm q-pt-sm q-pb-xs"
                @keydown.enter.prevent="login"
                ref="loginForm"
              >
                <q-input
                  :autofocus="true"
                  square
                  v-model="loginForm.username"
                  type="text"
                  label="Username"
                  class="q-mt-md"
                  :rules="[ val => val && val.length > 0 || 'Please enter your Username']"
                >
                  <template v-slot:prepend>
                    <q-icon name="person" />
                  </template>
                  <template v-slot:append>
                    <q-icon name="close" @click="loginForm.username = ''" class="cursor-pointer" />
                  </template>
                </q-input>
                <q-input
                  square
                  v-model="loginForm.password"
                  type="password"
                  label="Password"
                  :rules="[ val => val && val.length > 0 || 'Please enter your Password']"
                >
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                  <template v-slot:append>
                    <q-icon name="close" @click="loginForm.password = ''" class="cursor-pointer" />
                  </template>
                </q-input>
              </q-form>
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
            <q-card-section class="q-py-md">
              <div class="doc-note bg-negative q-dark text-center" v-if="formMessage != null">
                <q-icon name="error"></q-icon>
                {{this.formMessage}}
              </div>
              <div class="doc-note bg-negative q-dark text-center" v-if="loginFormErrorMessage.length > 0">
                <q-icon name="error"></q-icon>
                {{this.loginFormErrorMessage}}
              </div>
            </q-card-section>
            <q-card-section class="bg-primary">
              <q-btn flat size="lg" type="submit" @click="login" icon="login" color="primary" class="full-width full-height text-white" label="Log In" />
            </q-card-section>
            <!-- <q-card-actions class="q-px-lg q-my-lg">
              </q-card-actions>
            -->
            <q-inner-loading :showing="this.loginLoading">
              <q-spinner-gears size="50px" color="primary" />
            </q-inner-loading>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>

import { defineComponent } from 'vue'
import vueRecaptcha from 'vue3-recaptcha2';
export default defineComponent({
  data () {
    return {
      showRecaptcha: true,
      loginLoading: null,
      loginForm: {
        username: null,
        password: null,
        module: null
      },
      loginFormErrorMessage: []
    }
  },
  components: { vueRecaptcha },
  methods: {
    login () {
      
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
    }
  }
});

</script>