import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'

import { Layout } from './components/Layout'
import Index from './pages/Index'
import NotFound from './pages/NotFound'
import Members from './pages/Members'
import Agenda from './pages/Agenda'
import Minutes from './pages/Minutes'
import ParkingLot from './pages/ParkingLot'
import Finance from './pages/Finance'
import Resources from './pages/Resources'
import History from './pages/History'

import MeetingLayout from './pages/meeting/MeetingLayout'
import Step1Opening from './pages/meeting/Step1Opening'
import Step2Updates from './pages/meeting/Step2Updates'
import Step3Selection from './pages/meeting/Step3Selection'
import Step4DeepDive from './pages/meeting/Step4DeepDive'
import Step5Housekeeping from './pages/meeting/Step5Housekeeping'

import { MainProvider } from './stores/main'
import { MeetingProvider } from './stores/useMeetingStore'
import { AttendanceProvider } from './stores/useAttendanceStore'
import { HistoryProvider } from './stores/useHistoryStore'
import { AuthProvider } from './hooks/use-auth'
import Login from './pages/Login'
import { ProtectedRoute } from './components/ProtectedRoute'

const App = () => (
  <AuthProvider>
    <MainProvider>
      <AttendanceProvider>
        <HistoryProvider>
          <MeetingProvider>
            <BrowserRouter future={{ v7_startTransition: false, v7_relativeSplatPath: false }}>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/login" element={<Login />} />

                  <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                      <Route path="/" element={<Index />} />
                      <Route path="/members" element={<Members />} />
                      <Route path="/agenda" element={<Agenda />} />
                      <Route path="/minutes" element={<Minutes />} />
                      <Route path="/parking-lot" element={<ParkingLot />} />
                      <Route path="/finance" element={<Finance />} />
                      <Route path="/resources" element={<Resources />} />
                      <Route path="/history" element={<History />} />
                    </Route>

                    <Route path="/meeting/:id" element={<MeetingLayout />}>
                      <Route index element={<Navigate to="step1" replace />} />
                      <Route path="step1" element={<Step1Opening />} />
                      <Route path="step2" element={<Step2Updates />} />
                      <Route path="step3" element={<Step3Selection />} />
                      <Route path="step4" element={<Step4DeepDive />} />
                      <Route path="step5" element={<Step5Housekeeping />} />
                    </Route>
                  </Route>

                  <Route path="*" element={<NotFound />} />
                </Routes>
              </TooltipProvider>
            </BrowserRouter>
          </MeetingProvider>
        </HistoryProvider>
      </AttendanceProvider>
    </MainProvider>
  </AuthProvider>
)

export default App
