new Vue({
    el: '#app',
    data() {
        return {
            isDark: true,
            show: true,
            todoTitle: '',
            todos: []
        }
    },
    created() {
      fetch('/api/todo', {
          method: "get"
      }).then(res=>res.json())
          .then((data)=>{
              console.log(data)
              this.todos = data
          })
          .catch(e=>console.log(e))
    },
    methods: {
        addTodo() {
            const title = this.todoTitle.trim()
            if (!title) {
                return
            }
            fetch('/api/todo', {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({title})
            }).then(res=> {
                return res.json()
            }).then((todo)=>{
                console.log(todo);
                this.todos.push(todo)
                this.todoTitle = '';
            })
        },
        async removeTodo(id) {
            try {
                await fetch(`/api/todo/${id}`, {method: 'delete'})
                this.todos = this.todos.filter(t => t.id !== id)
            } catch (e) {
                console.log(e)
            }
        },
        changeTodo(id){
            fetch(`/api/todo/${id}`, {
                method: "put",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({done: true})
            })
                .then(res=>res.json())
                .then(todo=>{
                    const idx = this.todos.findIndex(t=>t.id === todo.id)
                    this.todos[idx].updatedAt = todo.updatedAt;
                })
                .catch(err=>console.log(err) )
        }
    },
    filters: {
        capitalize(value) {
            return value.toString().charAt(0).toUpperCase() + value.slice(1)
        },
        date(value, withTime = false) {
            const option = {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }
            if (withTime){
                option.hour = '2-digit',
                option.minute = '2-digit',
                option.second = '2-digit'
            }

            return new Intl.DateTimeFormat('ru-RU', option).format(new Date(value))
        }
    }
})