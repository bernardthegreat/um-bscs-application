<template>
  <q-page
    class=""
    v-bind:class="{ 'items-center': !this.isLoggedIn }"
  > 
    <div class="row justify-center" v-if="!isLoggedIn">
      <login :role="'student'"></login>
    </div>
    <student-dashboard v-if="isLoggedIn" :studentInfo="studentInfo" @getStudents="checkAuthentication"></student-dashboard>
  </q-page>
</template>

<script>
import Login from 'src/components/Login.vue';
import StudentDashboard from 'src/components/Students/StudentDashboard.vue';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex'
import { useQuasar } from 'quasar'

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
      // const checkCookies = this.$q.cookies.has('isStudentLoggedIn')
      const $q = useQuasar()
      const checkCookies = $q.localStorage.has('isStudentLoggedIn')
      if (checkCookies) {
        this.isLoggedIn = true
        // const studentID = this.$q.cookies.get('studentID')
        const studentID = $q.localStorage.getItem('studentID')
        const studentInfo = {
          username: studentID,
          checking: true
        }
        const students = await this.$store.dispatch('students/students', studentInfo)
      } else {
        this.isLoggedIn = false
      }
    }
  }
})
</script>
