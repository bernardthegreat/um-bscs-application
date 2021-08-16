<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated v-if="this.isLoggedIn">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="text-uppercase text-weight-thin">
          UM BSCS Student Application
        </q-toolbar-title>
        <q-space></q-space>
        <q-btn-group>
          <q-btn
            icon="fas fa-sync-alt"
            push
            @click="reload"
            large
            color="secondary"
          >
          </q-btn>
          <q-btn color="secondary" push
            icon="logout" @click="logout" large
          />
        </q-btn-group>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
      :width="350"
      v-if="this.isLoggedIn"
    >
      <q-list v-if="this.currentUser === 'Professors'">
        <div class="flex q-mx-md q-my-md justify-center q-ml-xs">
          <q-card square class="user-card card-border-primary" style="width:300px" color="primary">
            <q-card-section>
              <div class="text-overline text-center text-weight-bold">BERNARD TIAGA GRESOLA</div>
              <div class="text-center">
                <q-chip color="primary" size="sm" text-color="white" icon="person">
                  PROFESSOR
                </q-chip>
              </div>
            </q-card-section>
            <q-separator></q-separator>
            <q-list>
              <q-item clickable v-ripple to="/professors">
                <q-item-section avatar>
                  <q-icon color="primary" name="fas fa-user-graduate" />
                </q-item-section>
                <q-item-section>DASHBOARD</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/professors/analytics">
                <q-item-section avatar>
                  <q-icon color="primary" name="fas fa-chart-line" />
                </q-item-section>
                <q-item-section>ANALYTICS</q-item-section>
              </q-item>
              <q-item clickable v-ripple to="/professors/settings">
                <q-item-section avatar>
                  <q-icon color="primary" name="fas fa-cogs" />
                </q-item-section>
                <q-item-section>SETTINGS</q-item-section>
              </q-item>
            </q-list>
          </q-card>
        </div>
      </q-list>

      <q-list v-else>
        <div class="flex q-mx-md q-my-md justify-center q-ml-xs">
          <q-card square class="user-card card-border-primary" style="width:300px" color="primary">
            <q-card-section>
              <div class="text-overline text-center text-weight-bold">
                {{ studentInformation.fullName }}
              </div>
              <div class="text-center">
                <q-chip color="primary" size="sm" text-color="white" icon="person">
                  STUDENT
                </q-chip>
              </div>
            </q-card-section>
            <q-inner-loading :showing="this.studentLoading">
              <q-spinner-puff size="90px" color="primary" />
            </q-inner-loading>
            <q-separator></q-separator>
            <q-list>
              <q-item clickable v-ripple to="/">
                <q-item-section avatar>
                  <q-icon color="primary" name="fas fa-user-graduate" />
                </q-item-section>
                <q-item-section>DASHBOARD</q-item-section>
              </q-item>
              <!-- <q-item clickable v-ripple to="/students/attendance">
                <q-item-section avatar>
                  <q-icon color="primary" name="fas fa-user-clock" />
                </q-item-section>
                <q-item-section>ATTENDANCE</q-item-section>
              </q-item> -->
            </q-list>
          </q-card>
        </div>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { mapGetters } from 'vuex'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'AppLayout',
  data () {
    return {
      isLoggedIn: false,
      leftDrawerOpen: false,
      currentUser: null,
      studentInformation: {
        studentNo: null,
        firstName: null,
        middleName: null,
        lastName: null,
        fullName: null,
        emailAddress: null,
        contactNumber: null,
        fbLink: null
      },
      studentLoading: null
    }
  },
  mounted () {
    this.initiateWebSocket()
    this.checkAuthentication()
  },
  computed: {
    ...mapGetters({
      isProfessorLoggedIn: 'professors/isProfessorLoggedIn',
      studentInfo: 'students/studentInfo'
    })
  },
  watch: {
    isProfessorLoggedIn (val) {
      this.checkAuthentication()
    },
    studentInfo (val) {
      if (val.length > 0) {
        this.studentLoading = true
        this.isLoggedIn = true
        setTimeout(async () => {
          this.studentInformation.studentNo = val[0].student_id,
          this.studentInformation.firstName = val[0].first_name,
          this.studentInformation.middleName = val[0].middle_name,
          this.studentInformation.lastName = val[0].last_name,
          this.studentInformation.fullName = val[0].fullName,
          this.studentInformation.emailAddress = val[0].email_address,
          this.studentInformation.contactNumber = val[0].contact_number,
          this.studentInformation.fbLink = val[0].fb_link
          this.studentLoading = false
        }, 2000)
      }
    }
  },
  methods: {
    reload () {
      location.reload()
    },
    async initiateWebSocket () {
      await this.$store.dispatch('students/initiateWebSocket')
    },
    async checkAuthentication () {
      var currentRoute = this.$router.currentRoute.value.name
      
      if (currentRoute === 'Professors' || currentRoute === 'Settings') {
        const checkProfessorCookies = this.$q.cookies.has('isProfessorLoggedIn')
        if (checkProfessorCookies) {
          this.isLoggedIn = true
        } else {
          this.isLoggedIn = false
        }
        this.currentUser = 'Professors'
      } else if (currentRoute === 'Homepage' || currentRoute === 'Attendance') {
        // const checkStudentCookies = this.$q.cookies.has('isStudentLoggedIn')
        const $q = useQuasar()
        const checkStudentCookies = $q.localStorage.has('isStudentLoggedIn')
        if (checkStudentCookies) {
          this.isLoggedIn = true
        } else {
          this.isLoggedIn = false
        }
        this.currentUser = currentRoute
      }
      
    },
    logout () {
      var currentRoute = this.$router.currentRoute.value.name
      if (currentRoute === 'Professors') {
        this.$store.dispatch('professors/logout')
      } else if (currentRoute === 'Homepage') {
        this.$store.dispatch('students/logout')
      } else if (currentRoute === 'Attendance') {
        this.$store.dispatch('students/logout')
        this.$router.push('/')
      }
      this.isLoggedIn = false
    }
  }
})
</script>
