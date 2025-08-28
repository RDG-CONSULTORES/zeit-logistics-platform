import React, { useState } from 'react';
import { Lock, Eye, EyeOff, Shield } from 'lucide-react';

interface PasswordProtectedProps {
  children: React.ReactNode;
  requiredPassword: string;
  title: string;
  description?: string;
}

const PasswordProtected: React.FC<PasswordProtectedProps> = ({ 
  children, 
  requiredPassword, 
  title, 
  description 
}) => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === requiredPassword) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setAttempts(prev => prev + 1);
      setError('Contraseña incorrecta. Intente nuevamente.');
      setPassword('');
      
      // Block after 5 failed attempts
      if (attempts >= 4) {
        setError('Demasiados intentos fallidos. Contacte al administrador.');
      }
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  if (attempts >= 5) {
    return (
      <div className="min-h-96 flex items-center justify-center">
        <div className="card max-w-md w-full text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-xl font-bold text-red-800 mb-2">Acceso Bloqueado</h2>
          <p className="text-red-600 mb-4">
            Demasiados intentos fallidos de autenticación.
          </p>
          <p className="text-sm text-gray-600">
            Contacte al administrador del sistema para restablecer el acceso.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-96 flex items-center justify-center">
      <div className="card max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{title}</h2>
          {description && (
            <p className="text-gray-600 text-sm">{description}</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña de Acceso
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                placeholder="Ingrese la contraseña"
                disabled={attempts >= 5}
                autoFocus
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error}</p>
              {attempts > 0 && attempts < 5 && (
                <p className="text-xs text-red-600 mt-1">
                  Intentos restantes: {5 - attempts}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            disabled={!password || attempts >= 5}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Lock className="w-4 h-4 mr-2" />
            Acceder
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
            <Shield className="w-3 h-3" />
            <span>Contenido protegido - Solo personal autorizado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordProtected;