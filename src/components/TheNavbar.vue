<template>
  <div class="navbar">
    <span>Freelance</span>
    <ul class="navbar-menu">
      <li>
        <router-link :to="{ name: 'tasks' }">All tasks</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'new' }">New</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TheNavbar"
};
</script>
