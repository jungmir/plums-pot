import { Card, Row, Col, Typography, Button, Spin, Switch, Modal, message } from 'antd'
import { useNavigate, useParams } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserPage = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const handleEdit = () => {
        navigate(`/users/edit/${id}`);
    }
    const handleDelete = () => {
        Modal.confirm({
            title: '정말 삭제하시겠습니까?',
            content: '이 작업은 되돌릴 수 없습니다.',
            okText: '삭제',
            okType: 'default',
            centered: true,
            onOk: async () => {
                try {
                    await axios.delete(`/users/${id}`);
                    message.success('삭제가 완료되었습니다.');
                    navigate('/');
                } catch (error) {
                    console.error(error);
                }
            },
        });
    }

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
        <Card style={{ padding: '30px' }}>
            <Card style={{ padding: '10px', maxWidth: '400px', margin: '0 auto' }}>
                {/* 상단 */}
                <Row justify="space-between">
                    <Col>
                        <Typography.Title level={5} style={{ marginBottom: '20px' }}>USER DETAIL</Typography.Title>
                    </Col>
                    <Col>
                        <Button style={{ width: '12px' }} onClick={() => navigate('/')}>X</Button>
                    </Col>
                </Row>
    
                <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    {/* 이름, 이메일 */}
                    <UserOutlined style={{ fontSize: '68px', border: '1px solid', padding: '30px', borderRadius: '50%', marginBottom: '20px' }} />
                    <Typography.Title level={4} style={{ marginBottom: 0 }}>{user.name}</Typography.Title>
                    <Typography.Text>{user.email}</Typography.Text>
                    
                    {/* 스위치 */}
                    <Row style={{ marginTop: '20px', alignItems: 'center', justifyContent: 'center' }}>
                        <Col style={{ marginRight: '15px', width: '60px' }}>isActive</Col>
                        <Col>
                            <Switch className="custom-switch" checked={user.isActive} disabled />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '6px', alignItems: 'center', justifyContent: 'center' }}>
                        <Col style={{ marginRight: '15px', width: '60px' }}>isAdmin</Col>
                        <Col>
                            <Switch className="custom-switch" checked={user.isAdmin} disabled />
                        </Col>
                    </Row>

                    {/* 수정, 삭제 버튼 */}
                    <Row justify="center" style={{ marginTop: '40px' }}>
                        <Col>
                            <Button type="default" onClick={handleDelete}>삭제</Button>
                        </Col>
                        <Col>
                            <Button type="primary" style={{ marginLeft: '10px' }} onClick={handleEdit}>수정</Button>
                        </Col>
                    </Row>
                </Card>
            </Card>
        </Card>
    );
    
}

export default UserPage;