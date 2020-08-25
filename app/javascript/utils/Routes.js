// experiment routes
export function home_path() {
  return "/home";
}

export function polls_path() {
  return "/polls";
}

export function votes_path() {
  return "/vote";
}

// export function logout_path() {
//   return "/logout";
// }
//
// export function login_path() {
//   return "/login";
// }

//
export function tasks_path() {
  return "/tasks";
}

export function new_task_path() {
  return "/tasks/new";
}

export function task_path(id) {
  return `/tasks/${id}`;
}

export function edit_task_path(id) {
  return `/tasks/${id}/edit`;
}

export function users_path() {
  return "/users";
}

export function create_session_path() {
  return "/session";
}

export function login_path() {
  return "/session/new";
}

export function logout_path() {
  return "/logout";
}

export function task_comments_path(task_id) {
  return `/tasks/${task_id}/comments`;
}
