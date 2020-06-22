import React, {Component} from 'react';
import Consumer from './container/consumer';

import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import {ConfigureStore} from './redux/configureStore';
import SearchAppBar  from "./component/appbar";
import Drawer from "./component/drawer";
import Modal from "./component/modal"
import Signup from "./component/signup";
import './App.css';



const store = ConfigureStore();

class App extends Component {


    state = {
      isOpen: false,
      isModalOpen: false,
      isSignup:false,
      isAuth: false,
      token: null,
      userId: null,
      user:null,
      authLoading: false,
      error: false
    }
  

  handleSignupModal = () => {
    this.setState({
      isSignup:!this.state.isSignup,
      isOpen:false,
      isModalOpen:false
    })
  }

  handleModal = () => {
    this.setState({
      isModalOpen:!this.state.isModalOpen,
      isOpen:false,
      isSignup:false
    })
  }

  handleOpen = () => {
    this.setState({
      isOpen:!this.state.isOpen,
      isModalOpen:false,
      isSignup:false
    })
  }


  // ComponentdidMount

  componentDidMount() {
    const token = localStorage.getItem('token');
    const expiryDate = localStorage.getItem('expiryDate');
    if (!token || !expiryDate) {
      return;
    }
    if (new Date(expiryDate) <= new Date()) {
      this.logoutHandler();
      return;
    }
    const userId = localStorage.getItem('userId');
    const user = localStorage.getItem('user')
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    this.setState({ isAuth: true, token: token, userId: userId, user: user  });
    this.setAutoLogout(remainingMilliseconds);
  }

  //Handlew signup and login

  loginHandler = (event, authData) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: authData.email,
        password: authData.password
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      })
      .then(resData => {
        
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId,
           isModalOpen:false,
          isSignup:false
        });
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        localStorage.setItem('user', resData.email);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
        window.location.reload(false);
      })
      .catch(err => {
       
        this.setState({
          isAuth: false,
          authLoading: false,
          error: true
        });
      });
  };

  //Logout

  logoutHandler = () => {
    this.setState({ isAuth: false, token: null });
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('user');

    window.location.reload(false);
  };

  setAutoLogout = milliseconds => {
    setTimeout(() => {
      this.logoutHandler();
    }, milliseconds);
  };

  errorHandler = () => {
    this.setState({ error: null });
  };



  signupHandler = (event, data) => {
    event.preventDefault();
    this.setState({ authLoading: true });
    fetch('/user/signup', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        name:data.name
      })
    })
      .then(res => {
        if (res.status === 422) {
          throw new Error('Validation failed.');
        }
        if (res.status !== 200 && res.status !== 201) {
          console.log('Error!');
          throw new Error('Could not authenticate you!');
        }
        return res.json();
      }) 
      .then(resData => {
      
        this.setState({
          isAuth: true,
          token: resData.token,
          authLoading: false,
          userId: resData.userId,
          user:resData.email,
          isModalOpen:false,
          isSignup:false
        });
        localStorage.setItem('token', resData.token);
        localStorage.setItem('userId', resData.userId);
        localStorage.setItem('user', resData.email);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        this.setAutoLogout(remainingMilliseconds);
        window.location.reload(false);
      })
      .catch(err => {
      
        this.setState({
          isAuth: false,
          authLoading: false,
          error: true
        });
      });
  }


  


  
  render() {  


    let signup;
    if(this.state.isSignup){
     signup = (
        <Signup 
        signup={this.handleSignupModal}
        onSignup={this.signupHandler}
        loading={this.state.authLoading}
        error={this.state.error}
        />
      )
    }
    else{
      signup =  null
    }
    

    let drawer;
    if(this.state.isOpen){
      drawer = (
        <Drawer 
          modal={this.handleModal} 
          signup={this.handleSignupModal}  
          open={this.handleOpen}
          isAuth={this.state.isAuth}
          user={this.state.user}
          logout={this.logoutHandler}
        />
      )
    }
    else{
      drawer =  null
    }


    let modal;
    if(this.state.isModalOpen){
      modal = (
        <Modal 
       
          model={this.handleModal}
          onLogin={this.loginHandler}
          loading={this.state.authLoading}
          error={this.state.error}
        />
      )
    }
    else{
      modal =  null
    }




    return (
       <Provider store={store}>
        <BrowserRouter>
            <div className="App">
                <Consumer/> 
                <SearchAppBar 
                  isAuths={this.state.isAuth} 
                  useremail={this.state.user} 
                  signup={this.handleSignupModal}
                  modal={this.handleModal} 
                  logout={this.logoutHandler}  
                  open={this.handleOpen}
                />
                {drawer}  
                {modal}
                {signup}
            </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
 