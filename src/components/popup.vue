<template>
  <div id="popup">
    <v-app id="inspire">
      <v-row justify="space-around">
        <v-col cols="auto">
          <v-dialog
              transition="dialog-top-transition"
              max-width="600"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
              >From the top</v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card>
                <v-toolbar
                    color="primary"
                    dark
                >{{ title }}</v-toolbar>
                <v-card-text>
                  <div class="text-h2 pa-12">{{ message }}</div>
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                      text
                      @click="dialog.value = false"
                  >Close</v-btn>
                </v-card-actions>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
    </v-app>
  </div>
</template>
<script lang="ts">
export default {
  name: "CreateAccount",
    props: ['title','message'],

  }
</script>