import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center gap-2">
        <span className="text-indigo-600 font-bold text-lg tracking-tight mr-auto">
          QuestionPro
        </span>
        <NavLink to="/todos" className={linkClass}>Todos</NavLink>
        <NavLink to="/form-builder" className={linkClass}>Form Builder</NavLink>
        <NavLink to="/form-preview" className={linkClass}>Form Preview</NavLink>
      </div>
    </nav>
  );
}
