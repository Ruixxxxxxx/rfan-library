<template>
    <!-- 🗄️ Firebase Login Form -->
    <div class="container mt-5">
        <div class="row">
            <div class="col-md-8 offset-md-2">
                <h1 class="text-center">Firebase Login</h1>
                <p class="text-center">
                    Allow user to login !
                </p>
                <form @submit.prevent="submitForm">
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6 offset-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" class="form-control" id="username" v-model="formData.username" />
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-md-6 col-sm-6 offset-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" class="form-control" id="password" v-model="formData.password" />
                        </div>
                    </div>
                    <div class="text-center">
                        <button type="submit" class="btn btn-primary me-2">Login</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref } from 'vue';
import { getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { isAuthenticated } from '../router/index.js';
import { useRouter } from 'vue-router';
import db from '../firebase/init';
import { doc, getDoc } from 'firebase/firestore';

const router = useRouter();

const formData = ref({
    username: '',
    password: ''
});

const submitForm = async () => {
    const userEmail = formData.value.username;
    const userPassword = formData.value.password;

    try {
        const { user } = await signInWithEmailAndPassword(getAuth(), userEmail, userPassword);

        const userRef = doc(db, 'users', user.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            const userData = userSnap.data();
            isAuthenticated.value = {
                ...user,
                role: userData.role
            };

            console.log('Logged in as:', isAuthenticated.value);
            console.log(`Logged in as ${userData.role}`);

            router.push('/');
        } else {
            console.error('User not found');
        }
    } catch (error) {
        alert(error.code);
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
