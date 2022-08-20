const container = document.querySelector('.container');

function TodoList() {
    const [todo, setTodo] = React.useState('');
    const [todoArray, setTodoArray] = React.useState([]);
    const [edit, setEdit] = React.useState({});
    const [warnMsg, setWarnMsg] = React.useState('');
    
    // create
    function createTodo(e) {
        e.preventDefault();

        if (!todo) {
            return setWarnMsg('You need provide todo');
        }

        function createId() {
            return Date.now();
        }

        if (edit.id) {
            const updateTodo = {
                ...edit,
                description: todo,
                done: false
            };
            const searchIndex = todoArray.findIndex(function (todo) {
                return todo.id == edit.id;
            });
            const updateTodos = [...todoArray];
            updateTodos[searchIndex] = updateTodo;
            setTodoArray(updateTodos);
            return cancelEdit();
        } else {
            setTodoArray([...todoArray, {
                id: createId(),
                description: todo,
                done: false
            }]);
        }

        setTodo('');
        setWarnMsg('');
    } 
    
    // edit
    function editTodo(todo) {
        setEdit(todo);
        setTodo(todo.description);
    } 
    
    // delete
    function deleteTodo(todoId) {
        const filterTodo = todoArray.filter(function (todo) {
            return todo.id != todoId;
        });
        setTodoArray(filterTodo);

        if (edit.id) {
            cancelEdit();
        }
    } 
    
    // cancelEdit
    function cancelEdit() {
        setTodo('');
        setEdit({});
        setWarnMsg('');
    }

    function checkTodo(todo) {
        const updateTodo = {
            ...todo,
            done: todo.done ? false : true
        };
        const searchIndex = todoArray.findIndex(function (todoCurrent) {
            return todoCurrent.id == todo.id;
        });
        const updateTodos = [...todoArray];
        updateTodos[searchIndex] = updateTodo;
        return setTodoArray(updateTodos);
    }

    return React.createElement("div", null, React.createElement("h1", {
        className: "title"
    }, "Todo List"), React.createElement("form", {
        onSubmit: createTodo
    }, React.createElement("textarea", {
        type: "text",
        value: todo,
        placeholder: warnMsg || 'Learning React',
        onChange: function (e) {
            setTodo(e.target.value);
        }
    }), React.createElement("button", {
        className: "form-button-1",
        type: "submit"
    }, edit.id ? 'edit' : 'add'), edit.id && React.createElement("button", {
        className: "form-button-2",
        onClick: cancelEdit
    }, "cancel")), todoArray.map(function (getTodo) {
        return React.createElement("div", {
            className: "todolistAll",
            key: getTodo.id
        }, React.createElement("div", {
            className: getTodo.done ? 'check' : ''
        }, getTodo.description), React.createElement("button", {
            className: "todolistAll-btn-1",
            onClick: checkTodo.bind(this, getTodo)
        }, "Check"), React.createElement("button", {
            className: "todolistAll-btn-2",
            onClick: editTodo.bind(this, getTodo)
        }, "Edit"), React.createElement("button", {
            className: "todolistAll-btn-3",
            onClick: deleteTodo.bind(this, getTodo.id)
        }, "Delete"));
    }));
}

ReactDOM.render(React.createElement(TodoList, null), container);