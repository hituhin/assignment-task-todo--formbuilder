import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import TodosPage from './pages/TodosPage/TodosPage';
import FormBuilderPage from './pages/FormBuilderPage/FormBuilderPage';
import FormPreviewPage from './pages/FormPreviewPage/FormPreviewPage';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6 py-8">
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/form-builder" element={<FormBuilderPage />} />
          <Route path="/form-preview" element={<FormPreviewPage />} />
        </Routes>
      </main>
    </div>
  );
}
