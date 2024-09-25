<template>
  <router-view />
</template>
<script setup lang="ts">
import { getCurrentInstance, provide } from 'vue'
const { proxy } = getCurrentInstance()
provide('vueProxy', proxy)
</script>
