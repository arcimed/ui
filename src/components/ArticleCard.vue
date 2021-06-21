<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ article.name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ article.type }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn outlined rounded text>
        Selectionner
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: "articleCard",
  props: ['article'],
}

</script>
