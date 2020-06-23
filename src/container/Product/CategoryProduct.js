import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Loader from "../../component/Loader";
import "./CategoryProduct.css"
class CategoryProduct extends Component {
    constructor(){
        super()
        this.state = {
            isLoading :false,
            product : [],
            errorMessage : false
        }
    }

    componentDidMount(){
        this.setState({
            isLoading : true
        })

        fetch('https://server.rittzyserver.tk/user/category/'+this.props.match.params.category, {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                Authorization: 'Bearer '+this.props.token
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
                    isLoading:false
            })
        })
        .catch(err => {
            this.setState({
                errorMessage:true,
                isLoading:false
            })
        })
    }
           

    render() {

        let Listing;
            if(this.state.isLoading){
                Listing = (
                    <Loader />
                )
            }

            else if(this.state.errorMessage){
                Listing = (
                    <div>Something is not fine</div>  
                )
            }

            else if(this.state.product.length <1){
                Listing = (
                    <div>Not found</div>  
                )
            }

            else {
                Listing = this.state.product.map((list, index) => {
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
            <div className="flat-box">
                <div style={{color:'#d94711',textAlign:'left'}}>
                    <h1 style={{color:'#d94711',textAlign:'left',fontFamily:'montserrat-bold'}}>{this.props.match.params.category.toUpperCase()}</h1>
                </div>
                <div className="flat-container">
                    {Listing}
                </div>
            </div>
        )
    }
}

export default CategoryProduct;