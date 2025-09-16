<template>
  <div class="container">
    <h1>Welcome to the Home Page</h1>
    <nav>
      <router-link to="/student">Go to Student Form</router-link>
      <router-link to="/admin">Go to Admin Form</router-link>
    </nav>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 80px auto;
  padding: 40px 24px;
  text-align: center;
  background-color: var(--cream);
  border-radius: 12px;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

h1 {
  color: var(--dark-blue);
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 32px;
}

nav {
  display: flex;
  justify-content: center;
  gap: 24px;
  flex-wrap: wrap;
}

.router-link {
  text-decoration: none;
  padding: 14px 22px;
  background: var(--dark-teal);
  color: white;
  border-radius: 6px;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  transition: background 0.3s ease;
}

.router-link:hover {
  background-color: #355F5A;
}
</style>
