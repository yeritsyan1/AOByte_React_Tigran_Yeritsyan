import { Box, Button, Divider, TextField } from '@mui/material'
import { arrayUnion, doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
import React, { Component } from 'react'
import { app } from '../firebase/firebase'
import { v4 as uuid } from 'uuid'
import Comments from './Comments'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default class Post extends Component {
    constructor(props) {
        super(props)
        this.state= {
            expanded: false,
            comment: '',
            db: getFirestore(app)
        }
    }

   handleExpandClick = () => {
    this.setState(() => {
        return {
            expand: !this.state.expanded
        }
    }) 
  };
  
  rateComment = async(elem) => {
    await setDoc(doc(this.state.db, "posts", this.props.item.id), {
        ...this.props.item,
        comments: this.props.item.comments.map((item) => {
            if(item.id === elem.id) {
               return {
                    ...elem,
                    rate: item.rate + 1,
                    ratedUser: [...elem.ratedUser, JSON.parse(localStorage.getItem('user')).providerData[0].email] 
                }
            } else {
                return item
            }
        }),
       
      });
    
  }

  render() {
  return (
    <Card style={{ width: '100%', marginBottom: '10px', backgroundColor: 'wheat' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={this.props.item.title}
      />
      <CardMedia
        component="img"
        maxheight="194"
        alt=""
      />
      <CardContent>
      <button
                  style={{
                    fontSize: "12px",
                    backgroundColor: "red",
                    color: "white",
                  }}
                  onClick={() => this.props.onDelete(this.props.listname, this.props.item)}
                >
                  Delete
                </button>
        <Typography variant="body2" color="text.secondary">
        {this.props.item.body}
        </Typography>
      </CardContent>
        <CardContent>
               <TextField placeholder="Comment" multiline rows='2' value={this.state.comment} onChange={(e) => {
               this.setState(() => {
                 return {
                   comment: e.target.value
                 }
                })
               }}
                />
               <Button variant="contained"
                 disabled={this.state.comment.length < 1}
                onClick={async () => {
              
                   const updateComments = doc(this.state.db, "posts", this.props.item.id);
                   await updateDoc(updateComments, {
                       comments: arrayUnion({
                           commentAuthor: JSON.parse(localStorage.getItem('user')).providerData[0].displayName ,
                           text: this.state.comment,
                           rate: 0,
                           id: uuid(),
                           ratedUser: []
                       })
                   });
                   await this.setState(() => {
                       return {
                           comment: ''
                       }
                   })
               }} > Send </Button>
             <Divider />
        </CardContent>
        <CardContent>
        <Box sx={{backgroundColor: ''}}>
              <h3
                style={{ color: "red", textAlign: "left", padding: "0px 10px" }}
                >
                Comments:
              </h3>
              {this.props.item?.comments.map((comment) => {
                  return (
                      <React.Fragment key={uuid()}>
                    <Comments comment={comment} postID={this.props.item.id} rateComment={this.rateComment} />
                  </React.Fragment>
                );
            })}
            </Box>
        </CardContent>
    </Card>
  );
    }
}