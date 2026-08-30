import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import NetworkPage from "../pages/Network/NetworkPage";
import TrainsPage from "../pages/Trains/TrainsPage";
import TrainDetailsPage from "../pages/TrainDetails/TrainDetailsPage";
import AlertsPage from "../pages/Alerts/AlertsPage";
import AnalyticsPage from "../pages/Analytics/AnalyticsPage";
import AIAssistantPage from "../pages/AI/AIAssistantPage";
import SettingsPage from "../pages/Settings/SettingsPage";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/network" element={<NetworkPage />} />
          <Route path="/trains" element={<TrainsPage />} />
          <Route path="/trains/:id" element={<TrainDetailsPage />} />
          <Route path="/alerts" element={<AlertsPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
};

export default AppRoutes;