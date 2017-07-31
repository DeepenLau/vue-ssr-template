<template>
  <div class="bar">
    bar{{ item.value }}
  </div>
</template>

<script>
export default {
  name: 'bar',
  props: ['item'],
  serverCacheKey: props => props.item.id
}
</script>
