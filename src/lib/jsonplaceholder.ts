import { isLocal, sleep } from "./utils";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export type User = {
    id: number;
    name: string;
    username: string;
    email: string;
    phone: string;
    website: string;
    company: { name: string };
    address: { city: string };
};

export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
};

export type Comment = {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
};

async function getJson<T>(path: string): Promise<T> {
    isLocal && (await sleep(1500));

    const res = await fetch(`${BASE_URL}${path}`);

    if (!res.ok) throw new Error(`JSONPlaceholder request failed (${res.status}): ${path}`);

    return res.json() as Promise<T>;
}

export const fetchUsers = () => getJson<User[]>("/users");
export const fetchPosts = () => getJson<Post[]>("/posts?_limit=12");
export const fetchTodos = () => getJson<Todo[]>("/todos?_limit=20");

export const fetchUser = (id: number) => getJson<User>(`/users/${id}`);
export const fetchPost = (id: number) => getJson<Post>(`/posts/${id}`);
export const fetchPostsByUser = (userId: number) => getJson<Post[]>(`/posts?userId=${userId}`);
export const fetchPostComments = (postId: number) => getJson<Comment[]>(`/posts/${postId}/comments`);
