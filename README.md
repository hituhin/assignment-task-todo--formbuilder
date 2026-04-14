# QuestionPro — React Assessment

A React + TypeScript application with two independent features: a **Todo List** with live API data and a **Dynamic Form Builder**.

---

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.



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
| CSS Modules | Scoped component-level styling |
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
- **Pagination** — 10 items per page  global row numbering across pages.
- Sticky filter bar and sticky table header while scrolling

### Persistence approach
Two layers work together:

1. **TanStack Query** (`staleTime: 5min`) — API data is cached in memory for the full browser session. Navigating away and back does not re-fetch.
2. **Zustand `persist` middleware** — Filter and pagination state is automatically serialised to `localStorage` on every change. Filters survive both route navigation **and** page refresh until the user explicitly resets them.

---

## Feature 2 — Dynamic Form Builder

### Form Builder (`/form-builder`)
- Add any number of fields dynamically
- Each field has:
  - **Input Type** — Text, Email, Number, Text Area, Checkbox (toggle), Dropdown, Single Radio, Multiple Radio
  - **Label / Name** — text input (required)
  - **Column Width** — 1/3, 1/2, or Full row (controls layout in the preview grid)
  - **Required** toggle
  - For Dropdown, Single Radio, Multiple Radio: add / remove individual options
- Validation on save — both Label and Input Type are required fields; inline errors shown per card
- Reorder fields with ↑ / ↓ buttons; remove individual fields
- On revisit, previously saved config is loaded back into the builder
- **Save & Preview** serialises the field config to `localStorage` and navigates to the preview page

### Form Preview (`/form-preview`)
- Reads the saved form config from `localStorage`
- Renders the correct input element for each field type
- Dynamic 6-column grid — each field occupies 2, 3, or 6 columns based on the width set in the builder (1/3 / 1/2 / Full)
- Required-field validation — inline error messages per field
- On **Submit**: logs the submitted values to the browser console (keyed by field label)
- Reset button clears all values and errors

---

