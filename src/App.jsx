import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import FormBuilderPage from './pages/FormBuilderPage/FormBuilderPage';
import FormPreviewPage from './pages/FormPreviewPage/FormPreviewPage';
import styles from './App.module.css';

// TODO: TodosPage — to be implemented
function TodosPage() {
  return <p style={{ color: 'var(--color-text-muted)' }}>Todos — coming soon.</p>;
}

export default function App() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<Navigate to="/todos" replace />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/form-builder" element={<FormBuilderPage />} />
          <Route path="/form-preview" element={<FormPreviewPage />} />
        </Routes>
      </main>
    </>
  );
}
