<template>
  <q-page
    class="row justify-center"
  >
    <div class="col-lg-6 col-sm-12 col-md-12 col-xs-12 q-ma-lg">
      <q-card square class="shadow-24">
        <q-card-section class="bg-primary text-white">
          <div class="row justify-between">
            <div class="text-h5 text-weight-thin">
              ANNOUNCEMENTS
            </div>
            <div>
              <q-btn-group>
                <q-btn
                  color="secondary"
                  :to="'/registration'"
                  icon="fa fa-user-edit"
                  push
                >
                  <q-tooltip class="bg-green" :offset="[10, 10]">
                    REGISTER HERE
                  </q-tooltip>
                </q-btn>
                <q-btn
                  color="secondary"
                  :to="'/students'"
                  icon="fa fa-sign-in-alt"
                  push
                >
                  <q-tooltip class="bg-green" :offset="[10, 10]">
                    LOGIN HERE
                  </q-tooltip>
                </q-btn>
              </q-btn-group>
            </div>
          </div>
        </q-card-section>
        <q-card-section v-if="!announcementLoading">
          <q-expansion-item
            expand-separator
            icon="fa fa-thumbtack"
            label="PINNED ANNOUNCEMENTS"
            group="somegroup"
            default-opened
            header-class="bg-secondary text-white"
            class="shadow-11 q-ma-md"
            expand-icon-class="text-white"
            v-if="this.pinnedAnnouncements.length > 0"
          >
            <pinned-announcements :pinnedAnnouncements="pinnedAnnouncements"></pinned-announcements>
          </q-expansion-item>
          
          <q-expansion-item
            expand-separator
            icon="fa fa-bullhorn"
            label="OTHER ANNOUNCEMENTS"
            group="othergroups"
            default-opened
            header-class="bg-secondary text-white"
            class="shadow-11 q-ma-md"
            expand-icon-class="text-white"
            v-if="this.otherAnnouncements.length > 0"
          >
            <other-announcements :otherAnnouncements="otherAnnouncements"></other-announcements>
          </q-expansion-item>
        </q-card-section>
        <q-card-section align="center" v-if="announcementLoading">
          <div class="text-h5 text-weight-thin">
            LOADING ANNOUNCEMENTS
          </div>
        </q-card-section>
        <q-inner-loading :showing="this.announcementLoading">
          <q-spinner-gears size="50px" color="primary" />
        </q-inner-loading>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import OtherAnnouncements from 'src/components/Announcements/OtherAnnouncements.vue';
import PinnedAnnouncements from 'src/components/Announcements/PinnedAnnouncements.vue';
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex'

export default defineComponent({
  components: { PinnedAnnouncements, OtherAnnouncements },
  name: 'PageIndex',
  data () {
    return {
      announcementLoading: null,
      messages: null
    }
  },
  mounted () {
    this.checkAuthentication()
    // var channel = pusher.subscribe('my-channel')
    // channel.bind('my-event', function(data) {
    //   this.messages = JSON.stringify(data)
    // });
  },
  computed: {
    ...mapGetters({
      pinnedAnnouncements: 'announcements/pinnedAnnouncements',
      otherAnnouncements: 'announcements/otherAnnouncements'
    })
  },
  methods: {
    async getAnnouncements () {
      await this.$store.dispatch('announcements/getAnnouncements')
    },
    async checkAuthentication () {
      this.announcementLoading = true
      const checkCookies = this.$q.cookies.has('isStudentLoggedIn')
      if (checkCookies) {
        this.$router.push('/students')
      } else {
        this.getAnnouncements()
      }
      this.announcementLoading = false
    }
  }
})
</script>
