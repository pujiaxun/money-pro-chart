<template lang="pug">
.home
  router-link(to="/dashboard") Open Your Dashboard
  br
  router-link(to="/settings") Go to Settings
</template>

<script>
export default {
  name: "home"
};
</script>
