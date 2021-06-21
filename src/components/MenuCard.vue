<template>
  <v-card class="mx-auto" max-width="344">
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

    <v-card-title>
      {{ menu.name }}
    </v-card-title>

    <v-card-subtitle>
      Menu
    </v-card-subtitle>

    <v-card-actions>
      <v-card-actions>
        <v-btn outlined rounded text>
          Selectionner
        </v-btn>
      </v-card-actions>
      <v-spacer></v-spacer>

      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-list dense>
          <v-subheader>Contenu</v-subheader>
          <v-list-item-group color="primary">
            <v-list-item v-for="article in menu.Articles">
              <v-list-item-content>
                <v-list-item-title v-text="article.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>

export default {
  name: "menuCard",
  props: ['menu'],
  data: () => ({
    show: false,
  }),
}

</script>
