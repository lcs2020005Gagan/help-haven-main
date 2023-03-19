import CommentCard from './CommentCard'
import {BsFilterLeft} from 'react-icons/bs'
import * as React from 'react';
import {useEffect,useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useParams } from 'react-router-dom';

function Comments(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
   var rand=0
   const {storyId}  = useParams();


   const [note, setnote] = useState({ comment:""});
   const handlechange = (e) => {
       setnote({ ...note, [e.target.name]: e.target.value })
       console.log(note);
   }

   const handlesubmit = async (e) => {
       // console.log("hello")
       e.preventDefault();
       const comment = note.comment

       const authtoken=localStorage.getItem('token');
       const response = await fetch(`http://localhost:5000/api/upload/addcomment/${storyId}`, {
           method: 'POST',
           headers: {
               'auth-token':(localStorage.getItem('token')),
               'Content-Type': 'application/json',
           },
           body: JSON.stringify({ comment}),
       });
       const json = await response.json();
       console.log(json);
       if (json.success==="success") {
           console.log("success mf")
           window.location.reload();

       }
       else {
           console.log("invalid cred")
       }
   } 
    
  return (
    <div className='CommentsJs'>
        <div className="CommentsJsHeader">
            <div className="CommentsJsNumber">
            {props.comments.length} comments
            </div>
            
            <div className="CommentsJsFilter">
            <Button
        id="demo-positioned-button"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
      <span> <BsFilterLeft/></span> Sort by
      </Button>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Newest comments</MenuItem>
        <MenuItem onClick={handleClose}>Top comments</MenuItem>
      </Menu>
            </div>
        </div>
        <div className="CommentInput">
            <div className="CommentJsCardAuthorImg">
                <img src="https://www.fastweb.com/uploads/article_photo/photo/2036641/crop635w_10-ways-to-be-a-better-student.jpeg" alt="" />
            </div>
                                    <textarea name='comment'  placeholder="Add your comment" 
                                    onChange={handlechange}
                                    className='CommentField'>
                                    </textarea>
        </div>
        <div className="CommentInputSb" onClick={handlesubmit}>
            Submit
        </div>
        {props.comments&&props.comments.map((element) => {
    return <div key={rand++} style={{"padding":"0","margin":"0","width":"100%"}}>
       <CommentCard element={element}/>
    </div>
})}
    </div>
  )
}

export default Comments