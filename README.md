# QuestionPro — React Assessment

A React + TypeScript application with two independent features: a **Todo List** with live API data and a **Dynamic Form Builder**.

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Other scripts

| Command | Description |
|---|---|
| `npm run build` | Type-check + production build |
| `npm run typecheck` | TypeScript check without building |
| `npm run preview` | Preview the production build |

---

## Tech Stack

| Package | Purpose |
|---|---|
| React 18 + TypeScript | UI + type safety |
| React Router v6 | Client-side routing |
| TanStack Query v5 | Server state & in-session caching |
| Zustand | Client state (filters, form builder fields) |
| Tailwind CSS v3 | Styling |
| Vite | Build tool / dev server |

---

## Routes

| Path | Page |
|---|---|
| `/` | Redirects to `/todos` |
| `/todos` | Todo List |
| `/form-builder` | Dynamic Form Builder |
| `/form-preview` | Form Preview & Submit |

---

## Feature 1 — Todo List

### What it does
- Fetches 200 todos and 10 users from [JSONPlaceholder](https://jsonplaceholder.typicode.com)
- Displays each todo with its **title**, **status badge** (Completed / Pending), and **assigned user name** (mapped from `userId`)
- Filter by **user** and **status** (All / Completed / Pending)
- **Pagination** — 10 items per page with smart ellipsis navigation, global row numbering across pages
- Sticky filter bar and sticky table header while scrolling

### Persistence approach
Two layers work together:

1. **React Query** (`staleTime: 5min`) — API data is cached in memory for the full browser session. Navigating away and back does not re-fetch.
2. **Zustand `persist` middleware** — Filter and pagination state is automatically serialised to `localStorage` on every change and re-hydrated on boot. Filters survive both route navigation **and** page refresh until the user explicitly resets them.

---

## Feature 2 — Dynamic Form Builder

### Form Builder (`/form-builder`)
- Add any number of fields dynamically
- Each field has:
  - **Label / Name** (text input)
  - **Input Type**: Text, Email, Number, Text Area, Checkbox, Dropdown
  - **Required** toggle
  - For **Dropdown** type: add / remove individual options
- Reorder fields with ↑ / ↓ buttons
- Remove individual fields
- On revisit, previously saved config is loaded back into the builder
- **Save & Preview** serialises the field config to `localStorage` and navigates to the preview page

### Form Preview (`/form-preview`)
- Reads the saved form config from `localStorage`
- Renders the correct input element for each field type
- Required-field validation — inline error messages per field
- On **Submit**: logs the submitted values to the browser console (keyed by field label)
- Reset button clears all values and errors

---

## Project Structure

```
src/
├── api/              # Pure fetch functions (fetchTodos, fetchUsers)
├── components/
│   ├── form-builder/ # FieldCard, DropdownOptionsEditor
│   ├── form-preview/ # DynamicField
│   ├── layout/       # Navbar
│   └── todos/        # TodoRow, TodoTable, TodoFilters, Pagination
├── hooks/            # useTodos, useUsers, useFormConfig
├── pages/            # TodosPage, FormBuilderPage, FormPreviewPage
├── store/            # todoFilterStore (Zustand + persist), formBuilderStore (Zustand)
├── types/            # Shared TypeScript interfaces & types
└── utils/            # constants, localStorage helpers
```
