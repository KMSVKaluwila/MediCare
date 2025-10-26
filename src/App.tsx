import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Home from "./pages/Home";
import PatientRegistration from "./pages/PatientRegistration";
import DoctorRegistration from "./pages/DoctorRegistration";
import BookAppointment from "./pages/BookAppointment";
import ManageAppointments from "./pages/ManageAppointments";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/patient-registration" element={<PatientRegistration />} />
            <Route path="/doctor-registration" element={<DoctorRegistration />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/manage-appointments" element={<ManageAppointments />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
