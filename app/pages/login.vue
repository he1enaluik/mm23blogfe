<script setup>
    import axios from 'axios';
    axios.defaults.withXSRFToken = true;
    axios.defaults.withCredentials = true;
    let res = await axios.get('http://localhost:8000/sanctum/csrf-cookie');
    console.log(res);
    res = await axios.post('http://localhost:8000/api/login', {
        email: 'kasparsu@gmail.com',
        password: 'password',
    });
    res = await axios.get('http://localhost:8000/api/user');
    console.log(res);
</script>
<template>

</template>