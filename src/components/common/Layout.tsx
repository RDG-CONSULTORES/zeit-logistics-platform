import React from 'react';
import { Menu, BarChart3, Map, Brain, FileCheck, Radio, Book, Settings, LogOut } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentModule: string;
  onModuleChange: (module: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentModule, onModuleChange }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard Ejecutivo', icon: BarChart3 },
    { id: 'ai-ecosystem', name: 'Ecosistema IA', icon: Brain },
    { id: 'routes', name: 'Optimización de Rutas', icon: Map },
    { id: 'analytics', name: 'Análisis Predictivo', icon: BarChart3 },
    { id: 'customs', name: 'Inteligencia Aduanal', icon: FileCheck },
    { id: 'operations', name: 'Torre de Control', icon: Radio },
    { id: 'methodology', name: 'Metodología', icon: Book },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-72 bg-primary text-white">
        <div className="p-6">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
              <span className="text-primary font-bold text-xl">Z</span>
            </div>
            <div>
              <h1 className="text-xl font-semibold">Zeit AI Logistics</h1>
              <p className="text-blue-200 text-sm">Plataforma Inteligente</p>
            </div>
          </div>

          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onModuleChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    currentModule === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/20">
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-blue-100 hover:text-white transition-colors">
            <Settings size={20} />
            <span className="font-medium">Configuración</span>
          </button>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-blue-100 hover:text-white transition-colors">
            <LogOut size={20} />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-8 py-4">
            <div className="flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Menu size={24} className="text-gray-600" />
              </button>
              <h2 className="text-2xl font-semibold text-gray-800">
                {menuItems.find(item => item.id === currentModule)?.name}
              </h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Roberto Dávila</p>
                <p className="text-xs text-gray-500">Director de Operaciones</p>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 font-medium">RD</span>
              </div>
            </div>
          </div>
        </header>

        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;