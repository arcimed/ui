<template>
  <div class="text-center">
      <v-list three-line>
        <v-subheader
            :key="'Notification'"
            v-text="'Notification'"
        ></v-subheader>
        <template v-for="(notification, index) in ordersSort">
          <v-divider
              :key="index"
              :inset="true"
          ></v-divider>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title v-html="notification.title"></v-list-item-title>
              <v-list-item-subtitle v-html="notification.description"></v-list-item-subtitle>
              <v-list-item-subtitle v-html="notification.updatedAt"></v-list-item-subtitle>
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

export default {
  name: "Notification",
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
      this.$router.push({ path: url})
    },
  }
}
</script>

<style scoped>

</style>
