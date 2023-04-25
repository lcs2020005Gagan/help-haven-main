import React, { useState, useEffect } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Link, useParams ,useLocation, useNavigate} from 'react-router-dom';
import {BiHomeCircle} from 'react-icons/bi'
import {MdTravelExplore,MdExplore,MdOutlineMessage,MdMessage} from 'react-icons/md'
import {BsPerson,BsBookmarks,BsFillPersonFill,BsBookmarksFill} from 'react-icons/bs'
import {FiMessageSquare} from 'react-icons/fi'
import {FaHands} from 'react-icons/fa'
import {BsTwitter} from 'react-icons/bs'
import {AiOutlineHome,AiTwotoneHome} from 'react-icons/ai'
import {FiLogOut} from 'react-icons/fi'
import {BsInfoCircle} from 'react-icons/bs'
import {MdOutlineExplore} from 'react-icons/md'
import ButtonComp from './ButtonComp'
import PopUp from './PopUp'

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer() {

    let location=useLocation();
    var rand=0
    const params=useParams()
    const {profileId} =useParams();
   const navigate=useNavigate()
    const host="http://localhost:5000"
    const [user,setUser]=useState(null)

      useEffect(()=>{
      
        const getUserProfile=async ()=>{
            const response=await fetch(`${host}/api/auth/getuser`,{
                method: 'GET',
                headers: {
                  'auth-token': localStorage.getItem('token'),
                  'Content-Type':'application/json'
                },
              });
        
              const json=await response.json();
           
              console.log("side",json);
             setUser(json[0])    
            }
                getUserProfile();

      },[])
    const func=(str)=>{
        let res="/"
        for(let i=1;i<str.length;i++)
        {if(str[i]=='/')return res;
        res+=str[i]}
    }
    const handleLogOut=()=>{
      localStorage.clear();
      window.location.reload()
    }


  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
                <div className="ok" style={{"color":"white"}}>
                    open
                </div>
             </IconButton>

      <Drawer variant="permanent" open={open} style={{"backgroundColor":"grey"}}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List >
          {['','Home', 'Explore', 'Messages', 'Bookmarks','Profile','LogOut','About',''].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {index  === 1 &&  <Link to="/">
            <li className={`LeftNavBarLi ${location.pathname==="/"?"LeftNavActive":""}`}>{location.pathname!=="/"&&<AiOutlineHome/>} {location.pathname==="/"&&<AiTwotoneHome/>}</li>
            </Link> }
                  {index  === 2 &&    <Link to="/explore/foru">
            <li className={`LeftNavBarLi ${func(location.pathname)==="/explore"?"LeftNavActive":""}`}>{func(location.pathname)!=="/explore"&&<MdOutlineExplore/>} {func(location.pathname)==="/explore"&&<MdExplore/>} </li>
            </Link> }
                  {index  === 3 &&   localStorage.getItem("token")&&<Link to="/chat">
         <li className={`LeftNavBarLi ${func(location.pathname)==="/chat"?"LeftNavActive":""}`}>{func(location.pathname)!=="/chat"&&<MdOutlineMessage/>} {func(location.pathname)==="/chat"&&<MdMessage/>} </li>
            </Link> }
                  {index  === 4 &&  localStorage.getItem("token")&& <Link to="/bookmarks">
             <li className={`LeftNavBarLi ${location.pathname==="/bookmarks"?"LeftNavActive":""}`}>{location.pathname!=="/bookmarks"&&<BsBookmarks/>} {location.pathname==="/bookmarks"&&<BsBookmarksFill/>} </li>
            </Link> }
                  {index  === 5 &&  localStorage.getItem("token")&&  <Link to="/profile/self">
            <li className={`LeftNavBarLi ${func(location.pathname)==="/profile"?"LeftNavActive":""}`}>{func(location.pathname)!=="/profile"&&<BsPerson/>} {func(location.pathname)==="/profile"&&<BsFillPersonFill/>} </li>
            </Link>}
                  {index  === 6 &&     <div onClick={handleLogOut}>
              {!localStorage.getItem("token")?<a href="/home">
            <li className={`LeftNavBarLi`}><FiLogOut/> LogIn</li>
              </a>:<li className={`LeftNavBarLi`} onClick={handleLogOut}><FiLogOut/> </li>
}
            </div> }
                  {index  === 7 &&        <div>
            <a href="/home">
            <li className={`LeftNavBarLi`}><BsInfoCircle/> </li>
              </a>

            </div> }
            
           

                </ListItemIcon>
                {index!==8&&index!==0&&<ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />}
                {index===8&&<ListItemText primary={ localStorage.getItem("token")&&<PopUp/>} sx={{ opacity: open ? 1 : 0 }} />}
                {index===0&&<ListItemText primary={     <div className='Profile'>
                    <div className='ProfileImgDiv'>
                        <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                            <defs>
                                <pattern style={{"boxShadow":"10px 10px 10px 10px #7498bf"}}id="img" patternUnits="userSpaceOnUse" width="100" height="100">
                                   {user&& <image href={user.profileImg} width="150" height="100" />}
                                </pattern>
                            </defs>
                                <polygon id="profilePic" className='hoverEffects' points="50 1 95 25 95 75 50 99 5 75 5 25" fill="url(#img)" />
                        </svg>
                    </div>
                    {user&&user.name}
                </div>} sx={{ opacity: open ? 1 : 0 }} />}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

    </Box>
  );
}