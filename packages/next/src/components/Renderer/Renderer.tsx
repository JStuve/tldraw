/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import * as React from 'react'
import { observer } from 'mobx-react-lite'
import {
  BoundsBackground as _BoundsBackground,
  BoundsForeground as _BoundsForeground,
  BoundsDetail as _BoundsDetail,
} from '~components'
import { NuContext, nuContext, useStylesheet } from '~hooks'
import type { TLNuShape } from '~nu-lib'
import type { TLNuBinding, TLNuContextProviderProps, TLNuRendererProps } from '~types'
import { EMPTY_OBJECT } from '~constants'
import { Canvas } from '~components/Canvas'
import { autorun } from 'mobx'

export const Renderer = observer(function Renderer<
  S extends TLNuShape = TLNuShape,
  B extends TLNuBinding = TLNuBinding
>({
  children,
  components = EMPTY_OBJECT,
  id,
  inputs,
  meta,
  onKeyDown,
  onKeyUp,
  onWheel,
  onPointerDown,
  onPointerEnter,
  onPointerLeave,
  onPointerMove,
  onPointerUp,
  onPinch,
  onPinchStart,
  onPinchEnd,
  theme = EMPTY_OBJECT,
  viewport,
  ...rest
}: TLNuRendererProps<S, B> & TLNuContextProviderProps<S>): JSX.Element {
  useStylesheet(theme, id)

  const [currentContext, setCurrentContext] = React.useState<NuContext<S>>(() => {
    const { ContextBar, BoundsBackground, BoundsForeground, BoundsDetail } = components

    return {
      viewport,
      inputs,
      callbacks: {
        onKeyDown,
        onKeyUp,
        onPinch,
        onPinchEnd,
        onPinchStart,
        onPointerDown,
        onPointerEnter,
        onPointerLeave,
        onPointerMove,
        onPointerUp,
        onWheel,
      },
      components: {
        BoundsBackground: BoundsBackground === null ? undefined : _BoundsBackground,
        BoundsForeground: BoundsForeground === null ? undefined : _BoundsForeground,
        BoundsDetail: BoundsDetail === null ? undefined : _BoundsDetail,
        ContextBar,
      },
      meta,
    }
  })

  React.useEffect(() => {
    const { ContextBar, BoundsBackground, BoundsForeground, BoundsDetail } = components

    autorun(() => {
      setCurrentContext({
        viewport,
        inputs,
        callbacks: {
          onKeyDown,
          onKeyUp,
          onPinch,
          onPinchEnd,
          onPinchStart,
          onPointerDown,
          onPointerEnter,
          onPointerLeave,
          onPointerMove,
          onPointerUp,
          onWheel,
        },
        components: {
          BoundsBackground: BoundsBackground === null ? undefined : _BoundsBackground,
          BoundsForeground: BoundsForeground === null ? undefined : _BoundsForeground,
          BoundsDetail: BoundsDetail === null ? undefined : _BoundsDetail,
          ContextBar,
        },
        meta,
      })
    })
  }, [])

  return (
    <nuContext.Provider value={currentContext}>
      <Canvas {...rest}>{children}</Canvas>
    </nuContext.Provider>
  )
})
