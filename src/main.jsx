import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/css/index.css'
import App from './App.jsx'
import MovieCard from '@/components/MovieCard.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MovieCard movie={{title: "DoomsDay", release_date: "2026"}}/>
  </StrictMode>,
)
