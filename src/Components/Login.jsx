import React, { useContext } from 'react'
import { CRMAuthContext } from '../Context/AuthContext';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import clienteAxios from '../Config/config';

import '../Css/login.css';
import styled from 'styled-components';
import Layout from './Layout';

const StyledCard = styled.div`
box-shadow: 1px 3px 16px 4px #7a7a7a4a ;
`;

const Login = () => {

  const {setAuth} = useContext(CRMAuthContext); 
 
    const onFinish = async (values) => {
     try {
       let data = await clienteAxios.post("login/user", values);
       setAuth({
       auth: true,
       token: data.data.token,
       user: data.data.user  
       })
       
     } catch (error) {
       console.log(error.response);
     }
    };

  return (
    <Layout>
      <StyledCard className="card  col-sm-12 col-md-5  col-lg-6 mx-auto">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon form-control" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon form-control" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Iniciar sesion
        </Button>
        O <NavLink to="/registrate" >
              Registrate
        </NavLink>
          </Form.Item>
        </Form>
      </StyledCard>
    </Layout>
  );
  
}

export default Login
