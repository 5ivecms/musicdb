import 'react-h5-audio-player/lib/styles.css'

import { Box } from '@mui/material'
import type { FC } from 'react'
import AudioPlayer from 'react-h5-audio-player'

import { useAudioPlayer } from '../../../core/hooks'

const Player: FC = () => {
  const { src, setIsPlaying } = useAudioPlayer()

  const onPlay = (): void => {
    setIsPlaying(true)
  }

  return (
    <Box sx={{ bottom: 0, left: 0, position: 'fixed', right: 0 }}>
      <AudioPlayer autoPlay={false} onPlay={onPlay} src={src} />
    </Box>
  )
}

export default Player
