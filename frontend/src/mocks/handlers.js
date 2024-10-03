import { http, HttpResponse } from "msw";
import { users } from "./dummy.json";

let userIdCounter = users.length + 1;

export const handlers = [
    //사용자 목록
    http.get("/users/all", () => {
        return HttpResponse.json(users);
    }),

    //사용자 추가
    http.post("/users", async ({request}) => {
        const newUser = {
            id: userIdCounter++,
            ...(await request.json()),
        }
        users.push(newUser);
        return HttpResponse.json(newUser, {status: 201});
    }),

    //사용자 상세 조회
    http.get("/users/:id", (request) => {
        const {id} = request.params;
        const user = users.find(user => user.id === parseInt(id, 10));
        if (!user) {
            return HttpResponse.json({ message: "User not found" }, { status: 404 });
        }
        return HttpResponse.json(user);
    }),

    //사용자 수정
    http.put("/users/:id", async ({params, request}) => {
        const userId = parseInt(params.id, 10);
        const updatedData = await request.json();
        const userIndex = users.findIndex((user) => user.id === userId);

        if (userIndex !== -1) {
            users[userIndex] = { ...users[userIndex], ...updatedData };
            return HttpResponse.json(users[userIndex], { status: 200 });
        } else {
            return HttpResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
        }
    }),

    //사용자 삭제
    http.delete("/users/:id", (request) => {
        const {id} = request.params;
        const userIndex = users.findIndex((user) => user.id === parseInt(id));
        if (userIndex === -1) {
            return HttpResponse.json({ error: "User not found." }, { status: 404 });
        }
        users.splice(userIndex, 1);
        return HttpResponse.json({ message: "User deleted successfully." }, { status: 200 });
    })
]