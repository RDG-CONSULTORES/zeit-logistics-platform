import React, { useState } from 'react';
import { Menu, BarChart3, Map, Brain, FileCheck, Radio, Book, Settings, LogOut, X, ChevronLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentModule: string;
  onModuleChange: (module: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentModule, onModuleChange }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard Ejecutivo', shortName: 'Dashboard', icon: BarChart3 },
    { id: 'ai-ecosystem', name: 'Ecosistema IA', shortName: 'IA', icon: Brain },
    { id: 'routes', name: 'Optimización de Rutas', shortName: 'Rutas', icon: Map },
    { id: 'analytics', name: 'Análisis Predictivo', shortName: 'Analytics', icon: BarChart3 },
    { id: 'customs', name: 'Inteligencia Aduanal', shortName: 'Aduanas', icon: FileCheck },
    { id: 'operations', name: 'Torre de Control', shortName: 'Control', icon: Radio },
    { id: 'methodology', name: 'Metodología', shortName: 'Metodología', icon: Book },
  ];

  const handleModuleChange = (moduleId: string) => {
    onModuleChange(moduleId);
    setMobileMenuOpen(false); // Close mobile menu when item is selected
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-50 bg-primary text-white transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'w-72' : 'w-20'}
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Sidebar Header */}
        <div className="p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6 lg:mb-8">
            <div className={`flex items-center transition-all duration-300 ${sidebarOpen ? 'space-x-3' : 'justify-center'}`}>
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold text-xl">Z</span>
              </div>
              {sidebarOpen && (
                <div className="min-w-0 flex-1">
                  <h1 className="text-lg lg:text-xl font-semibold truncate">Zeit AI Logistics</h1>
                  <p className="text-blue-200 text-xs lg:text-sm truncate">Plataforma Inteligente</p>
                </div>
              )}
            </div>
            
            {/* Close button for mobile */}
            <button
              className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={20} />
            </button>
            
            {/* Collapse button for desktop */}
            <button
              className="hidden lg:block p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <ChevronLeft size={20} className={`transition-transform duration-300 ${!sidebarOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleModuleChange(item.id)}
                  className={`w-full flex items-center rounded-lg transition-all duration-200 group ${
                    sidebarOpen ? 'px-4 py-3 space-x-3' : 'p-3 justify-center'
                  } ${
                    currentModule === item.id
                      ? 'bg-white/20 text-white'
                      : 'text-blue-100 hover:bg-white/10 hover:text-white'
                  }`}
                  title={!sidebarOpen ? item.name : undefined}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="font-medium text-left truncate text-sm lg:text-base">
                      <span className="lg:hidden">{item.shortName}</span>
                      <span className="hidden lg:inline">{item.name}</span>
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 lg:p-6 border-t border-white/20 ${!sidebarOpen && 'hidden lg:block'}`}>
          <button className={`w-full flex items-center text-blue-100 hover:text-white transition-colors rounded-lg ${
            sidebarOpen ? 'px-4 py-3 space-x-3' : 'p-3 justify-center'
          }`}>
            <Settings size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="font-medium text-sm lg:text-base">Configuración</span>}
          </button>
          <button className={`w-full flex items-center text-blue-100 hover:text-white transition-colors rounded-lg ${
            sidebarOpen ? 'px-4 py-3 space-x-3' : 'p-3 justify-center'
          }`}>
            <LogOut size={20} className="flex-shrink-0" />
            {sidebarOpen && <span className="font-medium text-sm lg:text-base">Cerrar Sesión</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between px-4 lg:px-8 py-3 lg:py-4">
            <div className="flex items-center space-x-2 lg:space-x-4 min-w-0">
              <button 
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu size={24} className="text-gray-600" />
              </button>
              <div className="min-w-0">
                <h2 className="text-lg lg:text-2xl font-semibold text-gray-800 truncate">
                  <span className="lg:hidden">
                    {menuItems.find(item => item.id === currentModule)?.shortName}
                  </span>
                  <span className="hidden lg:inline">
                    {menuItems.find(item => item.id === currentModule)?.name}
                  </span>
                </h2>
              </div>
            </div>
            
            {/* User Info */}
            <div className="flex items-center space-x-2 lg:space-x-4">
              <div className="text-right hidden sm:block">
                <p className="text-sm text-gray-600 truncate">Roberto Dávila</p>
                <p className="text-xs text-gray-500 truncate">Director de Operaciones</p>
              </div>
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-gray-600 font-medium text-sm lg:text-base">RD</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;