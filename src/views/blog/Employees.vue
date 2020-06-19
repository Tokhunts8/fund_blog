<template>
    <div>
        <div class="container pt-5">
            <div class="row">
                <div class="col-md-6 pb-3">
                    <b-input-group class="mt-3">
                        <b-input-group-text>Full Name Search:</b-input-group-text>
                        <b-form-input v-model="filter"></b-form-input>
                        <b-input-group-append>
                            <b-button @click="search" variant="info">Search</b-button>
                        </b-input-group-append>
                    </b-input-group>
                </div>
                <div class="col-md-6">
                    <select v-model="sort" class="form-control mt-3">
                        <option value="">Choose Order</option>
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>
            <div class="row">
                <div class="col-md-3 pb-4" v-for="employee in filterEmployees" :key="employee.id">
                    <b-card :title="employee.fullName">
                        <b-card-img-lazy v-if="employee.image != null" :src="employee.image"></b-card-img-lazy>
                        <b-card-img-lazy v-else src="/user.png"></b-card-img-lazy>
                        <b-card-body title="Tasks">
                            <p v-for="task in employee.tasks" :key="task.id">{{task.title}}</p>
                        </b-card-body>
                        <router-link :to="'/edit/'+employee.id">See</router-link>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {mapActions} from "vuex"

    export default {
        name: "Employees",
        data: () => {
            return {
                searchQuery: "",
                filter: "",
                sort: ""
            }
        },
        computed: {
            filterEmployees() {
                let employees = this.$store.getters["blog/getEmployees"] || [];

                let filtered = employees.filter(employee => {
                    return employee.fullName.toLowerCase().includes(this.filter.toLowerCase()) ||
                        employee.tasks.filter(task => {
                            task.title.toLowerCase().includes(this.filter.toLowerCase())
                        });
                })


                if (this.sort === "asc") {
                    filtered.sort((a, b) => a.fullName.localeCompare(b.fullName))
                } else if (this.sort === 'desc') {
                    filtered.sort((a, b) => b.fullName.localeCompare(a.fullName))
                }

                return filtered;
            }
        },

        created() {
            this.getEmployees();
        },
        methods: {
            ...mapActions({
                getEmployees: "blog/getEmployees",
            }),
            search() {
                return [];
            }
        },
    }
</script>

<style scoped>

</style>
