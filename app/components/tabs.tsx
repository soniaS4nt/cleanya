'use client'
import React, { useState } from 'react'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react'

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

  const handleNextTab: React.MouseEventHandler<HTMLButtonElement> = () => {
    setActiveTab((prevIndex) => (prevIndex + 1) % tabs.length)
  }

  return (
    <div className={`mx-auto max-w-xl space-y-12 ${className}`}>
      <TabGroup index={activeTab} onIndexChange={handleChangeTab}>
        <TabList variant="line">
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
      <button
        onClick={handleNextTab}
        className="bg-tremor-brand rounded-lg  text-white px-4 py-2 mt-4 shadow-md"
      >
        Siguiente
      </button>
    </div>
  )
}

export default TabsHero
