'use client'
import React, { useState } from 'react'
import {
  Card,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@tremor/react'
import { useBookingContext } from '@/contexts/bookingsContext'
import { toast } from 'sonner'

interface TabData {
  title: string
  content: React.ReactNode // Cambiado a React.ReactNode para permitir cualquier tipo de contenido
}

interface TabsHeroProps {
  tabs: TabData[] // Cambiado a un array de objetos con título y contenido
  className?: string
}

const TabsHero: React.FC<TabsHeroProps> = ({ tabs, className }) => {
  const [activeTab, setActiveTab] = useState(0) // Estado para almacenar el índice de la pestaña activa
  const handleChangeTab = (newIndex: number) => {
    setActiveTab(newIndex)
  }
  const { bookingData, dispatch } = useBookingContext()
  async function postAppoiment(body: any) {
    try {
      const res = await fetch(`/api/reservas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        toast.warning('Faltan campos por llenar', {
          position: 'bottom-center',
        })
      }

      // Si la solicitud fue exitosa, puedes manejar la respuesta si es necesario
      const data = await res.json()
      return data // Devuelve los datos de respuesta si es necesario
    } catch (error) {
      console.error('Error fetching data:', error)
      throw error
    }
  }
  const clearBookingDataAndForm = () => {
    // Limpiar los datos del contexto
    dispatch({ type: 'CLEAN_BOOKING_DATA' })

    // Restablecer los valores de los campos del formulario
    const inputs = document.querySelectorAll('input')
    inputs.forEach((input) => {
      input.value = ''
    })
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await postAppoiment(bookingData)

    if (res.status === 1) {
      toast.promise(Promise.resolve(res), {
        loading: 'Cargando...',
        success: (res) => {
          return `${res.message}` //deberia poner la fecha de la reserva
        },
        position: 'top-center',
        error: 'Error',
      })
      clearBookingDataAndForm()
      /*   toast.success('La reserva fue hecha exitosamente', {
        position: 'top-center',
      }) */
      //se limpia el calendario y select o forms
      clearBookingDataAndForm()
    } else {
      toast.error('No se pudo reservar', {
        position: 'top-center',
      })
    }
  }
  const handleNextTab: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    if (activeTab === tabs.length - 1) {
      // Si la pestaña activa es la última, realizar alguna acción, como enviar el formulario
      // Aquí puedes colocar tu lógica para enviar el formulario
      handleSubmit(e)
    } else {
      // Si no es la última pestaña, cambiar a la siguiente pestaña
      setActiveTab((prevIndex) => prevIndex + 1)
    }
    /*  setActiveTab((prevIndex) => (prevIndex + 1) % tabs.length) */
    //cuando se la ultima tab se cambie el botono Siguiente a submit
  }

  const isLastTab = activeTab === tabs.length - 1
  const classNameBtn = isLastTab
    ? 'border-tremor-brand border-2 rounded-lg text-center text-tremor-brand  px-4 py-2 mt-4 shadow-md'
    : 'bg-tremor-brand rounded-lg  text-white px-4 py-2 mt-4 shadow-md'
  const buttonText = isLastTab ? 'Reservar' : 'Siguiente'

  return (
    <Card className={`mx-auto max-w-xl space-y-12 h-2/4 ${className}`}>
      <TabGroup index={activeTab} onIndexChange={handleChangeTab}>
        <TabList variant="solid" className=" flex overflow-hidden">
          {tabs.map((tab, index) => (
            <Tab key={index}>{tab.title}</Tab> // Usamos index como key temporal
          ))}
        </TabList>
        <TabPanels>
          {tabs.map((tab, index) => (
            <TabPanel key={index}>{tab.content}</TabPanel> // Usamos index como key temporal
          ))}
        </TabPanels>
      </TabGroup>
      <button onClick={handleNextTab} className={classNameBtn}>
        {buttonText}
      </button>
    </Card>
  )
}

export default TabsHero
