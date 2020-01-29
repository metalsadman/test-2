<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-full.svg"
    >
    current counter{{counter}}
    <q-btn
      label="add"
      v-model="counter"
      @click="counter++"
    />
  </q-page>
</template>

<script>
export default {
  name: 'PageIndex',
  computed: {
    counter: {
      set () {
        this.$store.commit('example/incrementCounter')
      },
      get () {
        return this.$store.state.example.counter
      }
    }
  }
}
</script>
