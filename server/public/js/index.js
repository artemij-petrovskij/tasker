var app = new Vue({
    el: '#form',
    data: {
        res: '',
        controls: {
            label: '',
            text: ''
        }
    },
    methods: {

        fetchData: async function () {
            let res = await fetch('/getTasks')
            let data = await res.json()
            return data.reverse()
        },
        sendData: function (label, text) {
            let data = {
                label: label,
                text: text,
                date: new Date()
            }
            fetch('/api/addTask', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            this.getData()

        },
        clearForm: function () {
            this.controls.label = ''
            this.controls.text = ''
        },
        checkForm: function (e) {
            if (!this.controls.label && !this.text) {
                this.errorMessage('Заполните форму')
                return
            }
            if (!this.controls.label) {
                this.errorMessage('Введите название задачи')
            }
            if (!this.controls.text) {
                this.errorMessage('Введите название задачи')
            }
            if (this.controls.label && this.controls.text) {
                this.sendData(this.controls.label, this.controls.text)
                this.clearForm()
                this.successMessage(`Задача добавлена`)
            }
            e.preventDefault();
        },
        getData: async function () {
            this.res = await this.fetchData()
        },
        errorMessage(err) {
            this.$message(err);
        },
        successMessage(message) {
         
            this.$notify({
                title: 'Готово!',
                message: message,
                type: 'success'
            });
        },
    }
})



var app2 = new Vue({
    el: '#tasks-output',
    data: {
        res: ''
    },
    async created() {
        this.res = await this.fetchData()
    },
    methods: {

        fetchData: async function () {
            let res = await fetch('/getTasks')
            let data = await res.json()
            return data.reverse()
        },
        deleteTask: function (e) {
            let data = { id: e.target.value }
            fetch('/api/delTask', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
    
            this.successMessage(`Задача удалена`)
            this.getData()
        },
        getData: async function () {
            this.res = await this.fetchData()
        },
        deleteTaskTEST() {
            this.$confirm('Удалить задачу?', 'Предупреждение', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            }).then(() => {
                this.deleteTask1()
                this.$message({
                    type: 'success',
                    message: 'Delete completed'
                });
               
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: 'Delete canceled'
                });
            });
        },
        errorMessage(err) {
            this.$message(err);
        },
        successMessage(message) {
         
            this.$notify({
                title: 'Готово!',
                message: message,
                type: 'success'
            });
        },
    }
})