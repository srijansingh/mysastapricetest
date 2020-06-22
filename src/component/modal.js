import React, { Component } from 'react';
import Paper from "@material-ui/core/Paper";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { CircularProgress} from "@material-ui/core";


const styles = (theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width:'300px'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });

 class Modal extends Component {
   constructor(){
     super()
     this.state={
      email: null,
      password: null
     }
   }
    render() {

        const {classes} = this.props;

         let errmsg;
        if(this.props.error){
            errmsg = (
                <Typography fullWidth style={{color:'red'}}>
                    Something is wrong.
                </Typography>
            )
        }
        else{
           errmsg = null
        }


        return (
            <div style={{position:'fixed',width:'100%', height:'90vh', top:'4rem', background: 'rgba(255,255,255,0.8)', display:'flex', flexDirection:'row',alignItems:'space-around'}}>
               <div style={{display:'flex', width:'100%', flexDirection:'column', alignItems:'center', justifyContent:'space-around'}}>
                 <Paper style={{width:'360px', height:'80vh', background:'white', zIndex:'1', display:'flex', flexDirection:'column', alignItem:'center'}}>
                   
                     <div style={{display:'flex', padding:'0.5rem 1rem', height:'2rem', borderBottom:'1px solid #e6e6e6', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                         <div style={{fontSize:'1rem', fontWeight:'bold'}} >Mysastaprice</div>
                         <div onClick={this.props.model} style={{cursor:'pointer'}}>Close</div>
                     </div>
                     <div style={{width:'100%', display:'flex', flexDirection:'row', justifyContent:'space-around', alignItem:'center'}}> 
                     <div className={classes.paper}>
                        {errmsg}
                        <Typography component="h1" variant="h5">
                             Login
                        </Typography>
                         
                        <form
                          onSubmit={e =>
                            this.props.onLogin(e, {
                              email: this.state.email,
                              password: this.state.password
                            })
                        }
                        noValidate autoComplete="off">
                        <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                type="email"
                                // autoComplete="email"
                                // autoFocus
                                onChange = { (event) => this.setState({email : event.target.value})}
                            />
                            
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                // autoComplete="current-password"
                                onChange = { (event) => this.setState({password : event.target.value})}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                disabled = {this.props.loading ? true : false}
                                style={{backgroundColor:'orange' }}
                            >
                            {this.props.loading ? <CircularProgress /> : 'Sign In' }
                            </Button>
         
                        </form>
                     </div>
                     </div>
                 </Paper>
               </div>
            </div>
        )
    }
}


export default withStyles(styles, {withTheme:true})(Modal)