import React from 'react'
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
  return (
    <div className={`mx-auto max-w-lg space-y-12 ${className}`}>
      <TabGroup>
        <TabList variant="line" defaultValue={1}>
          {tabs.map(
            (
              tab,
              index // Mapea sobre las pestañas para renderizar cada una
            ) => (
              <Tab key={index}>{tab.title}</Tab> // Usamos index como key temporal
            )
          )}
        </TabList>
        <TabPanels>
          {tabs.map(
            (
              tab,
              index // Mapea sobre las pestañas para renderizar el contenido correspondiente
            ) => (
              <TabPanel key={index}>{tab.content}</TabPanel> // Usamos index como key temporal
            )
          )}
        </TabPanels>
      </TabGroup>
    </div>
  )
}

export default TabsHero
