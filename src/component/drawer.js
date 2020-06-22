import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import CategoryIcon from '@material-ui/icons/Category';



import"./drawer.css"; 
import { Typography } from '@material-ui/core';

const styles =(theme) => ({
    root: {
      width: '100%',
      maxWidth: 250,
      backgroundColor: theme.palette.background.paper,
    },
  });
 
  

function NestedListItemLink(props) {
    return <ListItem button component="a" {...props} />;
}

class Drawer extends Component {
    constructor(){
        super();
        this.state = {
            isLoading:false,
            category : [],
            open:false,
            toggle:false
        }
    }

    handleClick = () => {
        this.setState({
            open:!this.state.open
        })
    }

    handleToggle = () => {
        this.setState({
            toggle:!this.state.toggle
        })
    }

    componentDidMount(){
        this.setState({
            isLoading:true
        })


        fetch('https://warm-scrubland-66696.herokuapp.com/user/category', {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                if(res.status !==200){
                    throw new Error('Failed to fetch the product')
                }
                return res.json()
            }).then(response => {
                    console.log(response.category)
                    this.setState({
                        category : response.category,
                        isLoading:false
                })
            })
            .catch(err => {
                this.setState({
                    errorCatMessage:true,
                    isLoading:false
                })
            })

    }

    render() {
        const {classes} =this.props

        const category = this.state.category.map((list, index) => {
            return <NestedListItemLink key={index} className={classes.nested} href={"/category/"+list}>
                        {/* <ListItemIcon>
                        <AccountCircleIcon style={{color:"black"}}/>
                        </ListItemIcon> */}
                        <ListItemText primary={list} />
                    </NestedListItemLink>
        })


        let profile;
        if(this.props.isAuth){
          profile = (
                <List component="div" disablePadding> 
               

                    <ListItem button onClick={this.props.logout}>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            )
        }
        else{
           profile = (
            <List component="div" disablePadding> 
                <ListItem button onClick={this.props.modal}>
                    <ListItemText primary="Login" />
                </ListItem>

                <ListItem button onClick={this.props.signup}>
                    
                    <ListItemText primary="Signup" />
                </ListItem>

            </List>

           )         
        }


        let username;
        if(this.props.user!==null && this.props.isAuth){
            const email = this.props.user.split("@")[0].charAt(0).toUpperCase() + this.props.user.split("@")[0].slice(1);

            username = (
                

            <Typography style={{padding:'1rem', fontSize:'1rem',fontWeight:'bold'}} >Hello {email}</Typography>
            )
        }
        else{
           username= (
            <Typography style={{padding:'1rem', fontSize:'1rem', fontWeight:'bold'}} >Welcome Guest</Typography>
           ) 
        }
        return (
            <div className="drawer">
                <div className="list">
                <div className={classes.root}>
                    <List component="nav" aria-label="main mailbox folders">
                        {username}
                        <ListItem button key="1" onClick={this.handleToggle}>
                            <ListItemIcon >
                            <AccountCircleIcon style={{color:'#d94711'}} />
                            </ListItemIcon>
                            <ListItemText primary="My Account" />
                            {this.state.toggle ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                            <Collapse in={this.state.toggle} timeout="auto" unmountOnExit>
                                {profile}
                            </Collapse>

                        <ListItem button key="2" onClick={this.handleClick}>
                            <ListItemIcon >
                                <CategoryIcon style={{color:"#d94711"}}/>
                            </ListItemIcon>
                            <ListItemText primary="Category" />
                            {this.state.open ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                            <Collapse in={this.state.open} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding> 
                                    {category}
                                </List>
                            </Collapse>

                    </List>
                   
                    </div>
                </div>
                <div className="blank" onClick={this.props.open}></div>
            </div>
        )
    }
}

export default withStyles(styles, {withTheme:true})(Drawer);