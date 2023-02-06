import type { FC, ReactNode } from 'react'
import { useMemo, useState } from 'react'

import AudioPlayerContext from '../contexts/AudioPlayerContext'

interface AudioPlayerProviderProps {
  children: ReactNode
}

const AudioPlayerProvider: FC<AudioPlayerProviderProps> = ({ children }) => {
  const [src, setSrc] = useState<string>('')
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const contextValue = useMemo(() => ({ isPlaying, setIsPlaying, setSrc, src }), [src, isPlaying])

  return <AudioPlayerContext.Provider value={contextValue}>{children}</AudioPlayerContext.Provider>
}

export default AudioPlayerProvider
