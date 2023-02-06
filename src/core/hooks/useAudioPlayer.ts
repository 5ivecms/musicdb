/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useContext } from 'react'

import AudioPlayerContext from '../../contexts/AudioPlayerContext'

export const useAudioPlayer = () => useContext(AudioPlayerContext)
