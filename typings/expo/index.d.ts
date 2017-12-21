/*
  The @types/expo module has incorrect types. :(
  This is just a partial declaration of correct types for expo.
*/
import { Component } from 'react'

namespace Expo {
  namespace Audio {
    interface PlaybackStatus {
      isLoaded: true
      uri: string
      durationMillis?: number
      positionMillis: number
      playableDurationMillis?: number
      shouldPlay: boolean
      isPlaying: boolean
      isBuffering: boolean
      volume: number
      isMuted: boolean
      isLooping: boolean
      didJustFinish: boolean
    }

    interface PlaybackStatusToSet {
      androidImplementation?: string
      progressUpdateIntervalMillis?: number
      positionMillis?: number
      shouldPlay?: boolean
      rate?: FloatFromZeroToOne
      shouldCorrectPitch?: boolean
      volume?: FloatFromZeroToOne
      isMuted?: boolean
      isLooping?: boolean
    }

    interface Source {
      uri: string
    }

    class Sound {
      loadAsync(source: Source, initialStatus?: PlaybackStatusToSet, downloadFirst?: boolean): Promise<PlaybackStatus>
      unloadAsync(): Promise<PlaybackStatus>
      getStatusAsync(): Promise<PlaybackStatus>
      setOnPlaybackStatusUpdate(onPlaybackStatusUpdate?: (status: PlaybackStatus) => void): void
      setStatusAsync(status: PlaybackStatusToSet): Promise<PlaybackStatus>
      playAsync(): Promise<PlaybackStatus>
      playFromPositionAsync(positionMillis: number): Promise<PlaybackStatus>
      pauseAsync(): Promise<PlaybackStatus>
      stopAsync(): Promise<PlaybackStatus>
      setPositionAsync(positionMillis: number): Promise<PlaybackStatus>
      setRateAsync(rate: number, shouldCorrectPitch: boolean): Promise<PlaybackStatus>
      setVolumeAsync(volume: number): Promise<PlaybackStatus>
      setIsMutedAsync(isMuted: boolean): Promise<PlaybackStatus>
      setIsLoopingAsync(isLooping: boolean): Promise<PlaybackStatus>
      setProgressUpdateIntervalAsync(progressUpdateIntervalMillis: number): Promise<PlaybackStatus>
    }
  }

  interface SvgCommonProps {
    fill?: string
    fillOpacity?: number
    stroke?: string
    strokeWidth?: number
    strokeOpacity?: number
    strokeLinecap?: string
    strokeLineJoin?: string
    strokeDasharray?: any[]
    strokeDashoffset?: any
    x?: Axis
    y?: Axis
    rotate?: number
    scale?: number
    origin?: number | string
    originX?: number
    originY?: number
  }

  interface PathProps extends SvgCommonProps {
    d: string
  }

  class Svg extends Component<{ width: number, height: number }> {
    static Path = class Path extends Component<PathProps> {}
  }

}

declare module 'expo' {
  export = Expo
}
