import React, { Component } from 'react'
import Product from './component/Product'
import Paper from "@material-ui/core/Paper"
import "./singleproduct.css";
import { CircularProgress } from '@material-ui/core';

export default class SingleProduct extends Component {
     constructor(){
        super()
        this.state = {
            isLoading :false,
            product :[],
            title:null,
            brand:null,
            rating:null,
            price:null,
            image:null,
            description:null,
            link:null,
            flipkart:[],
            isBrandLoading:false,
            errorBrandMessage:false,

            errorMessage : false
        }
    }

    componentDidMount(){
        this.setState({
            isLoading : true
        })

        fetch('/user/product/'+this.props.match.params._id, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            }
        })
        .then(res => {
            if(res.status !==200){
                throw new Error('Failed to fetch the product')
            }
            return res.json()
        }).then(response => {
              
                this.setState({
                    product : response.post,
                    title:response.post.title,
                    brand:response.post.brand,
                    rating:response.post.rating,
                    price:response.post.price,
                    description:response.post.description,
                    image:response.post.image,
                    link:response.post.link.split('=')[0] + '=as_li_tl&tag=mysastaprice-21',
                    searchItem:response.post.title.substring(0,25),

                    isLoading:false
            })

        
            fetch('/user/compare/product', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body : JSON.stringify({searchItem:this.state.title.substring(0,25)})
                })
                .then(res => {
                    if(res.status !==200){
                        throw new Error('Failed to fetch the product')
                    }
                    return res.json()
                })
                .then(response => {
                   
                    this.setState({
                        flipkart: response.post,
                        isLoading:false
                    })  
                })
               
                   


            
                })
                .catch(err => {
                    this.setState({
                        errorMessage:true,
                        isLoading:false
                })
            })


                // Dont

                


        
    }




    render() {
       
       const item =  this.state.flipkart.filter(data => {
            if(data.title.includes(this.state.title.substring(0,20))){
                return data;
            }
            else{
                return null;
            }
        })
        .map((data, index) => {
          
            return (
                <div key={index} style={{margin:'20px'}}>
                    <Paper elevation={2} style={{width:'200px',borderRadius:'20px',justifyContent:'space-around',padding:'0.5rem', textAlign:'center',alignItems:'center',display:'flex',flexDirection:'column', flexWrap:'wrap'}}>
                    <div className="amazon-logo">
                            <img src={data.image} alt="Flipkart"/>
                        </div>
                        
                        <div style={{fontSize:'20px',color:'blue', fontWeight:'bold'}}>{data.price}</div>
                        <div style={{fontSize:'15px', padding:'0.3rem'}}>{data.title}</div>
                    </Paper>
                </div>
            )
        })

        let other;
        if(item.length < 1){
            other = (
                <Paper   style={{display:'flex',width:'300px',padding:'2rem 3rem', flexDirection:'column',justifyContent:'space-around',alignItems:'center'}}> No other sellers available</Paper>
            )
        }
        else{
            other = (
            item
            )
        }

        

        let product;

        if(this.state.isLoading){
            product = (
                <div><CircularProgress style={{color:'orange'}} /></div>
            )
        }
        else{
            product = (
                <div className="description-container">
                    <Product  
                        title={this.state.title}
                        brand = {this.state.brand}
                        price={this.state.price}
                        rating={this.state.rating}
                        link={this.state.link}
                        description={this.state.description}
                        image={this.state.image}
                        loading={this.state.isLoading}


                    />
                   <div style={{display:'flex', flexDirection:'column',justifyContent:'space-around',alignItems:'center', marginTop:'2rem'}}>
                       <h1>Other Sellers</h1>
                        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'space-around', alignItems:'center'}}>
                            {other}
                        </div>
                   </div>
               </div>
            )
        }

       

        

       

        return (
            <div className="description-box">
                {product}
               </div>
        )
    }
}
