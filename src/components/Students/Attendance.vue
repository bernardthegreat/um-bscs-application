<template>
  <div class="col-lg-12 col-md-12 col-xs-12 q-pa-lg">
    <div>
      <q-card square class="card-border-primary">
        <q-card-section class=" bg-primary">
          <div class="row justify-between">
            <div class="text-h5 text-white text-weight-thin">
              UM BSCS STUDENT APPLICATION STUDENT ATTENDANCE
            </div>
          </div>
        </q-card-section>
        <q-card-section>
          COMING SOON
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Attendance',
  data () {
    return {

    }
  },
  mounted () {
    this.checkAuthentication()
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
        this.$router.push('/students')
      }
    }
  }
})
</script>
