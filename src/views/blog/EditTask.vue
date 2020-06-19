<template>
    <div>
        <div class="container pt-5">
            <div class="row">
                <div class="col-md-6">
                    <h2>Create Task</h2>
                    <div class="form-group">
                        <input type="text" ref="title" class="form-control" placeholder="Title" :value="task.title">
                    </div>
                    <div class="form-group">
                        <textarea ref="description" class="form-control" placeholder="Description"
                                  :value="task.description"></textarea>
                    </div>
                    <div class="form-group">
                        <select ref="progress" v-model="task.progress_id" class="form-control">
                            <option v-for="type in progress" :value="type.id" :key="type.id">{{type.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="typo__label">Employees</label>
                        <multiselect ref="employees" v-model="task.employees" placeholder="Search" label="fullName"
                                     track-by="id" :options="employees || []" :multiple="true"
                                     @select="dispatchAction"></multiselect>
                    </div>
                    <div class="form-group">
                        <button class="btn btn-success" @click="submit">Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from "vuex"
    import Multiselect from 'vue-multiselect'

    export default {
        name: "EditTask",
        data: () => {
            return {
                file: "",
                value: [],
                emp: []
            }
        },
        components: {
            Multiselect
        },
        methods: {
            ...mapActions({
                getTasks: "blog/getTasks",
                getEmployees: "blog/getEmployees",
                getProgress: "blog/getProgress",
                editTask: "blog/editTask",
            }),
            submit() {
                let employees = [];
                this.$refs.employees.value.forEach(function (value) {
                    console.log(value);
                    employees.push(value.id);
                });

                let data = {
                    id: this.$route.params.id,
                    title: this.$refs.title.value,
                    description: this.$refs.description.value,
                    progress_id: this.$refs.progress.value,
                    employees: employees
                };

                this.editTask(data).then(() => {
                    alert("You have created the article successfully");
                    this.$router.push("/tasks");
                }).catch(e => {
                    alert(e.errors)
                })
            },
            handleFileUploads() {
                this.file = this.$refs.image.files[0];
            },
            dispatchAction(name) {
                this.emp.push(name.id);
            }
        },
        computed: {
            ...mapGetters({
                employees: "blog/getEmployees",
                task: "blog/getTask",
                progress: "blog/getProgress"
            })
        },
        created() {
            this.getEmployees();
            this.getProgress();
            let id = "?id=" + this.$route.params.id;
            this.getTasks(id);
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>

