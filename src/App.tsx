import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginForm from './components/Auth/LoginForm';
import Sidebar from './components/Layout/Sidebar';
import Header from './components/Layout/Header';
import WelcomeToast from './components/Common/WelcomeToast';
import DashboardView from './components/Dashboard/DashboardView';
import CustomersView from './components/Customers/CustomersView';
import OrdersView from './components/Orders/OrdersView';
import ProductsView from './components/Products/ProductsView';
import KnowledgeView from './components/Knowledge/KnowledgeView';
import SettingsView from './components/Settings/SettingsView';
import AfterSalesView from './components/AfterSales/AfterSalesView';
import AttendanceView from './components/Attendance/AttendanceView';

const AppContent: React.FC = () => {
  const { isAuthenticated, user, loginStatus, loginMessage, clearLoginMessage } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const getTabTitle = (tab: string): string => {
    const titles = {
      dashboard: '仪表盘',
      customers: '客户管理',
      orders: '订单管理',
      products: '产品管理',
      knowledge: '知识库',
      attendance: '考勤管理',
      analytics: '数据分析',
      settings: '系统设置',
      after_sales: '售后服务'
    };
    return titles[tab as keyof typeof titles] || '仪表盘';
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'customers':
        return <CustomersView />;
      case 'orders':
        return <OrdersView />;
      case 'products':
        return <ProductsView />;
      case 'knowledge':
        return <KnowledgeView />;
      case 'attendance':
        return <AttendanceView />;
      case 'analytics':
        return <DashboardView />; // Reusing dashboard for now
      case 'settings':
        return <SettingsView />;
      case 'after_sales':
        return <AfterSalesView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getTabTitle(activeTab)} />
        
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {/* 欢迎提示 */}
      <WelcomeToast
        isOpen={loginStatus === 'success' && !!loginMessage}
        message={loginMessage}
        onClose={clearLoginMessage}
      />
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;