// public/app.js
const { createApp } = Vue;

createApp({
  data() {
    return {
      items: [],
      display: false,
    };
  },
  mounted() {
    fetch('/api/items')
      .then((res) => res.json())
      .then((data) => {
        this.items = data;
      })
      .catch((err) => console.error('Error fetching data:', err));
  },
}).mount('#app');
