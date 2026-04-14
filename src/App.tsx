import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import TodosPage from './pages/TodosPage/TodosPage';
import FormBuilderPage from './pages/FormBuilderPage/FormBuilderPage';
import FormPreviewPage from './pages/FormPreviewPage/FormPreviewPage';
import styles from './App.module.css';

export default function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
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
