import { Form, Input, Switch, Button, Typography, Card, Row, Col, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
  
const AddUserPage = () => {
    const navigate = useNavigate();
    const onFinish = async (userData) => {
        try {
            const res = await axios.post('/users', userData);
            console.log(res);
            message.success('추가가 완료되었습니다.');
            navigate('/');
        } catch (error) {
            console.error(error);
        }
    };
  
    return (
        <Card style={{padding: '30px'}}>
            <Card style={{ padding: '10px', maxWidth: '400px', margin: '0 auto' }}>
                <Row justify="space-between">
                    <Col>
                    <Typography.Title level={5} style={{marginBottom: '20px'}}>ADD USER</Typography.Title>
                    </Col>
                    <Col>
                    <Button style={{width: '12px'}} onClick={() => navigate('/')}>X</Button>
                    </Col>
                </Row>
                
                <Form
                layout="vertical"
                onFinish={onFinish}
                initialValues={{
                    isActive: true,
                    isAdmin: false,
                }}
                >
                <Form.Item
                    label="이름"
                    name="name"
                    rules={[{ required: true, message: '이름을 입력해주세요.' }]}
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
        
                <Form.Item label="isActive" name="isActive" valuePropName="checked">
                    <Switch className="custom-switch" />
                </Form.Item>
        
                <Form.Item label="isAdmin" name="isAdmin" valuePropName="checked">
                    <Switch className="custom-switch" />
                </Form.Item>
        
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%', height: '43px' }}>
                    추가하기
                    </Button>
                </Form.Item>
                </Form>
            </Card>
        </Card>
      
    );
  };
  
  export default AddUserPage;
  