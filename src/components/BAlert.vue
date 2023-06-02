<script setup lang="ts">
const text = _.capitalize('Information')
</script>

<template>
  <div>
    <slot name="default">
      <div>
        <span>{{ text }}</span>
        <span>{{ _.capitalize('test') }}</span>
      </div>
    </slot>

  </div>
</template>

<style scoped></style>
