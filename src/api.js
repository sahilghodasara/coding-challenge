/* eslint-disable no-unused-vars */

const genUrl = (url) => `http://localhost:8888/api/todos/${url}`

function get(url) {
  return fetch(genUrl(url), { credentials: 'same-origin', method: 'GET', headers: { 'Content-Type': 'application/json' } });
}

function post(data) {
  return fetch(genUrl(""), { credentials: 'same-origin', method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
}

function put(url, data) {
  return fetch(genUrl(url), { credentials: 'same-origin', method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
}

function del(url, data) {
  return fetch(genUrl(url), { credentials: 'same-origin', method: 'DELETE', headers: { 'Content-Type': 'application/json' }, body: data });
}

async function loadTodos() {
  return get('').then((res) => res.json());
}

async function deleteTodo(url) {
  return del(url).then((res) => res.json());
}

async function editTodo(url, data) {
  return put(url, data).then((res) => res.json());
}

async function addTodo(data) {
  return post(data).then((res) => res.json());
}

export default {
  loadTodos,
  deleteTodo,
  editTodo,
  addTodo
}
