<template>
  <div class="admin-card">
    <div class="admin-card__content">
      <p>管理員ID：{{ data.ID }}</p>
      <p>{{ data.Email }}</p>
      <p class="admin-account">{{ data.Name }}</p>
      <hr />
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    data: {
      type: Object as PropType<adminCardType>,
      default: () => {}
    }
  }
})
</script>
