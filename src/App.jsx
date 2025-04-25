/* eslint-disable no-unused-vars */
// App.js
import React, { useState } from 'react';
import { ChakraProvider, Box, Heading, Center, extendTheme, Image } from '@chakra-ui/react';
import CodeEditor from './CodeEditor';
import Login from './Login';
import { Toaster } from 'react-hot-toast';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'white',
      },
    },
  },
});


const App = () => {
  const [login, setlogin] = useState(true)
  const [username, setusername] = useState("")
  const [roomid, setroomid] = useState("")

  return (
    <ChakraProvider theme={theme}>

      <Toaster />

      {login ?
        <div className='login'>
          <Login setlogin={setlogin} username={username} roomid={roomid} setusername={setusername} setroomid={setroomid} />
        </div>
        :
        <Box p={4}>
          <Center mb={4}>
            <div className='logo'>


              <Image src="xcode.png" boxSize="100px" alt="" srcSet="" />

              <Heading>X-Code Editor</Heading>
            </div>
          </Center>
          <CodeEditor roomid={roomid} username={username} />
        </Box>
      }
    </ChakraProvider>
  );
};

export default App;
