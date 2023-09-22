<script setup lang="ts">
const handleClick = () => {
  console.log('handleClick')
}
</script>

<template>
  <a-button type="primary" @click="handleClick">
    arco
  </a-button>
</template>
<style lang="less" scoped></style>
