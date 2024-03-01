'use client'
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionList,
} from '@tremor/react'

const QFs = [
  {
    pregunta: '¿?',
    respuesta: '',
  },
  {
    pregunta: '¿?',
    respuesta: '',
  },
  {
    pregunta: '¿?',
    respuesta: '',
  },
  {
    pregunta: '¿?',
    respuesta: '',
  },
]
export default function QuestionFrequentComponent() {
  return (
    <AccordionList>
      <Accordion>
        {QFs.map((item) => (
          <>
            <AccordionHeader className="text-sm font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
              {item.pregunta}
            </AccordionHeader>
            <AccordionBody className="leading-6">
              {item.respuesta}
            </AccordionBody>
          </>
        ))}
      </Accordion>
    </AccordionList>
  )
}
