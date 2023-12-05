<template>
    <div class="no-menu">
        <p>Aun no ha iniciado un menú, puede hacerlo en </p>
        <router-link to="/admin/current_menu" class="a">
            <button class="btn-simple">Ir a Menú</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'Profile',

}
</script>
<style scoped>
.no-menu{
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    margin: 1rem 0rem;
}
.btn-simple{
    background: rgb(56, 119, 255);
    color: white;
    border-radius: 0.5rem;
}
</style>