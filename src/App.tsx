import { useState } from 'react';
import Layout from './components/common/Layout';
import ExecutiveDashboard from './components/dashboard/ExecutiveDashboard';
import AIEcosystemMap from './components/ai-modules/AIEcosystemMap';
import RouteOptimization from './components/maps/RouteOptimization';
import PredictiveAnalytics from './components/analytics/PredictiveAnalytics';
import CustomsIntelligence from './components/controls/CustomsIntelligence';
import OperationsControlTower from './components/controls/OperationsControlTower';
import MethodologyViewer from './components/methodology/MethodologyViewer';

function App() {
  const [currentModule, setCurrentModule] = useState('dashboard');

  const renderModule = () => {
    switch (currentModule) {
      case 'dashboard':
        return <ExecutiveDashboard />;
      case 'ai-ecosystem':
        return <AIEcosystemMap />;
      case 'routes':
        return <RouteOptimization />;
      case 'analytics':
        return <PredictiveAnalytics />;
      case 'customs':
        return <CustomsIntelligence />;
      case 'operations':
        return <OperationsControlTower />;
      case 'methodology':
        return <MethodologyViewer />;
      default:
        return <ExecutiveDashboard />;
    }
  };

  return (
    <Layout currentModule={currentModule} onModuleChange={setCurrentModule}>
      {renderModule()}
    </Layout>
  );
}

export default App;
