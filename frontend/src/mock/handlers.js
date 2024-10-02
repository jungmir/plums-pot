import { http, HttpResponse } from 'msw';

export const handlers = [
  //사용자 목록을 반환하는 GET 핸들러
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Giacomo Guilizzoni Founder & CEO', email: 'giacome12@wire.com', isActive: true },
      { id: 2, name: 'Marco Botton Tuttofare', email: 'marco34@wire.com', isActive: false },
      { id: 3, name: 'Mariah Maclachian', email: 'mariah12@wire.com', isActive: false },
      { id: 4, name: 'Valerie Liberty Head Chef', email: 'valerie34@wire.com', isActive: true },
    ]);
  }),

  //개별 사용자 정보를 반환하는 GET 핸들러
  http.get('/api/users/:id', (req) => {
    const { id } = req.params;
    const users = [
      { id: 1, name: 'Giacomo Guilizzoni Founder & CEO', email: 'giacome12@wire.com', isActive: true },
      { id: 2, name: 'Marco Botton Tuttofare', email: 'marco34@wire.com', isActive: false },
      { id: 3, name: 'Mariah Maclachian', email: 'mariah12@wire.com', isActive: false },
      { id: 4, name: 'Valerie Liberty Head Chef', email: 'valerie34@wire.com', isActive: true },
    ];

    const user = users.find(user => user.id === Number(id));
    if (!user) return HttpResponse.json({ message: `User with id ${id} not found` }, { status: 404 });

    return HttpResponse.json(user, { status: 200 });
  }),

  //POST 요청 핸들러 (사용자 추가)
  http.post('/api/users', async (req) => {
    try {
      const { name, email, isActive, isAdmin } = await req.json();
      const newUser = { id: Date.now(), name, email, isActive, isAdmin };
      
      return HttpResponse.json(newUser, { status: 201 });
    } catch (error) {
      return HttpResponse.json({ message: `Failed to process request: ${error.message}` }, { status: 500 });
    }
  }),

  //PUT 요청 핸들러 (사용자 수정)
  http.put('/api/users/:id', async (req) => {
    const { id } = req.params;
    const updatedUser = await req.json();
    
    return HttpResponse.json({ ...updatedUser, id: Number(id) }, { status: 200 });
  }),

  //DELETE 요청 핸들러 (사용자 삭제)
  http.delete('/api/users/:id', (req) => {
    const { id } = req.params;
    
    return HttpResponse.json({ message: `User with id ${id} deleted.` }, { status: 200 });
  }),
];