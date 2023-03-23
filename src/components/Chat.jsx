// import React ,{useState}from 'react';

// // Integrate the SDK
// import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
// import '@zegocloud/zimkit-react/index.css';



// // The following uses the App instance as an example.
// export default class App extends React.Component {
  
//     constructor() {
 
//         super();
//         this.state = {
//             appConfig: {
//                 appID: 1346763769,        // The AppID you get from the ZEGOCLOUD admin console.
//                 serverSecret: 'f88a4f0a3fca742142d1b2889c993f49' // The serverSecret you get from ZEGOCLOUD Admin Console.
//             },
//             // The userID and userName is a strings of 1 to 32 characters.
//             // Only digits, letters, and the following special characters are supported: '~', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '=', '-', '`', ';', '’', ',', '.', '<', '>', '/', '\'
//             userInfo: {
//                 // Your ID as a user.
//                 userID: 'Gagan7',
//                 // Your name as a user.
//                 userName: 'Gagan',
//                 // The image you set as a user avatar must be network images. e.g., https://storage.zego.im/IMKit/avatar/avatar-0.png
//                 userAvatarUrl: 'https://storage.zego.im/IMKit/avatar/avatar-0.png'
//             },
//         }
//     }
//     async componentDidMount() {
        
//         const zimKit = new ZIMKitManager();
//         const token = zimKit.generateKitTokenForTest(this.state.appConfig.appID, this.state.appConfig.serverSecret, this.state.userInfo.userID);
//         await zimKit.init(this.state.appConfig.appID);
//         await zimKit.connectUser(this.state.userInfo, token);
//     }
//     render() {

//         return (
//             <Common></Common> 
//         );
//     }
// }

import React, { useState, useEffect } from 'react';
import { ZIMKitManager, Common } from '@zegocloud/zimkit-react';
import '@zegocloud/zimkit-react/index.css';

const App = () => {
  var rand=0
  const host="http://localhost:5000"
  const [user,setUser]=useState(null)

  const [appConfig] = useState({
    appID: 1346763769,
    serverSecret: 'f88a4f0a3fca742142d1b2889c993f49'
  });
  const [userInfo,setUserInfo] = useState({
    userID: Math.floor(Math.random()*1000000),
    userName: null,
    userAvatarUrl: 'https://storage.zego.im/IMKit/avatar/avatar-0.png'
  });
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
          console.log("chat",json);
        //  setUser(json[0])    
        setUserInfo({
          userName:json[0].name,
          userAvatarUrl:json[0].profileImg
        })
        console.log(userInfo)
        }
            getUserProfile();
            console.log(user)  
  },[])

 

  useEffect(() => {
    const initZIMKit = async () => {
      const zimKit = new ZIMKitManager();
      const token = zimKit.generateKitTokenForTest(
        appConfig.appID,
        appConfig.serverSecret,
        userInfo.userID
      );
      await zimKit.init(appConfig.appID);
      await zimKit.connectUser(userInfo, token);
    };

    initZIMKit();
  }, [appConfig.appID, appConfig.serverSecret, userInfo.userID]);



  return <Common />;
};

export default App;
