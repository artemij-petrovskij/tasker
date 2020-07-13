var app = new Vue({
    el: '#app',
    data: {
        res: '',
        controls: {
            label: '',
            text: ''
        }
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
        deleteTask1: function (e) {
            let data = {id : e.target.value }
            fetch('/api/delTask', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            let test = `Задача удалена`
            console.log(this.controls.text)
            this.successMessage(test)
            this.getData()
        },
        getData: async function () {
            this.res = await this.fetchData()
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
        deleteTask() {
            this.$confirm('Удалить задачу?', 'Предупреждение', {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type: 'warning'
            }).then(() => {
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
            console.log(message)
            this.$notify({
                title: 'Готово!',
                message: message,
                type: 'success'
            });
        },
    }
})