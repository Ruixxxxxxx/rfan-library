<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-md-8 offset-md-2">
          <h1 class="text-center"> Firebase Sign Up</h1>
          <p class="text-center">
            Allow user to create a new account !
          </p>
          <form @submit.prevent="submitForm">
        <div class="row mb-3">
          <div class="col-md-6 col-sm-6 offset-3">
            <label for="username" class="form-label">Username</label>
            <input type="text" class="form-control" id="username" v-model="formData.username">
          </div>
        </div>
        <div class="row mb-3">
          <div class="col-md-6 col-sm-6 offset-3">
            <label for="password" class="form-label">Password</label>
            <input type="password" class="form-control" id="password" v-model="formData.password">
          </div>
        </div>
        <div class="text-center">
          <button type="submit" class="btn btn-primary me-2">Sign up</button>
        </div>
      </form>
    </div>
    </div>
    </div>
  </template>



<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import db from '../firebase/init' 
import { isAuthenticated } from '../router/index.js'


const auth = getAuth();
const router = useRouter()

const formData = ref({
    username: '',
    password: '',
})

const submitForm = async () => {
    const userEmail = formData.value.username;
    const userPassword = formData.value.password;

    try {
        const { user } = await createUserWithEmailAndPassword(auth, userEmail, userPassword);

        let userRole = 'user';
        if (/admin/i.test(userEmail)) {
            userRole = 'admin';
        }

        await setDoc(doc(db, 'users', user.uid), {
            email: userEmail,
            role: userRole,
        });

        isAuthenticated.value = {
            user: user,
            role: userRole,
        };

        router.push('/');
    } catch (error) {
        alert(error.message);
    }
};
</script>

<style scoped>
.container {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    max-width: 80vw;
    margin: 0 auto;
    padding: 20px;
    border-radius: 10px;
}
</style>