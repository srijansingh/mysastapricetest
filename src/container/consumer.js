import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Category from './Category/category';
import { fetchCategory } from '../redux/actionCreators';
import CategoryProduct from './Product/CategoryProduct';
import SingleProduct from './Product/SingleProduct';
import Search from './Search/search';
const mapStateToProps = (state) => {
    
    return {
         category : state.category,
         categoryProduct : state.categoryProduct
    }
}

const mapDispatchToProps =(dispatch) => ({
    fetchCategory : () => {dispatch(fetchCategory())},
})

class Consumer extends Component {



   componentDidMount(){
       this.props.fetchCategory();
   }

    render() {
        return ( 
            <div style={{position:'absolute', top:'4rem', width:'100%'}}>
                <Switch> 
                    <Route exact path="/" component={() => <Category category={this.props.category} />} /> 
                    <Route exact path="/category/:category" component={CategoryProduct}/>     
                    <Route exact path="/cat/product/:_id" component={SingleProduct}/>    
                    <Route exact path="/search" component={Search}/>   
                </Switch>
            </div>
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Consumer))