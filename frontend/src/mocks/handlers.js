import { http, HttpResponse } from "msw";
import dummy from "./dummy.json";

let users = dummy.users;

export const handlers = [
    //사용자 목록
    http.get("/users/all", () => {
        return HttpResponse.json(users);
    }),

    //사용자 추가
]