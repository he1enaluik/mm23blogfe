<template>
    <h1>{{ $route.params.id }}</h1>
    <img :src="'https://http.cat/' +  $route.params.id">
</template>