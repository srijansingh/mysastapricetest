import React, { Component } from 'react';
import  Paper  from "@material-ui/core/Paper";
import "./similar.css";

export default class ProductSlider extends Component {
    render() {
        return (
            <Paper elevation={2} className="product-item">
                <div className="image">
                    <img src={this.props.image}/>
                </div>
                <div className="details">
                    <span className="brand">{this.props.brand}</span>
                    <span className="title">{this.props.title}</span>
                    <span className="rating">{this.props.rating}</span>
                    <span className="price">{this.props.price}</span>
                    <span className="soldby">Sold by Amazon</span>
                </div>
            </Paper>
        )
    }
}
