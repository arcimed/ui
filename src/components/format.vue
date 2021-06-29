<template>
  <span>{{ formatter[fn](value, format) }}</span>
</template>

<script>
import moment from 'moment'

let formatter = {
  date: function (value, format) {
    if (value) {
      return moment(String(value)).format(format || 'MM/DD/YY')
    }
  },
  time: function (value, format) {
    if (value) {
      return moment(String(value)).format(format || 'h:mm A');
    }
  },
  dateTime: function (value, format) {
    if (value) {
      return moment(String(value)).format(format || 'MMMM Do YYYY, h:mm:ss')
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