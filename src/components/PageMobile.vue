<template>      
    <div class="mobile">
        <div class="container">
            <p class="mobile__text">
                Версия для мобильного устройства находится в разработке
            </p>
        </div>
    </div>
</template>

<script>
export default {
    name: "Mobile",
    data: () => ({
        
    }),
}
</script>

<style lang="less" scoped>
    .mobile {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        overflow: hidden;
        height: 100vh;
        position: relative;
        .container {
            max-width: 1190rem;
        }
    }
    .mobile__text {
        font-size: 30rem;
        padding: 10rem;
        text-align: center;
        font-family: 'Ubuntu Bold';
    }
</style>