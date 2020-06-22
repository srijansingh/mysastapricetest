import React, { Component } from 'react';
import AmazonLogo from "../../../util/amazon.png"
import "./product.css";


export default class Product extends Component {
    constructor(){
        super();
        this.state={
            flipkart:[],
            isLoading:true,
           
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         isLoading : true,
            
    //     })
    //     console.log("Product"+this.props.searchItem)
    //     fetch('http://localhost:8080/user/compare/product', {
    //         method: "POST",
    //         headers: {
    //             "Accept": "application/json",
    //             "Content-Type": "application/json",
    //         },
    //         body : JSON.stringify({searchItem:this.props.searchItem})
    //     })
    //     .then(res => {
    //         if(res.status !==200){
    //             throw new Error('Failed to fetch the product')
    //         }
    //         return res.json()
    //     }).then(response => {
    //             console.log(response)
    //             this.setState({
    //                 flipkart: response,
    //                 isLoading:false
    //         })
    //     })
    //     .catch(err => {
    //         this.setState({
    //             errorMessage:true,
    //             isLoading:false
    //         })
    //     })
    // }
   
    render() {
        return (
            
            <div className="single-product">
            <div className="single-image-list">
                <div className="full-image">
                   <div className="full-image-element">
                       <img src={this.props.image} alt={this.props.title} />
                   </div>
                </div>
            </div>
            <div className="product-container">
                <div className="product-details">
                    <span className="title">{this.props.title}</span>
                    <span className="brand">{this.props.brand}</span>
                    <span className="rating">{this.props.rating}</span>
                   
                    <span className="description">
                        <span style={{fontWeight:'bold', fontSize:'1rem',padding:'0.5rem 0'}}>Product Description</span>
                        <span style={{fontSize:'0.8rem', lineSpacing:'10px'}}>{this.props.description}</span>
                    </span>  

                    <span className="single-product-price">
                        <span style={{fontWeight:'bold', fontSize:'1.5rem',padding:'0.5rem 0',marginRight:'3rem'}}> Best Price</span>
                        <span style={{fontWeight:'bold', fontSize:'1.5rem',padding:'0.5rem 0', color:'#d94711'}}>{this.props.price}</span>
                    </span> 

                     <span className="single-product-price">
                        <span style={{fontWeight:'bold', fontSize:'1.5rem',padding:'0.5rem 0',marginRight:'3rem'}}>From</span>
                        <div className="single-amazon-logo">
                            <img src={AmazonLogo} alt="amazon"/>
                        </div>
                    </span>  
                </div>
                <div>
                    
                        
                       
                </div>
            </div>
          
        </div>
          
       
        )
    }
}
