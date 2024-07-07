// ** React Imports
import React, { useState, useEffect, FormEvent } from 'react'

//  **Mui Imports
import { Box, Typography, MenuItem, Theme } from '@mui/material'
import { styled } from '@mui/material/styles'
import LoadingButton from '@mui/lab/LoadingButton'

// **Custom Components
import ControlledIconMenuButton from 'src/@core/components/controlled-icon-menu-button'
import CommentTextarea from 'src/@core/components/comment-textarea'

//**Icon Imports
import MoreVertSharpIcon from '@mui/icons-material/MoreVertSharp'
import AddCommentSharpIcon from '@mui/icons-material/AddCommentSharp'
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt'

//**Util Imports
import fakeFetch from 'src/@core/utils/fakeFetch'
import useDeviceSizesMediaQuery from 'src/hooks/useDeviceSizesMediaQuery'

// **Vendor Imports
import toast from 'react-hot-toast'

const MenuItemWrapper = styled(MenuItem)({
  backgroundColor: 'transparent !important',
  '&:hover': {
    backgroundColor: 'transparent'
  },
  '&:focus': {
    backgroundColor: 'transparent'
  }
})

const FormBoxWrapper = styled(Box)({
  display: 'column',
  height: 'auto',
  overflowY: 'hidden'
})

const ControlledTextAreaMenu = () => {
  const [textareaValue, setTextareaValue] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const { isMobileXs, isMobileS, isMobileM } = useDeviceSizesMediaQuery()

  const handleSubmit =
    (callback: () => void) =>
    async (event: FormEvent<HTMLFormElement>): Promise<void> => {
      event.preventDefault()
      setIsSuccess(false)
      await fakeFetch(setIsLoading)
      if (!isLoading) {
        setTextareaValue('')
        if (callback) callback()
        setIsSuccess(true)
      }
    }

  useEffect(() => {
    if (isSuccess) {
      toast.success('Comment Saved.')
    }
  }, [isSuccess])
  return (
    <Box sx={{ display: 'flex' }}>
      <ControlledIconMenuButton
        icon={<AddCommentSharpIcon sx={theme => ({ color: theme.palette.grey['A200'] })} />}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        renderMenuItems={closeMenu => (
          <MenuItemWrapper>
            <form onSubmit={handleSubmit(closeMenu)}>
              <FormBoxWrapper
                sx={{ width: { xs: isMobileXs || isMobileS ? '255px' : isMobileM ? '275px' : '300px', sm: '300px' } }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <Typography variant='h5' sx={{ fontWeight: '700', fontSize: '18px !important' }}>
                    Comments
                  </Typography>

                  <LoadingButton
                    variant='contained'
                    sx={{
                      textTransform: 'none',
                      padding: {
                        xs: '5px 10px',
                        sm: '10px 20px'
                      }
                    }}
                    type='submit'
                    loading={isLoading}
                    disabled={isLoading || !textareaValue}
                  >
                    Add a Comment
                  </LoadingButton>
                </Box>
                <Box
                  sx={{
                    border: '1px solid rgb(118, 118, 118)',
                    // borderBottomColor: 'transparent',
                    padding: '15px',
                    marginBottom: '-2px'
                  }}
                >
                  <Typography variant='h6' sx={{ fontSize: '15px !important', display: 'flex', alignItems: 'center' }}>
                    <PsychologyAltIcon fontSize='small' color='primary' sx={{ marginRight: '5px' }} />{' '}
                    {!textareaValue ? 'There are no comments.' : 'Make comments meaningful'}
                  </Typography>
                </Box>
                <Box>
                  <CommentTextarea callback={setTextareaValue} value={textareaValue} />
                </Box>
              </FormBoxWrapper>
            </form>
          </MenuItemWrapper>
        )}
      />
      <ControlledIconMenuButton
        icon={<MoreVertSharpIcon sx={theme => ({ color: theme.palette.grey['A200'] })} />}
        renderMenuItems={closeMenu => [
          <MenuItem key='z1234' sx={{ fontSize: '15px !important' }} onClick={closeMenu}>
            Connect your data...
          </MenuItem>,
          <MenuItem key='z2345' sx={{ fontSize: '15px !important' }} onClick={closeMenu}>
            Edit...
          </MenuItem>,
          <MenuItem key='z3456' sx={{ fontSize: '15px !important' }} onClick={closeMenu}>
            Share
          </MenuItem>,
          <MenuItem key='z4567' sx={{ fontSize: '15px !important' }} onClick={closeMenu}>
            Download as
          </MenuItem>,
          <MenuItem key='z5678' sx={{ fontSize: '15px !important' }} onClick={closeMenu}>
            About this Tool
          </MenuItem>,
          <MenuItem key='z6789' sx={{ fontSize: '15px !important' }} onClick={closeMenu}>
            Remove from Dashboard
          </MenuItem>
        ]}
      />
    </Box>
  )
}

export default ControlledTextAreaMenu
