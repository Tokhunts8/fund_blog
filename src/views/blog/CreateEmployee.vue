<template>
    <div>
        <div class="container pt-5">
            <div class="row">
                <div class="col-md-6">
                    <h2>Create Employee</h2>
                    <div class="form-group">
                        <input type="text" class="form-control" placeholder="Full Name" v-model="fullName">
                    </div>
                    <div class="form-group">
                        <input type="file" ref="image" class="form-control" v-on:change="handleFileUploads()">
                    </div>
                    <div class="form-group">
                        <label class="typo__label">Tasks</label>
                        <multiselect v-model="value" placeholder="Search" label="title"
                                     track-by="id" :options="tasks || []" :multiple="true"
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
        name: "CreateEmployee",
        components: {
            Multiselect
        },
        data: () => {
            return {
                fullName: "",
                image: {},
                value: [],
                task: []
            }
        },
        methods: {
            ...mapActions({
                createEmployee: "blog/createEmployee",
                getTasks: "blog/getTasks",
            }),
            submit() {
                let data = new FormData();
                data.append('fullName', this.fullName);
                data.append('image', this.image);
                data.append('tasks', this.task);

                this.createEmployee(data).then(() => {
                    alert("You have created the article successfully");
                    this.$router.push("/");
                }).catch(e => {
                    alert(e)
                })
            },
            handleFileUploads() {
                this.image = this.$refs.image.files[0];
            },
            dispatchAction(name) {
                this.task.push(name.id);
            }
        },
        computed: {
            ...mapGetters({
                tasks: "blog/getTasks"
            })
        },
        created() {
            this.getTasks();
        }
    }
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>
