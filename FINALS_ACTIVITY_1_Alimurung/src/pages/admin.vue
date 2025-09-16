<template>
  <div class="container">
    <h1>Admin Info + File Upload</h1>

    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="form.adminID" placeholder="Admin ID" required />
      <input type="text" v-model="form.firstName" placeholder="First Name" required />
      <input type="text" v-model="form.lastName" placeholder="Last Name" required />
      <input type="text" v-model="form.department" placeholder="Department" required />
      <input type="text" v-model="form.username" placeholder="Username" required />
      <input type="file" @change="handleFileUpload" required />
      <button type="submit">Upload File</button>
    </form>

    <div v-if="submittedAdmin" class="submitted-info">
      <h2>Submitted Admin Info</h2>
      <ul>
        <li><strong>Admin ID:</strong> {{ submittedAdmin.adminID }}</li>
        <li><strong>First Name:</strong> {{ submittedAdmin.firstName }}</li>
        <li><strong>Last Name:</strong> {{ submittedAdmin.lastName }}</li>
        <li><strong>Department:</strong> {{ submittedAdmin.department }}</li>
        <li><strong>Username:</strong> {{ submittedAdmin.username }}</li>
        <li><strong>File Name:</strong> {{ submittedAdmin.fileName }}</li>
      </ul>
      <button @click="handleDelete" class="delete-btn">Delete Admin Info</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminForm",
  data() {
    return {
      form: {
        adminID: "",
        firstName: "",
        lastName: "",
        department: "",
        username: "",
        file: null,
      },
      submittedAdmin: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.form.file = event.target.files[0];
    },
    async handleSubmit() {
      try {
        const formData = new FormData();
        Object.keys(this.form).forEach(key => {
          if (this.form[key]) formData.append(key, this.form[key]);
        });

        const response = await fetch("/api/adminUpload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) throw new Error("Upload failed");

        this.submittedAdmin = {
          ...this.form,
          fileName: this.form.file.name,
        };

        alert("File uploaded successfully!");
      } catch (error) {
        console.error(error);
        alert("Error uploading file.");
      }
    },
    async handleDelete() {
      try {
        if (!this.submittedAdmin?.adminID) {
          alert("No admin data to delete.");
          return;
        }

        const response = await fetch("/api/deleteAdmin", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ adminID: this.submittedAdmin.adminID }),
        });

        if (!response.ok) throw new Error("Delete failed");

        this.submittedAdmin = null;
        alert("Admin record deleted.");
      } catch (error) {
        console.error(error);
        alert("Error deleting admin record.");
      }
    },
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  max-width: 400px;
  margin: 40px auto;
  padding: 30px 24px;
  background-color: var(--cream);
  color: var(--dark-blue);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(39, 68, 93, 0.1);
  font-family: 'Poppins', sans-serif;
}

h1 {
  text-align: center;
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 24px;
}

input,
button {
  width: 100%;
  margin-bottom: 16px;
  padding: 12px 14px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  border: 1.5px solid var(--dark-teal);
  border-radius: 6px;
  background-color: #fff;
  color: var(--dark-blue);
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: var(--light-teal);
}

button {
  background-color: var(--dark-teal);
  color: var(--cream);
  font-weight: 700;
  border: none;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--light-teal);
}

.submitted-info {
  margin-top: 24px;
  padding: 18px;
  border: 1.5px solid var(--dark-teal);
  background-color: #fff;
  border-radius: 8px;
}

.delete-btn {
  background-color: var(--dark-blue);
  color: var(--cream);
  font-weight: 700;
  margin-top: 12px;
  padding: 10px;
  border: none;
  border-radius: 6px;
}

.delete-btn:hover {
  background-color: var(--dark-teal);
}
</style>
