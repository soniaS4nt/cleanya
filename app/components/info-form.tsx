import React from 'react'
import InfoComponet from './infoComponent'

export default function InfoForm() {
  const title = 'N° de habitaciones'
  const rectangles = [
    { id: 1, name: 'Estudio' },
    { id: 2, name: '1' },
    { id: 3, name: '2' },
    { id: 4, name: '3' },
    { id: 5, name: '4' },
    { id: 6, name: '5' },
  ]
  const title1 = 'N° de Baños'
  const rectangles1 = [
    { id: 1, name: '1' },
    { id: 2, name: '2' },
    { id: 3, name: '3' },
    { id: 4, name: '4' },
  ]
  const title2 = 'Tipo de limpieza'
  const rectangles2 = [
    { id: 1, name: 'standard' },
    { id: 2, name: 'deep clean' },
    { id: 3, name: 'Mudanza' },
    { id: 4, name: 'Post Cosntrucción' },
  ]

  return (
    <>
      <InfoComponet rectangles={rectangles} title={title} />
      <InfoComponet rectangles={rectangles1} title={title1} />
      <InfoComponet rectangles={rectangles2} title={title2} />
    </>
  )
}
