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
        console.log(request.params)
        const user = users.find(user => user.id === parseInt(id, 10));
        if (!user) {
            return HttpResponse.json({ message: "User not found" }, { status: 404 });
        }
        return HttpResponse.json(user);
    })
]