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
          <div class="row justify-center items-center">
            <q-card style="width:500px;max-width:800px;">
              <q-card-section class="bg-green text-h5 text-weight-thin text-white" align="center">
                ATTENDANCE
              </q-card-section>
              <q-card-section align="center" class="text-h2 text-weight-thin">
                <div v-if="this.time !== null">
                  {{ this.time }}
                </div>
              </q-card-section>
              <q-card-section class="bg-green">
                <q-btn flat size="lg" icon="fa fa-user-clock" color="white" class="full-width full-height text-white" label="TIME IN" />
              </q-card-section>
              <q-inner-loading :showing="this.time === null">
                <q-spinner-gears size="50px" color="green" />
              </q-inner-loading>
            </q-card>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
export default defineComponent({
  name: 'Attendance',
  data () {
    return {
      time: null
    }
  },
  mounted () {
    this.checkAuthentication()
    this.showTime()
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
    },
    showTime () {
      
      setTimeout(() => {
        var date = new Date();
        var h = date.getHours(); // 0 - 23
        var m = date.getMinutes(); // 0 - 59
        var s = date.getSeconds(); // 0 - 59
        var session = "AM";
        
        if(h == 0){
            h = 12;
        }
        
        if(h > 12){
            h = h - 12;
            session = "PM";
        }
        
        h = (h < 10) ? "0" + h : h;
        m = (m < 10) ? "0" + m : m;
        s = (s < 10) ? "0" + s : s;
        
        var time = h + ":" + m + ":" + s + " " + session;
        this.time = time
        this.showTime()
      }, 1000)
    }
  }
})
</script>
