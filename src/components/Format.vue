<template>
  <span>{{ formatter[fn](value, format) }}</span>
</template>

<script>
import moment from 'moment'

let formatter = {
  date: function (value, format) {
    if (value) {
      return moment(String(value)).format('DD/MM/YYYY')
    }
  },
  time: function (value, format) {
    if (value) {
      return moment(String(value)).format('HH:mm');
    }
  },
  dateTime: function (value, format) {
    if (value) {
      return moment(String(value)).format('DD/MM/YYYY, HH:mm')
    }
  },
};
export default {
  name: "format",
  props: ['value', 'fn', 'format'],
  computed: {
    formatter() {
      return formatter;
    }
  },
}
</script>
