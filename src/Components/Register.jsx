import React, { useContext,useState} from 'react';
import '../Css/login.css';
import Layout from './Layout';

import { CRMAuthContext } from '../Context/AuthContext';
import { useHistory } from 'react-router-dom';
import { messageError } from '../Utils/alertFuntional';
import validate from '../validateInputs/validate'
import clientAxios from '../Config/config';

import Card from './Card';
// import Swal from 'sweetalert2';


const Register = () => {


  let { nameRef,emailRef,phoneRef,passRef } = validate();
  const [userData,setData] = useState({});

  let history = useHistory();

  const { setAuth } = useContext(CRMAuthContext);

  const onRegister = async (e) => {
    e.preventDefault();
    
    if(!nameRef.current.value || !emailRef.current.value || !phoneRef.current.value || !passRef.current.value){
      messageError("los campos no pueden estar vacios");
      return;
    }
     let data = await clientAxios.post("register/user",userData);
    let  { newUser, token } = data.data;

    setAuth({
      auth: true,
      token:token,
      user: newUser
    });

    if (data.status === 200) history.push("/BibliotecaPublicaM")
  };

  const saveData = (e) => {
    let { name,value } = e.target;

    setData({...userData, [name] : value});
  }

  const validateInputs = () => {
    if (emailRef.current.value.indexOf("@") === -1) emailRef.current.setCustomValidity("el correo no es valido falta @")
    else if (emailRef.current.value.length < 8) emailRef.current.setCustomValidity("el correo debe tener minimo 8 digitos")
    else emailRef.current.setCustomValidity("")

    if (!phoneRef.current.value) phoneRef.current.setCustomValidity("ingrese su numero de telefono")
    else if (phoneRef.current.value.length <= 7) phoneRef.current.setCustomValidity("el numero debe tener 8 digitos")
    else phoneRef.current.setCustomValidity("")
  }

  return (
    <Layout>
     <Card>
        <form onSubmit={onRegister} className='login-form'>
          <div className="form-group register-input">

            <div className="container-input">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
              <input type="text" onChange={saveData} name='name'  ref={nameRef} className="form-control" placeholder='Nombre completo' />
            </div>
          </div>
          <div className="form-group register-input">

            <div className="container-input">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z" />
              </svg>
              <input type="text" onChange={saveData} name='email'  onBlur={validateInputs} ref={emailRef} className="form-control" placeholder='Correo@correo.com' />
            </div>
          </div>
          <div className="form-group register-input">

            <div className="container-input">
              <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
              </svg>
              <input type="tel"  onChange={saveData} name='phone' onBlur={validateInputs} ref={phoneRef} pattern='[1-8]{8}' maxLength="8" className="form-control" placeholder='Telefono +(505)' />
            
            </div>
          </div>
          <div className="form-group register-input">

            <div className="container-input">
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
              </svg>
              <input type="text" onChange={saveData} name='password'  ref={passRef} className="form-control" placeholder='Contraseña' />
            </div>
          </div>
          <div className="d-grid gap-2 col-6 mx-auto">
            <input type="submit" className='btn btn-primary' value="Registrarse" />
          </div>
         
        </form>
     </Card>
    </Layout>
  )
}

export default Register

  // < StyledCard className = "card  col-sm-12 col-md-5  col-lg-6 mx-auto" >
  //   <Form
  //     name="normal_login"
  //     className="login-form"
  //     initialValues={{
  //       remember: true,
  //     }}
  //     onFinish={onRegister}
  //   >

  //     <Form.Item
  //       name="username"
  //       rules={[
  //         {
  //           required: true,
  //           message: 'Ingrese su nombre y apellido!',
  //         },
  //       ]}
  //     >
  //       <Input prefix={<UserOutlined className="site-form-item-icon form-control" />} placeholder="Nombre / apellido" />
  //     </Form.Item>

  //     <Form.Item
  //       name="email"
  //       rules={[
  //         {
  //           required: true,
  //           message: 'Ingrese su correo!',
  //         },
  //       ]}
  //     >
  //       <Input prefix={<UserOutlined className="site-form-item-icon form-control" />} placeholder="Correo" />
  //     </Form.Item>

  //     <Form.Item
  //       name="mobile"
  //       rules={[
  //         {
  //           required: true,
  //           message: 'Ingrese su Numero de Telefono!',
  //         },
  //       ]}
  //     >
  //       <Input prefix={<PhoneOutlined className="site-form-item-icon form-control" />} min={8} placeholder="Numero" />
  //     </Form.Item>
  //     <Form.Item
  //       name="password"
  //       rules={[
  //         {
  //           required: true,
  //           message: 'Ingrese su contraseña!',
  //         },
  //       ]}
  //     >
  //       <Input
  //         prefix={<LockOutlined className="site-form-item-icon form-control" />}
  //         type="password"
  //         placeholder="Contraseña"
  //       />
  //     </Form.Item>

  //     <Form.Item>
  //       <Button type="primary" htmlType="submit" className="login-form-button">
  //         Registrarme
  //       </Button>

  //     </Form.Item>
  //   </Form>
  //     </ >