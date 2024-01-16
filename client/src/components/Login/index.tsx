import { Button, Col, Form, Input, Row, Typography, message } from "antd";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  async function onFinish(values: { email: string; password: string }) {
    try {
      await auth.authenticate(
        values.email,
        values.password
      ).then((result)=>{
        if(result){
          message.success("Logged successufully")
          navigate("/home");

          console.log(result)

        } else{
          return message.error("Email or password are incorrect")
        }
      })
      
    } catch (error) {
      message.error("An error occurred during authentication");
    }
  }

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col xs={24} sm={20} md={16} lg={12} xl={10}>
        <Title level={2} style={{ textAlign: "center" }}>
          Login
        </Title>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          onFinish={onFinish}
        >
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>

          <Form.Item label="Password" name="password">
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <a type="primary" onClick={()=>navigate("/register")}>
              register
            </a>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};
