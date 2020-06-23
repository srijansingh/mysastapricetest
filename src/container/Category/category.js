import React, { Component } from 'react'
import CategoryLists from './component/categoryLists';
import { Link } from "react-router-dom";
import "./category.css";
import { withStyles, CircularProgress } from '@material-ui/core'


const styles = (theme) => ({
  root: {
      display:'flex '
  }});


class Category extends Component {
  constructor(){
    super()
    this.state = {
        isLoading :false,
        product : [],
        isCatLoading: false,
        category: [],
        errorMessage : false,
        errorCatMessage : false
    }
}

componentDidMount(){
    this.setState({

        isCatLoading:true
    });


    fetch('https://server.rittzyserver.tk/user/category', {
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
            
            this.setState({
                category : response.category,
                isCatLoading:false
        })
    })
    .catch(err => {
        this.setState({
            errorCatMessage:true,
            isCatLoading:false
        })
    })

}
       
  
    render() {
       

            


            let menu;
           
                if(this.state.isCatLoading){
                   menu = (
                      <div>
                        <CircularProgress style={{color:'#d94711'}}/>
                      </div>
                    )
                  }
                  else if(this.state.errorCatMessage){
                    menu  =(
                      <div className="container">
                        <div className="row">
                          {this.props.errMess}
                        </div>
                      </div>
                    )
                  } 
                  else if(this.state.category.length >0){
                      menu = this.state.category.map((category, index) => {
                         
                          return (
                            <Link style={{textDecoration:'none'}} to={"/category/"+ category}  key={index}>
                                <div>
                                    <CategoryLists category={category.toUpperCase()} />
                                </div> 
                            </Link>   
                          )
                      })
                  }
                    
            
       
        return (
            <div className="category">
                <div className="explore">
                    
                  <div className="grid">
                    {menu}
                </div>
                </div>
            </div>
        )
    }
}


export default withStyles(styles, {withTheme:true})(Category);