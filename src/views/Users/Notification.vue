<template>
  <div class="text-center">
      <v-list three-line>
        <v-subheader
            :key="'Notification'"
            v-text="'Notification'"
        ></v-subheader>
        <template v-for="(notification, index) in notifications">
          <v-divider
              :key="index"
              :inset="true"
          ></v-divider>

          <v-list-item
              :key="notification.title"
          >

            <v-list-item-content>
              <v-list-item-title v-html="notification.title"></v-list-item-title>
              <v-list-item-subtitle v-html="notification.description"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon :to="notification.route">
              <v-btn class="mx-1" fab dark color="primary">
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
  },
}
</script>

<style scoped>

</style>