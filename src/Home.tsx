import { useState, useCallback } from 'react'

type View = 'services' | 'details'

interface Service {
  id: number
  name: string
}

// Hook personalizado para navegación
function useDrawerNavigation() {
  const [currentView, setCurrentView] = useState<View>('services')
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const goToDetails = useCallback((service: Service) => {
    setSelectedService(service)
    setCurrentView('details')
  }, [])

  const goBack = useCallback(() => {
    setCurrentView('services')
  }, [])

  return { currentView, selectedService, goToDetails, goBack }
}

// Datos de ejemplo
const mockServices: Service[] = [
  { id: 1, name: 'Corte de cabello' },
  { id: 2, name: 'Manicure' },
  { id: 3, name: 'Pedicure' },
  { id: 4, name: 'Tinte' },
]

interface ServicesProps {
  onSelectService: (service: Service) => void
}

function Services({ onSelectService }: ServicesProps) {
  return (
    <div className="p-4 h-full">
      <h2 className="text-slate-800 text-xl font-bold mb-4">Listado de Servicios</h2>
      <ul className="space-y-2">
        {mockServices.map((service) => (
          <li key={service.id}>
            <button
              onClick={() => onSelectService(service)}
              className="w-full text-left p-3 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 transition-colors"
            >
              {service.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

interface DetailsProps {
  service: Service | null
  onBack: () => void
}

function Details({ service, onBack }: DetailsProps) {
  return (
    <div className="p-4 h-full bg-white">
      <button
        onClick={onBack}
        className="mb-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 transition-colors"
      >
        ← Volver
      </button>
      <h2 className="text-slate-800 text-xl font-bold mb-4">Detalles del Servicio</h2>
      {service && (
        <div className="bg-slate-100 p-4 rounded-lg text-slate-800">
          <p className="text-lg font-semibold">{service.name}</p>
          <p className="mt-2 text-slate-500">ID: {service.id}</p>
        </div>
      )}
      <button className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-800 transition-colors">
        Agregar servicio
      </button>
    </div>
  )
}

function Home() {
  const { currentView, selectedService, goToDetails, goBack } = useDrawerNavigation()

  const isDetails = currentView === 'details'

  return (
    <div className="w-full h-screen bg-slate-200 relative">
      <div className="bg-white h-full w-[800px] top-0 right-0 fixed grid grid-cols-[300px_auto]">
        <div className="p-4 border-r border-slate-200">
          <h2 className="text-slate-800 text-xl font-bold">OPCIONES</h2>
        </div>
        <div className="overflow-hidden relative">
          {/* Services - siempre visible debajo */}
          <div className="absolute inset-0">
            <Services onSelectService={goToDetails} />
          </div>

          {/* Details - se desliza por encima */}
          <div
            className={`absolute inset-0 transition-transform duration-300 ease-out ${
              isDetails ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <Details service={selectedService} onBack={goBack} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
