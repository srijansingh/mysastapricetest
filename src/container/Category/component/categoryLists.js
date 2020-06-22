import React, { Component } from 'react'
import { withStyles } from '@material-ui/core'
import Paper from "@material-ui/core/Paper";



const styles = (theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
          margin: theme.spacing(1),
          width: theme.spacing(16),
          height: theme.spacing(16),
        }
    }});

class CategoryLists extends Component {
    render() {
        return (
            
                <Paper elevation={3} style={{margin:'20px',background:'#d94711', height:"100px", display:"flex", flexDirection:'row',borderRadius:'14px', justifyContent:'space-between'}}>
                   <div style={{width:'100%'}}>
                        <div style={{display:'flex', height:'100%', flexDirection:'column', justifyContent:'space-around',alignItems:'center'}}>
                                <div style={{fontSize:'1rem',fontWeight:'bold', color:'white'}}>{this.props.category}</div>
                                
                        </div>
                   </div>

                </Paper>
       
        )
    }
}


export default withStyles(styles, {withTheme:true})(CategoryLists)