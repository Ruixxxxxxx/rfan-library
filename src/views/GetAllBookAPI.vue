<template>
    <pre>{{ books }}</pre>
</template>

<script>
import { ref, onMounted } from 'vue';
import db from '../firebase/init.js';
import { collection, query, getDocs } from 'firebase/firestore';

export default {
    setup() {
        const books = ref([]);

        const fetchBooks = async () => {
            try {
                const q = query(
                    collection(db, 'books'),           
                );
                const querySnapshot = await getDocs(q);
                const booksArray = [];
                querySnapshot.forEach((doc) => {
                    booksArray.push({ id: doc.id, ...doc.data() });
                });
                books.value = booksArray;
            } catch (error) {
                console.error('Error fetching books: ', error);
            }
        };

        onMounted(() => {
            fetchBooks();
        });

        return { books };
    }
};

</script>
