<template>
    <div>
        <div class="container pt-5">
            <div class="row">
                <div class="col-md-6 pb-3">
                    <b-input-group class="mt-3">
                        <b-input-group-text>Title And Description Search:</b-input-group-text>
                        <b-form-input v-model="filter"></b-form-input>
                        <b-input-group-append>
                            <b-button @click="search" variant="info">Search</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </div>

                <div class="col-md-6">
                    <select v-model="sort" class="form-control mt-3">
                        <option value="">Choose Status</option>
                        <option value="1">New</option>
                        <option value="2">In Progress</option>
                        <option value="3">Done</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 pb-4" v-for="task in filterTasks" :key="task.id">
                    <b-card :title="task.title" class="b-card">
                        <b-card-subTitle>
                            <h6 :class="{
                            'text-primary' : task.progress.id == 1,
                            'text-warning' : task.progress.id == 2,
                            'text-success' : task.progress.id == 3}">
                                {{task.progress.name}}
                            </h6>
                        </b-card-subTitle>
                        <b-card-body class="b-card">
                            {{ task.description }}
                        </b-card-body>
                        <b-card-body title="Employees" style="background: whitesmoke">
                            <p v-for="emp in task.employees" :key="emp.id">{{emp.fullName}}</p>
                        </b-card-body>
                        <router-link :to="'/tasks/edit/'+task.id">Edit</router-link>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions} from "vuex"

    export default {
        name: "Articles",
        data: () => {
            return {
                searchQuery: "",
                filter: "",
                sort: ""
            }
        },
        computed: {
            filterTasks() {
                let tasks = this.$store.getters["blog/getTasks"] || [];

                let filtered = tasks.filter(task => {
                    return task.title.toLowerCase().includes(this.filter.toLowerCase()) ||
                        task.description.toLowerCase().includes(this.filter.toLowerCase())
                })

                if (this.sort === "1") {
                    filtered = filtered.filter(filter => {
                        return filter.progress.id == 1;
                    });
                } else if (this.sort === '2') {
                    filtered = filtered.filter(filter => {
                        return filter.progress.id == 2;
                    });
                } else if (this.sort === '3') {
                    filtered = filtered.filter(filter => {
                        return filter.progress.id == 3;
                    });
                }

                return filtered;
            }
        },

        created() {
            this.getTasks();
        },
        methods: {
            ...mapActions({
                getTasks: "blog/getTasks"
            }),
            search() {
                return [];
            }
        },
    }
</script>

<style scoped>

</style>