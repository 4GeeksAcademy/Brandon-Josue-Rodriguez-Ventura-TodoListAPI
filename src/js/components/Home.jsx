import React, { useEffect, useState } from "react";

//include images into your bundle


//create your first component

const API_URL_BASE = "https://playground.4geeks.com/todo"
const Home = () => {
	const [todos, setTodos] = useState([])
	const [inputValue,setInputValue] = useState("")

	const GetTodos = async() => {
		try{
			const response = await fetch(API_URL_BASE + "/users/JosuVentu04", {
				method: "GET"
			});
			if (!response.ok){
				throw new Error("Sucedio un error al consultar el endpoint")
			}
			const data = await response.json();
			
			setTodos(data.todos)
			console.log(data)

		}catch(error){
			console.log(error)
		}
	};

	const createTodo = async() =>{
		try {
			let task = {
				"label": inputValue,
				"is_done": false 
			};
			if (inputValue === ""){
				console.log("Lo siento, la tarea no puede ir vacia")
				alert('¡La tarea no puede ir vacia!');
			} 
			else {
			const response = await fetch (API_URL_BASE + "/todos/JosuVentu04", {
				method: "post",
				headers: {
					"Content-Type":"application/json"
				},
				body: JSON.stringify(task)
			});
			if(!response.ok){
				throw new Error("Ocurrio un error al crear la tarea")
			}
			//const data = response.json()
			

			setInputValue(""); // ✅
            GetTodos(); 

		}} catch (error) {
			console.log(error)
		}
		


	}
	const deleteTodo = async(todo_id) =>{
		try {
			const response = await fetch (API_URL_BASE + "/todos/" + todo_id,{
				method: "DELETE",
			});

			if (!response.ok){
				throw new Error("Ocurrio un error eliminando la tarea con id: " + todo_id)
			}
			GetTodos()

		} catch (error) {
			console.log(error)
		}
	}
	const doneTodo = async(e, todo_id) =>{
		try {
			let task = {
				"is_done": e.target.checked
			}
			const response = await fetch (API_URL_BASE + "/todos/" + todo_id, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json"
				  },
				  body: JSON.stringify(task)
				});
				if (!response.ok){
					throw new Error ("Ocurrio un error al actualizar la tarea: " + todo_id)
				}
				GetTodos()

		} catch (error) {
			console.log(error)
		}
	}



	useEffect(() => {
		GetTodos();
	}, []);

	return (
		<div className="container custom-background rounded-3">
			<div className="row">
				<div className="col text-center">
					<h2 className="text-white">Lista de Tareas</h2>
					<input type="text" className="form-control" placeholder="Escribe tu tarea" 
					value={inputValue}
					onChange={(e)=>{
						setInputValue(e.target.value)
					}}
					onKeyDown={(e) => {
						if (e.key === "Enter"){
							createTodo();
						}
					}}/>
				</div>
				
			</div>
			<div className="row">
			<div className="col"> 
					<ul className="list-unstyled">
					{todos.map((todo,index) => {
						return (
							<div key={todo.id} className={todo.is_done ? "margin-done p-1 rounded fs-4 text-white bg-success d-flex justify-content-between" : "margin-no-done p-1 rounded fs-4 text-white bg-danger d-flex justify-content-between"}>
								<li>{todo.label}</li>
								<div className="p-1 margi">
									<input className="form-check-input fs-4" type="checkbox" checked={todo.is_done} 
									onChange={(e) => doneTodo(e, todo.id)}/>
								    <i className="fas fa-trash-alt text-secondary hover-red" 
								    onClick={(e) => {
									    deleteTodo(todo.id) 
								}}></i>
								</div>
							</div>
						)
					})}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Home;