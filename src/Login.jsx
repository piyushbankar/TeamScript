/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// src/Login.js
import React from 'react';
import {v4 as uuidv4} from 'uuid'
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Image,
    Input,
    Heading,
    Stack,
    Text
} from '@chakra-ui/react';
import toast from 'react-hot-toast';

const Login = ({ setlogin, username, roomid, setusername, setroomid }) => {
    const handleLogin = () => {
        if(!username || !roomid){
            toast.error("Please fill all the fields")
            return;
        }
        setlogin(false)
        toast.success("User Joined")
    };

    return (

        <>
        <div className='logo'>

            <Image src="xcode.png" boxSize="100px" alt="" srcSet="" />
         
            <Heading>X-Code Editor</Heading>
        </div>

            <Box maxW="sm" p="6" borderWidth="1px" borderRadius="lg" boxShadow="md">


                <Stack spacing="4">
                    <FormControl>
                        <FormLabel>Room Id</FormLabel>
                       
                        <Input type="email" value={roomid} onChange={(e) => setroomid(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" value={username} onChange={(e) => setusername(e.target.value)} />
                    </FormControl>
                
                    <h5 className='generate' onClick={()=>{

                        setroomid(uuidv4())
                    }}> Generate</h5>
                    <Button colorScheme="blue" onClick={handleLogin}>
                        Create
                    </Button>


                </Stack>
            </Box>
        </>
    );
};

export default Login;
