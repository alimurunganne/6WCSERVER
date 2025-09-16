<template>
  <div class="container">
    <h1>Student Form</h1>
    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="form.studentID" placeholder="Student ID" required />
      <input type="text" v-model="form.firstName" placeholder="First Name" required />
      <input type="text" v-model="form.lastName" placeholder="Last Name" required />
      <input type="text" v-model="form.section" placeholder="Section" required />
      <button type="submit">Submit</button>
    </form>

    <div v-if="studentData" class="student-info">
      <h2>Fetched Student Info</h2>
      <ul>
        <li><strong>Student ID:</strong> {{ studentData.studentID }}</li>
        <li><strong>Name:</strong> {{ studentData.firstName }} {{ studentData.lastName }}</li>
        <li><strong>Section:</strong> {{ studentData.section }}</li>
        <li><strong>Status:</strong> {{ studentData.status }}</li>
      </ul>
      <button @click="handleDelete" class="delete-btn">Delete Student</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "StudentForm",
  data() {
    return {
      form: {
        studentID: "",
        firstName: "",
        lastName: "",
        section: "",
      },
      studentData: null,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const params = new URLSearchParams(this.form).toString();
        const response = await fetch(`/api/getStudent?${params}`);
        if (!response.ok) throw new Error("Request failed");

        this.studentData = await response.json();
        alert("Student data fetched successfully!");
      } catch (error) {
        console.error(error);
        alert("Error fetching student data.");
      }
    },
    async handleDelete() {
      try {
        if (!this.studentData?.studentID) {
          alert("No student data to delete.");
          return;
        }

        const response = await fetch("/api/deleteStudent", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ studentID: this.studentData.studentID }),
        });

        if (!response.ok) throw new Error("Delete failed");

        this.studentData = null;
        alert("Student record deleted.");
      } catch (error) {
        console.error(error);
        alert("Error deleting student record.");
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

.student-info {
  margin-top: 24px;
  padding: 18px;
  border: 1.5px solid var(--dark-teal);
  background-color: #fff;
  border-radius: 8px;
}
</style>

