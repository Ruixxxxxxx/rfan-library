<template>
<div>
    <h1>Add a Book</h1>
    <form @submit.prevent="addBook">
        <div>
            <label for = "isbn"> ISBN: </label>
            <input type="text" id="isbn" v-model="isbn" required />
        </div>
        <div>
            <label for = "name"> Name: </label>
            <input type="text" id="name" v-model="name" required />
        </div>
        <button type="submit">Add Book</button>
    </form>

    <div>
        <h1>Delete a Book</h1>
        <div>
            <label for="deleteIsbn">ISBN:</label>
            <input type="text" id="deleteIsbn" v-model="deleteIsbn" required />
        </div>
        <button @click="deleteBook">Delete Book</button>
    </div>
    <div>
        <h1>Update a Book</h1>
        <div>
            <label for="updateIsbn">ISBN:</label>
            <input type="text" id="updateIsbn" v-model="updateIsbn" required />
        </div>
        <div>
            <label for="updateName">Name:</label>
            <input type="text" id="updateName" v-model="updateName" required />
        </div>
        <button @click="updateBook">Update Book</button>
    </div>
    <BookList />
</div>
</template>

<script>
import { ref } from 'vue';
import db  from '../firebase/init.js';
import { collection, addDoc, doc, deleteDoc, getDocs, where, updateDoc, query } from 'firebase/firestore';
import BookList from '../components/BookList.vue';

export default {
    setup() {
        const isbn = ref('');
        const name = ref('');
        const deleteIsbn = ref('');
        const updateIsbn = ref('');
        const updateName = ref('');

        const addBook = async () => {
            try {
                const isbnNumber = Number(isbn.value);
                if (isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }
                await addDoc(collection(db, 'books'), {
                    isbn: isbnNumber,
                    name: name.value
                });
                isbn.value = '';
                name.value = '';
                alert('Book added successfully');
            } catch (error) {
                console.error('Error adding book: ', error);
            }
        };

        const deleteBook = async () => {
            try {
                const isbnNumber = Number(deleteIsbn.value);
                if (isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }
                const querySnapshot = await getDocs(collection(db, 'books'), where('isbn', '==', isbnNumber));
                if (querySnapshot.empty) {
                    alert('No book found with this ISBN');
                    return;
                }
                await deleteDoc(doc(db, 'books', querySnapshot.docs[0].id));
                deleteIsbn.value = '';
                alert('Book deleted successfully');
            } catch (error) {
                console.error('Error deleting book: ', error);
            }
        };

        const updateBook = async () => {
            try {
                const isbnNumber = Number(updateIsbn.value);
                if (isNaN(isbnNumber)) {
                    alert('ISBN must be a valid number');
                    return;
                }
                const querySnapshot = await getDocs(query(collection(db, 'books'), where('isbn', '==', isbnNumber)));
                if (querySnapshot.empty) {
                    alert('No book found with this ISBN');
                    return;
                }
                const bookDoc = querySnapshot.docs[0];
                const bookData = bookDoc.data();
                const updatedData = {
                    isbn: bookData.isbn,
                    name: bookData.name
                };
                if (updateIsbn.value !== bookData.isbn.toString()) {
                    const newIsbnNumber = Number(updateIsbn.value);
                    if (isNaN(newIsbnNumber)) {
                        alert('New ISBN must be a valid number');
                        return;
                    }
                    updatedData.isbn = newIsbnNumber;
                }
                if (updateName.value !== bookData.name) {
                    updatedData.name = updateName.value;
                }
                await updateDoc(doc(db, 'books', bookDoc.id), updatedData);
                updateIsbn.value = '';
                updateName.value = '';
                alert('Book updated successfully');
            } catch (error) {
                console.error('Error updating book: ', error);
            }
        };
        return { 
            isbn,
            name,
            addBook,
            deleteIsbn,
            deleteBook,
            updateIsbn,
            updateName,
            updateBook
        };
    },
    components: {
        BookList
    }
};
</script>