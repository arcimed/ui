<template>
  <div class="text-center">
      <v-list three-line>
        <v-subheader
            :key="'Notification'"
            v-text="'Notification'"
        ></v-subheader>
        <v-list-item v-if="ordersSort.length < 1">
          <v-list-item-title v-html="'Vous n\'avez pas recu de notification' "></v-list-item-title>
        </v-list-item>
        <template v-for="(notification, index) in ordersSort">
          <v-divider
              :key="index"
              :inset="true"
          ></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-html="notification.title"></v-list-item-title>
              <v-list-item-subtitle v-html="notification.description"></v-list-item-subtitle>
              <v-list-item-subtitle v-html=""><format :value="notification.updatedAt" fn="dateTime" /></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon :to="notification.url">
              <v-btn class="mx-1" fab dark @click="linkNotifications(notification.url)" color="primary">
                <v-icon dark>mdi-plus</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </template>
      </v-list>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
const _ = require('lodash')
import format from "../../components/Format";

export default {
  name: "Notification",
  components: {format},
  data() {
    return {
      divider: true,
    }
  },
  computed: {
    ...mapGetters('notifications', {
      notifications: 'notifications',
    }),
    ordersSort: function () {
      return _.orderBy(this.notifications, 'updatedAt', 'desc')
    }
  },
  methods:{
    linkNotifications(url) {
      if (this.$route.fullPath != url){
        this.$router.push({ path: url})
      }else {
        this.$router.go()
      }
    },
  }
}
</script>

<style scoped>

</style>
