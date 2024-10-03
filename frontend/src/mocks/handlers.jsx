// MSW 라이브러리에서 http 객체를 가져옴.
import { http, HttpResponse } from 'msw'
import data from './data.json'

// JSON 파일에서 가져온 사용자 데이터를 변수에 할당
let users = data.users

// 모든 API 핸들러를 포함하는 배열을 내보냅니다.
export const handlers = [
  // GET /api/users 요청을 처리하는 핸들러
  http.get('/api/users', () => {
    return HttpResponse.json(users)
  }),

  // 개별 사용자 정보를 제공하는 새로운 핸들러
  http.get('/api/users/:id', ({ params }) => {
    const { id } = params
    const user = users.find(u => u.id === Number(id))
    
    if (user) {
      return HttpResponse.json(user)
    } else {
      return new HttpResponse(JSON.stringify({ message: "사용자를 찾을 수 없습니다" }), { status: 404 })
    }
  }),

  // POST /api/users 요청을 처리하는 핸들러 (새 사용자 추가)
  http.post('/api/users', async ({ request }) => {
    const newUser = { id: users.length + 1, ...(await request.json()) }
    users.push(newUser)
    return HttpResponse.json(newUser, { status: 201 })
  }),

  // PUT /api/users/:id 요청을 처리하는 핸들러 (사용자 정보 수정)
  http.put('/api/users/:id', async ({ params, request }) => {
    const { id } = params
    const updatedUserIndex = users.findIndex(user => user.id === Number(id))

    if (updatedUserIndex > -1) {
      const updatedUser = { ...users[updatedUserIndex], ...(await request.json()) }
      users[updatedUserIndex] = updatedUser
      return HttpResponse.json(updatedUser)
    }
    return new HttpResponse(JSON.stringify({ message: "User not found" }), { status: 404 })
  }),

  // DELETE /api/users/:id 요청을 처리하는 핸들러 (사용자 삭제)
  http.delete('/api/users/:id', ({ params }) => {
    const { id } = params
    users = users.filter(user => user.id !== Number(id))
    return HttpResponse.json({ message: "User deleted" })
  })
]