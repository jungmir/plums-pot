import { Form, Input, Switch, Button, Typography, Card, Row, Col, Spin, message } from 'antd';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
  
const EditUserPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const onFinish = async (userData) => {
        try {
            const res = await axios.put(`/users/${id}`, userData);
            console.log(res);
            message.success('수정이 완료되었습니다.');
            navigate(`/users/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios({
                    method: "get",
                    url: `/users/${id}`
                });
                setUser(res.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        fetchUser();
    }, [id])

    if (loading) return <Spin />
  
    return (
        <Card style={{padding: '30px'}}>
            <Card style={{ padding: '10px', maxWidth: '400px', margin: '0 auto' }}>
                <Row justify="space-between">
                    <Col>
                    <Typography.Title level={5} style={{marginBottom: '20px'}}>EDIT USER</Typography.Title>
                    </Col>
                    <Col>
                    <Button style={{width: '12px'}} onClick={() => navigate('/')}>X</Button>
                    </Col>
                </Row>
                
                <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    name: user.name,
                    email: user.email,
                    password: user.password,
                    isActive: user.isActive,
                    isAdmin: user.isAdmin,
                }}
                >
                <Form.Item
                    label="이름"
                    name="name"
                    rules={[
                        { required: true, message: '이름을 입력해주세요.' },
                        { max: 10, message: '10자 이하로 입력해주세요.'}
                    ]}
                >
                    <Input placeholder="사용자 이름" style={{height: '40px'}} />
                </Form.Item>
        
                <Form.Item
                    label="이메일"
                    name="email"
                    rules={[
                    { required: true, message: '이메일을 입력해주세요.' },
                    { type: 'email', message: '유효한 이메일을 입력해주세요.' }
                    ]}
                >
                    <Input placeholder="사용자 이메일" style={{height: '40px'}} />
                </Form.Item>

                <Form.Item
                    label="비밀번호"
                    name="password"
                    style={{ fontSize: '9px' }}
                    rules={[
                        { required: true, message: '비밀번호를 입력해주세요.' },
                        { 
                            pattern: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,16}$/, 
                            message: '문자, 숫자, 특수문자를 포함한 8~16자로 입력해주세요.' 
                        }
                    ]}
                >
                    <Input.Password placeholder="비밀번호" style={{height: '40px'}} />
                </Form.Item>

        
                <Form.Item label="isActive" name="isActive" valuePropName="checked">
                    <Switch className="custom-switch" />
                </Form.Item>
        
                <Form.Item label="isAdmin" name="isAdmin" valuePropName="checked">
                    <Switch className="custom-switch" />
                </Form.Item>
        
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', height: '43px' }}>
                    수정하기
                    </Button>
                </Form.Item>
                </Form>
            </Card>
        </Card>
      
    );
  };
  
  export default EditUserPage;
  