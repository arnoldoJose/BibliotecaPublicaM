import React, { useContext} from 'react';
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined,PhoneOutlined } from '@ant-design/icons';
import { CRMAuthContext } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';
import clientAxios from '../Config/config';

import '../Css/login.css';
import styled from 'styled-components';
import Layout from './Layout';

const StyledCard = styled.div`
box-shadow: 1px 3px 16px 4px #7a7a7a4a ;
`;

const Register = () => {

 let history = useHistory();

  const { setAuth } = useContext(CRMAuthContext);

  const onRegister = async (values) => {
   let data = await clientAxios.post("register/user",values);
    let  { newUser, token } = data.data;

    setAuth({
      auth: true,
      token:token,
      user: newUser
    });

    if (data.status === 200) history.push("/BibliotecaPublicaM")
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
          onFinish={onRegister}
        >

          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: 'Ingrese su nombre y apellido!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon form-control" />} placeholder="Nombre / apellido" />
          </Form.Item>

          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Ingrese su correo!',
              },
            ]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon form-control" />} placeholder="Correo" />
          </Form.Item>

          <Form.Item
            name="mobile"
            rules={[
              {
                required: true,
                message: 'Ingrese su Numero de Telefono!',
              },
            ]}
          >
            <Input prefix={<PhoneOutlined className="site-form-item-icon form-control" />} min={8} placeholder="Numero" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: 'Ingrese su contraseña!',
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon form-control" />}
              type="password"
              placeholder="Contraseña"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
             Registrarme
        </Button>
  
          </Form.Item>
        </Form>
      </StyledCard>
    </Layout>
  )
}

export default Register
