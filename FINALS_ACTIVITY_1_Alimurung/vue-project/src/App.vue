<template>
  <div>
    <router-view /> <!-- Displays Home, Student, or Admin -->
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>

*,
*::before,
*::after {
  box-sizing: border-box;
}

:root {
  --main-font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  --cream: #F7F3E8;
  --dark-blue: #27445D;
  --dark-teal: #497D74;
  --light-teal: #71BBB2;
}

body {
  font-family: var(--main-font-family);
  background-color: var(--cream);
  color: var(--dark-blue);
  margin: 0;
  padding: 0;
}

a, .router-link {
  font-weight: 600;
  color: var(--dark-teal);
  text-decoration: none;
}

a:hover, .router-link:hover {
  color: var(--light-teal);
}

button {
  font-family: inherit;
  font-weight: 600;
  cursor: pointer;
}
</style>

