<template>
    <div>
        <div class="container pt-5">
            <div class="row">
                <div class="col-md-6">
                    <h2>Create Task</h2>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Title" v-model="title">
                    </div>
                    <div class="form-group">
                        <textarea class="form-control" placeholder="Description" v-model="description"></textarea>
                    </div>
                    <div class="form-group">
                        <select v-model="progress_id" class="form-control">
                            <option value="">Choose status</option>
                            <option v-for="type in progress" :value="type.id" :key="type.id">{{type.name}}</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label class="typo__label">Employees</label>
                        <multiselect v-model="value" placeholder="Search" label="fullName"
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
        name: "CreateTask",
        components: {
            Multiselect
        },
        data: () => {
            return {
                title: "",
                description: "",
                progress_id: '',
                value: [],
                emp: []
            }
        },
        created() {
            this.getProgress();
            this.getEmployees();
        },
        methods: {
            ...mapActions({
                createTask: "blog/createTask",
                getProgress: "blog/getProgress",
                getEmployees: "blog/getEmployees",
            }),
            submit() {
                let data = {
                    title: this.title,
                    description: this.description,
                    progress_id: this.progress_id,
                    employees: this.emp
                };
                this.createTask(data).then(() => {
                    alert("You have created the article successfully");
                    this.$router.push("/blog");
                }).catch(e => {
                    alert(e)
                })
            },
            handleFileUploads() {
                this.image = this.$refs.image.files[0];
            },
            dispatchAction(name) {
                this.emp.push(name.id);
            }
        },
        computed: {
            ...mapGetters({
                progress: "blog/getProgress",
                employees: "blog/getEmployees"
            })
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>
