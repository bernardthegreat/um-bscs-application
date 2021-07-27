<template>
  <q-page
    class="row justify-center"
    v-bind:class="{ 'items-center': !this.isLoggedIn }"
  >
    <login :role="'student'" v-if="!isLoggedIn"></login>
    <student-dashboard  v-if="isLoggedIn"></student-dashboard>
  </q-page>
</template>

<script>
import Login from 'src/components/Login.vue';
import StudentDashboard from 'src/components/Students/StudentDashboard.vue';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex'

export default defineComponent({
  components: { Login, StudentDashboard },
  name: 'Students',
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
      studentInfo: 'students/studentInfo'
    })
  },
  watch: {
    studentInfo (val) {
      if (val.length > 0) {
        this.isLoggedIn = true
      } else {
        this.isLoggedIn = false
      }
    }
  },
  methods: {
    async checkAuthentication () {
      const checkCookies = this.$q.cookies.has('isStudentLoggedIn')
      if (checkCookies) {
        this.isLoggedIn = true
        const studentID = this.$q.cookies.get('studentID')
        const studentInfo = {
          username: studentID,
          checking: true
        }
        await this.$store.dispatch('students/students', studentInfo)
      } else {
        this.isLoggedIn = false
      }
    }
  }
})
</script>
