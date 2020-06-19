import axios from "axios"

export default {
    namespaced: true,
    state: {
        employees: [],
        employee: {},
        tasks: [],
        task: {},
        progress: [],
    },

    getters: {
        getEmployees(state) {
            return state.employees.data;
        },
        getTasks(state) {
            return state.tasks.data;
        },
        getProgress(state) {
            return state.progress;
        },
        getEmployee(state) {
            return state.employee;
        },
        getTask(state) {
            return state.task;
        },
    },

    mutations: {
        SET_EMPLOYEES(state, employees) {
            state.employees = employees
        },
        SET_TASKS(state, tasks) {
            state.tasks = tasks
        },
        SET_EMPLOYEE(state, employee) {
            state.employee = employee;
        },
        SET_TASK(state, task) {
            state.task = task;
        },
        SET_PROGRESS(state, progress) {
            state.progress = progress
        },
    },

    actions: {
        getEmployees({commit}, form = "") {
            commit("SET_EMPLOYEE", ""); // Removing article (It shows as computed before the new title got from api)
            return new Promise((resolve) => {
                axios({
                    method: 'get',
                    url: process.env.VUE_APP_API_URL + "api/v1/employee" + `${form}`,
                }).then(response => {
                    if (form != "") {
                        commit("SET_EMPLOYEE", response.data.data);
                    } else {
                        commit("SET_EMPLOYEES", response.data);
                    }
                    resolve(true)
                }).catch(error => {
                    alert(error.response.data.message);
                })
            })
        },
        getTasks({commit}, form = "") {
            commit("SET_TASK", ""); // Removing article (It shows as computed before the new title got from api)
            return new Promise((resolve) => {
                axios({
                    method: 'get',
                    url: process.env.VUE_APP_API_URL + "api/v1/task" + `${form}`,
                }).then(response => {
                    if (form != "") {
                        commit("SET_TASK", response.data.data);
                    } else {
                        commit("SET_TASKS", response.data);
                    }
                    resolve(true)
                }).catch(error => {
                    alert(error.response.data.message);
                })
            })
        },
        getProgress({commit}) {
            return new Promise((resolve) => {
                axios({
                    method: 'get',
                    url: process.env.VUE_APP_API_URL + "api/v1/progress",
                    // headers: {
                    //     "Authorization": "Bearer " + localStorage.getItem("token"),
                    // }
                }).then(response => {
                    commit("SET_PROGRESS", response.data.data);
                    resolve(true)
                }).catch(error => {
                    alert(error.response.data.message);
                })
            })
        },
        editEmployee(_, data) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: process.env.VUE_APP_API_URL + "api/v1/employee/" + data.get('id'),
                    data,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(() => {
                    resolve(true);
                }).catch(error => {
                    reject(error.response.data.message)
                })
            })
        },
        editTask(_, data) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'put',
                    url: process.env.VUE_APP_API_URL + "api/v1/task/" + data.id,
                    data,
                }).then(() => {
                    resolve(true);
                }).catch(error => {
                    reject(error.response.data.message)
                })
            })
        },
        createEmployee(_, data) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: process.env.VUE_APP_API_URL + "api/v1/employee",
                    data,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }).then(() => {
                    resolve(true);
                }).catch(error => {
                    reject(error.response.data.message)
                })
            })
        },
        createTask(_, data) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: process.env.VUE_APP_API_URL + "api/v1/task",
                    data,
                    // headers: {
                    //     'Content-Type': 'multipart/form-data'
                    // }
                }).then(() => {
                    resolve(true);
                }).catch(error => {
                    reject(error.response.data.message)
                })
            })
        },
        comment(_, data) {
            return new Promise((resolve, reject) => {
                axios({
                    method: 'post',
                    url: process.env.VUE_APP_API_URL + "api/v1/comment",
                    data,
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token"),
                    }
                }).then(() => {
                    resolve(true);
                }).catch(error => {
                    reject(error.response.data.message)
                })
            })
        }
    }
}
