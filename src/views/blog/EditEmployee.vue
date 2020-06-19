<template>
    <div>
        <div class="container pt-5">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <input type="text" ref="fullName" class="form-control" placeholder="Full Name"
                               :value="employee.fullName">
                    </div>
                    <div class="form-group">
                        <input type="file" ref="image" class="form-control" v-on:change="handleFileUploads()">
                    </div>
                    <div class="form-group">
                        <label class="typo__label">Tasks</label>
                        <multiselect ref="tasks" v-model="employee.tasks" placeholder="Search" label="title"
                                     track-by="id" :options="tasks || []" :multiple="true"
                                     @select="dispatchAction"></multiselect>
                    </div>
                    <div class="form-group">
                        <button ref="btn" class="btn btn-success d-none" @click="submit">Submit</button>
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
        name: "EditEmployee",
        data: () => {
            return {
                file: '',
                value: [],
                task: [],
            }
        },
        components: {
            Multiselect
        },
        methods: {
            ...mapActions({
                getTasks: "blog/getTasks",
                getEmployees: "blog/getEmployees",
                editEmployee: "blog/editEmployee",
            }),
            submit() {
                let tasks = [];
                this.$refs.tasks.value.forEach(function (value) {
                    tasks.push(value.id);
                });

                let formData = new FormData();
                formData.append('fullName', this.$refs.fullName.value)
                if (this.file != '') formData.append('image', this.file)
                formData.append('id', this.$route.params.id)
                formData.append('tasks', tasks)
                formData.append('_method', 'put')

                this.editEmployee(formData).then(() => {
                    alert("You have updated the employee successfully");
                    this.$router.push("/");
                }).catch(e => {
                    alert(e.errors)
                })
            },
            handleFileUploads() {
                this.file = this.$refs.image.files[0];
            },
            dispatchAction(name) {
                this.task.push(name.id);
            }
        },
        computed: {
            ...mapGetters({
                employee: "blog/getEmployee",
                tasks: "blog/getTasks"
            }),
        },
        created() {
            this.getTasks();
            let id = "?id=" + this.$route.params.id;
            this.getEmployees(id);
            this.value = this.employee.tasks;
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>
