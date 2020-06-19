<template>
    <div>
        <b-navbar type="dark" variant="dark">
            <b-navbar-nav>
                <b-nav-item to="/">Employees</b-nav-item>
                <b-nav-item to="/create">Create Employee</b-nav-item>
                <b-nav-item to="/tasks">Tasks</b-nav-item>
                <b-nav-item to="/tasks/create">Create Task</b-nav-item>
            </b-navbar-nav>
        </b-navbar>

        <div class="content">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Blog",
        data: () => {
            return {}
        },
    }
</script>

<style scoped>

</style>
