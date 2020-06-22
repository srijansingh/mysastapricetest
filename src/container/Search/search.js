import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from "@material-ui/core/styles";
import "./search.css" 

const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        },
      }
    });

class Search extends Component {
    constructor() {
        super();
        this.state = {
            isLoading:false,
            error:false,
            product:[],
            searchItem:''
        }
    }

    searchHandle = (event) =>{
        event.preventDefault();
        this.setState({
            searchItem : event.target.value,
            isLoading:true
        })

        console.log("SearchItem : "+this.state.searchItem)
        fetch('/user/search/active', {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state)
        })
        .then(res => {
            if(res.status !==200){
                throw new Error('Failed to fetch the product')
            }
            return res.json()
        }).then(response => {
               
                this.setState({
                    product : response.post,
                    isLoading:false
            })
        })
        .catch(err => {
            console.log(err)
            this.setState({
                errorMessage:true,
                isLoading:false
            })
        })
    }
    
    render() {
        const {classes} = this.props;

        let item;
        if(this.state.searchItem ===''){
            item = (
                <div elevation={3} style={{height:'200px', width:'100%', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                    <div style={{display:'flex', alignItem:'center'}}>
                        <SearchIcon style={{color:'#d94711', textAlign:'center',fontSize:'4rem'}} />
                        <div style={{display:'flex',flexDirection:'column',justifyContent:'space-around', alignItem:'center',color:'#a6a6a6',fontSize:'1.2rem',fontWeight:'bold'}}>Start typing ...</div>
                    </div>
                </div>
            )
        }
        else if(this.state.isLoading){
            item = (
               
                <div elevation={3} style={{height:'200px', width:'100%', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                <CircularProgress style={{color:'#d94711'}} />
                </div>
            )
        }
        else if(this.state.searchItem!=='' && this.state.product.length < 1){
            item = (
                <div className={classes.root}>
                <div elevation={3} style={{height:'200px', width:'100%', display:'flex',alignItems:'center', justifyContent:'space-around'}}>
                    <div style={{color:'#a6a6a6',fontSize:'1.2rem',fontWeight:'bold'}}>No search result for "{this.state.searchItem}"</div>
                </div>
            </div>
            )
        }
        else if(this.state.products!==[]){
            item =  this.state.product.map((list, index) => {
                return (
                   
                    <Link key={index} to={"/cat/product/"+ list._id} style={{textDecoration:'none'}}>
                        <div  elevation={2} className="flat-product">
                            <div className="flat-image">
                                <img src={list.image} alt={list.title}/>
                            </div>
                            <div className="flat-details">
                                
                                <span className="flat-title">{list.title.substring(0, 20)}</span>
                                <span className="flat-brand">{list.brand.substring(0, 10)}</span>
                                <span className="flat-rating">{list.rating}</span>
                            </div>
                            <div className="flat-best-box">
                                <div className="flat-best">
                                    <span style={{fontWeight:'bold', fontSize:'1.5rem'}}> Best Price</span>
                                    <span style={{fontWeight:'bold', fontSize:'1.5rem',color:'#d94711'}}>{list.price}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                
                )
            })
        }
       


        return (
            <div className="search-box">
              <div className="search-container">
                 
              
                    <input type="search" placeholder="Search ..." onChange ={ (event) => this.searchHandle(event)}/>
              
                <div>
                    <div className="flat-container">
                       {item}

                    </div>
                </div>
                </div>
            </div>
        )
    }
}


export default withStyles(styles, {withTheme:true})(Search);