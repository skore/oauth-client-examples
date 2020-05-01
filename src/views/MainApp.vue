<template>
  <div class="main">
    <textarea :value="code" cols="30" rows="10"></textarea>
  </div>
</template>

<script>
export default {
  name: 'MainApp',
  props: [
      'code', 'session',
  ],
  mounted() {
    console.dir(this.$props)
  }
}
</script>
