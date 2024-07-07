// **React Imports
import { useEffect, useRef } from 'react'

// **Mui Imports
import { styled, Theme } from '@mui/material'
import TextareaAutosize from '@mui/base/TextareaAutosize'

const CommentTextAreaWrapper = styled(TextareaAutosize)(({ theme }: { theme: Theme }) => ({
  width: '100%',
  height: 'auto',
  padding: '10px 15px',
  fontSize: '18px',
  '&:focus': {
    outline: 'none', // Remove the default outline
    boxShadow: 'none', // Remove any shadow
  },
}))

interface CommentTextareaProps {
  value: string
  callback: (value: string) => void
}

const CommentTextarea: React.FC<CommentTextareaProps> = ({ callback, value }) => {
  const textRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    const handleInputChange = () => {
      if (textRef.current) {
        callback(textRef.current.value)
      }
    }

    if (textRef.current) {
      textRef.current.addEventListener('input', handleInputChange)
    } else {
      return () => {
        textRef.current?.removeEventListener('input', handleInputChange)
      }
    }
  }, [callback])

  return <CommentTextAreaWrapper ref={textRef} value={value} minRows={5} />
}

export default CommentTextarea
