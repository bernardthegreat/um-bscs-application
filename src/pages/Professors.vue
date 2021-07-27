<template>
  <q-page
    class="row justify-center"
    v-bind:class="{ 'items-center': !this.isLoggedIn }"
  >
    <login :role="'professor'" v-if="!isLoggedIn"></login>
    <professor-dashboard v-if="isLoggedIn"></professor-dashboard>
  </q-page>
</template>

<script>
import Login from 'src/components/Login.vue';
import ProfessorDashboard from 'src/components/Professor/ProfessorDashboard.vue';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex'

export default defineComponent({
  components: { Login, ProfessorDashboard },
  name: 'Professors',
  data () {
    return {
      isLoggedIn: false
    }
  },
  mounted () {
    this.checkAuthentication()
  },
  computed: {
    ...mapGetters({
      isProfessorLoggedIn: 'professors/isProfessorLoggedIn'
    })
  },
  watch: {
    isProfessorLoggedIn (val) {
      this.checkAuthentication()
    }
  },
  methods: {
    checkAuthentication () {
      const checkCookies = this.$q.cookies.has('isProfessorLoggedIn')
      if (checkCookies) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    }
  }
})
</script>
