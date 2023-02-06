/* eslint-disable @typescript-eslint/no-empty-function */
import type { Dispatch, SetStateAction } from 'react'
import { createContext } from 'react'

interface AudioPlayerContextState {
  isPlaying: boolean
  setIsPlaying: Dispatch<SetStateAction<boolean>>

  setSrc: Dispatch<SetStateAction<string>>
  src: string
}

const defaultState: AudioPlayerContextState = {
  isPlaying: false,
  setIsPlaying: () => {},
  setSrc: () => {},
  src: '',
}

const AudioPlayerContext = createContext<AudioPlayerContextState>(defaultState)

export default AudioPlayerContext
