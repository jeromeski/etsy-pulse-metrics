import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Fab,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Paper,
  TextField,
  Tooltip,
  Typography,
  Stack,
  Chip
} from '@mui/material'
import { makeStyles } from '@mui/styles'
import { createTheme, ThemeProvider } from "@mui/material";
import { blue } from '@mui/material/colors';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import BouncingDotsLoader from './BouncingDotsLoader'

import SendIcon from 'mdi-material-ui/Send'

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  chatSection: {
    width: '400px',
    height: '100%',
    borderRadius: '5px',
    boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    border: '1px solid #e0e0e0'
  },
  headBG: {
    backgroundColor: '#e0e0e0'
  },
  borderRight500: {
    borderRight: '1px solid #e0e0e0'
  },
  messageArea: {
    overflowY: 'auto',
    height: '390px',
    padding: '20px'
  },
  chat: {
    padding: '5px 8px',
    border: '1px solid #e0e0e0',
    borderRadius: '5px',
    whiteSpace: 'pre-line'
  },
  form: {
    width: '100%'
  },
})

const promptChiptheme = createTheme({
  palette: {
    primary: {
      main: blue[50],
      contrastText: blue[900],
    },
  },
});

// ** API import
import Api from 'src/common/api'

const FloatingChat = ({
  isChatOpen,
  setIsChatOpen
}: {
  isChatOpen: boolean
  setIsChatOpen: (boolean: boolean) => void
}) => {
  const classes = useStyles()
  const [messages, setMessages] = useState<any>([])
  const [prompt, setPrompt] = useState('')
  const [conversationId, setConversationId] = useState('')
  const [parentMessageId, setParentMessageId] = useState('')
  const messagesEndRef: any = useRef()
  const [waitingForResponse, setWaitingForResponse] = useState(false)
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e: any) => {
    e.preventDefault()

    if (!prompt) {
      return
    }
    try {
      const message = prompt
      setMessages((prev: any) => [...prev, { message, isUser: true }])
      setPrompt('')
      const formData: any = {
        prompt: message
      }
      if (conversationId) {
        formData.conversationId = conversationId
      }
      if (parentMessageId) {
        formData.parentMessageId = parentMessageId
      }
      setWaitingForResponse(true)

      const { data } = await Api.sendLangchain(formData)
      setConversationId(data?.conversationId)
      setParentMessageId(data?.parentMessageId)
      setMessages((prev: any) => [...prev, { message: data.text, isUser: false }])
    } catch (error) {
      console.log(error)
    }
    setWaitingForResponse(false)
  }

  const resetChat = () => {
    setMessages([])
    setConversationId('')
    setParentMessageId('')
  }

  return (
    <>
      {isChatOpen ? (
        <Grid container component={Paper} className={classes.chatSection}>
          <form onSubmit={handleSendMessage} className={classes.form}>
            <Grid item xs={12}>
              <Grid
                item
                sx={{ backgroundColor: '#4169e1', borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}
                xs={12}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    py: 1,
                    px: 2
                  }}
                >
                  <Typography sx={{ color: '#fff' }}>Chat With Me</Typography>
                  <Button sx={{ color: '#fff' }} size='small' onClick={() => setIsChatOpen(false)}>
                    Close Chat
                  </Button>
                </Box>
              </Grid>

              <Box className={classes.messageArea}>
                <>
                  <Grid container sx={{ display: 'flex', mb: 5 }}>
                    <Grid item xs={12}>
                      <Typography
                        variant='body1'
                        sx={{ float: 'left', fontSize: 13, mb: 1 }}
                        className={classes.chat}
                      >
                        Hey Boss 👋
                      </Typography>
                    </Grid>

                    <Grid item xs={12}>
                      <Typography
                        variant='body1'
                        sx={{ float: 'left', fontSize: 13 }}
                        className={classes.chat}
                      >
                        What can I do for you today?
                      </Typography>
                    </Grid>
                  </Grid>
                </>
                <>
                  <Box>
                    <Grid container sx={{ mb: 5 }}>
                      <Grid item xs={12}>
                        <ThemeProvider theme={promptChiptheme}>
                          <Stack 
                            direction='row' 
                            spacing={1} 
                            flexWrap='wrap' 
                            justifyContent='flex-end'
                          >
                            {/* map the prompts here */}
                            <Chip label="Prompt marketing campaign..." color="primary" size='medium' sx={{ mb: 1 }} />
                            <Chip label="Another Chip" color="primary" size='medium' sx={{ mb: 1 }} />
                            <Chip label="Latest Booking" color="primary" size='medium' sx={{ mb: 1 }} />
                            <Chip label="Generate FAQs" color="primary" size='medium' sx={{ mb: 1 }} />
                          </Stack>
                        </ThemeProvider>
                      </Grid>
                    </Grid>
                  </Box>
                </>
          
                {messages.map((message: any) => (
                  <>
                    <Grid container sx={{ mb: 5 }}>
                      <Grid item xs={12}>
                        <Typography
                          variant='body1'
                          sx={{ float: message?.isUser ? 'right' : 'left', fontSize: 13 }}
                          className={classes.chat}
                        >
                          {message.message}
                        </Typography>
                      </Grid>
                    </Grid>
                  </>
                ))}
                {waitingForResponse && (
                  <Grid container>
                    <Grid item xs={12}>
                      <Typography variant='body1' sx={{ float: 'left' }} className={classes.chat}>
                        <BouncingDotsLoader />
                      </Typography>
                    </Grid>
                  </Grid>
                )}

                <div ref={messagesEndRef} />
              </Box>

              <Divider />
              <Box sx={{ px: 2 }}>
                <Grid container>
                  <Grid item xs={10} sm={11} sx={{ pr: 2 }}>
                    <TextField
                      id='outlined-basic-email'
                      label='Enter a prompt'
                      size='small'
                      fullWidth
                      value={prompt}
                      onChange={e => setPrompt(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={2} sm={1} sx={{ display: 'flex' }} justifyContent='center' alignItems='center'>
                    <Box onClick={handleSendMessage}>
                      <SendIcon color='primary' />
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </form>
        </Grid>
      ) : null}
    </>
  )
}

export default FloatingChat
