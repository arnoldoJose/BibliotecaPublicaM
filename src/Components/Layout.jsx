import React, {useContext} from 'react'
import logo from '../Img/logo.png';
import { CRMAuthContext } from '../Context/AuthContext';
import { CRMContext } from '../Context/Provider'
import styled from 'styled-components';
import { Layout, Menu } from 'antd';
import {
  PoweroffOutlined,
  ReadOutlined,
  UserOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import '../Css/layaoutstyle.css';
import { NavLink, withRouter,useHistory } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const StyledLogo = styled.div`
.logo{
  display: flex;
  align-items: center;
  justify-content: center;
}
`

const LayoutMain = ({children}) => {

  const history = useHistory();
  const { auth, setAuth} = useContext(CRMAuthContext);
  const { stateKey, setKey } =  useContext(CRMContext);
 
  const captureKey = (e) => {
    setKey(Number(e.key))
  }

  const vamos = () => {
    setAuth({auth:false,token: "",user: ""});
   history.replace("/Inicio");
  }

  return (
    <Layout>
      <Sider
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <StyledLogo>
         <div className="logo">
            <img src={logo} height="110" width="110" alt="" />
         </div>
        </StyledLogo>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={[`${stateKey}`]}>
          <Menu.Item key="1" onClick={captureKey} icon={<ReadOutlined />}>
            <NavLink to="Inicio">
              Libros
            </NavLink>
        </Menu.Item>
         {(!auth.auth) ?
            (null)
            
            : (<Menu.Item key="2" onClick={captureKey} icon={<HistoryOutlined />}>
              <NavLink to="/loans">
                Mis prestamos
            </NavLink>
            </Menu.Item>)
         }
    
          { (!auth.auth) ? 
            (<Menu.Item key="3" onClick={captureKey} icon={<UserOutlined />}>
              <NavLink to="/login">
                Iniciar sesion
            </NavLink>
            </Menu.Item>)
            : (<Menu.Item key="4" onClick={vamos}  icon={<PoweroffOutlined />}>
                Cerrar sesion
            </Menu.Item>)
          }  

        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} >
         <div className="container text-center mt-2">
            <h2 className="title-layout">Biblioteca Publica de Totogalpa</h2>
         </div>
        </Header>
        <Content style={{ margin: '24px 16px 0', marginTop: '6em' ,overflow: 'initial' }}>
          <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
            {children}
        </div>
        </Content>
        
      </Layout>
    </Layout>
  )
}

export default withRouter(LayoutMain)

