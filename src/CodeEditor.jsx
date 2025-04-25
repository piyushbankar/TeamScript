/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// CodeEditor.jsx
import React, { useEffect, useState } from 'react';
import { Box, Button, Select, VStack, Textarea, useToast } from '@chakra-ui/react';
import CodeMirror from '@uiw/react-codemirror';
import { oneDark } from '@codemirror/theme-one-dark';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { java } from '@codemirror/lang-java';
import { cpp } from '@codemirror/lang-cpp';
import { executeCode } from './api.js';
import { ref, onValue, set } from 'firebase/database';
import { database } from './firebaseConfig';
import { ColorRing } from 'react-loader-spinner';
import { CODE_SNIPPETS } from './constants.js';
// import { Spinner } from '@chakra-ui/react/dist/index.js';


const CodeEditor = ({ username, roomid }) => {
    const [code, setCode] = useState(CODE_SNIPPETS.javascript);
    const [language, setLanguage] = useState('javascript');
    const [output, setOutput] = useState('Run Your Code......');
    const toast = useToast();

    const [loading, setloading] = useState(false)

    useEffect(() => {
        const codeRef = ref(database, 'code-editor/' + roomid);
        onValue(codeRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setCode(data);
            }
        });
    }, []);

    const handleCodeChange = (value) => {


        setCode(value);
        set(ref(database, 'code-editor/' + roomid), value);
    };

    const runCode = async () => {
        try {
            setloading(true)
            const response = await executeCode(language, code);


            if (response.stderr) {
                setOutput(response.run.stderr);
            } else {
                if(response.run.stdout == "") setOutput("Error in code....")
                else setOutput(response.run.stdout);
            }
        } catch (error) {
            toast({
                title: 'Error running code',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
        setloading(false)
    };

    const getLanguageExtension = (language) => {
        switch (language) {
            case 'javascript':
                return javascript();
            case 'cpp':
                return cpp();
            case 'java':
                return java();
            case 'python':
                return python(); 
            default:
                return javascript();
        }
    };

    return (

        <div className='container'>

            <div className='box1'>
                <VStack spacing={4} align="stretch" p={4}>
                    <Select
                        value={language}
                        onChange={(e) => {
                            setLanguage(e.target.value)
                            console.log(e.target.value)
                            switch (e.target.value) {
                                case 'javascript':
                                    return setCode(CODE_SNIPPETS.javascript)
                                case 'python':
                                    return setCode(CODE_SNIPPETS.python)
                                case 'java':
                                    return setCode(CODE_SNIPPETS.java)
                                case 'cpp':
                                    return setCode(CODE_SNIPPETS.cpp)             
                                default:
                                    return setCode(CODE_SNIPPETS.javascript)
                            }
                            
                        }
                        }
                        bg="gray.700"
                        color="white"
                        borderColor="gray.600"
                        _hover={{ borderColor: 'gray.500' }}
                    >
                        <option value="javascript">JavaScript</option>
                    
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">cpp</option>
                    </Select>
                    <Box
                        border="1px"
                        borderColor="gray.600"
                        borderRadius="md"
                        p={4}
                        bg="gray.800"
                        width="100%"
                    >
                        <CodeMirror
                            value={code}
                            height="500px"
                            extensions={[getLanguageExtension(language), oneDark]}
                            theme={oneDark}
                            onChange={(value) => handleCodeChange(value)}
                        />
                    </Box>
                </VStack>
            </div>

            <div className='box2'>
                <Button onClick={runCode} colorScheme="teal" width="100%">
                    {
                        loading ?
                        <ColorRing
                        visible={true}
                        height="40"
                        ariaLabel="color-ring-loading"
                        wrapperStyle={{}}
                        wrapperClass="color-ring-wrapper"
                        colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                        /> 
                        
                        :
                        "Run Code"
                    }
                </Button>
                {/* <Box
                    border="1px"
                    borderRadius="md"
                    p={4}
                    height="100vh"
                    bg="gray.800"
                    width="100%"
                > */}
                <Textarea
                    value={output}
                    readOnly
                    height="90vh"

                    borderColor="gray.600"
                    bg="gray.900"
                    color="white"
                />
                {/* </Box> */}
            </div>

        </div>
    );
};

export default CodeEditor;
