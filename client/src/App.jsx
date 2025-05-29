import React, { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import HomeMediator from './mediators/HomeMediator'
import WatchMediator from './mediators/WatchMediator'
import AuthMediator from './mediators/AuthMediator.jsx'
import ExploreMediator from './mediators/ExploreMediator'
import BookmarkMediator from './mediators/BookmarkMediator.jsx'
import NavigateContext from './contexts/NavigateContext.js'
import PageNotFound from './pages/404/PageNotFound.jsx'
import MainLoadingScreen from './components/LoadingScreens/MainLoadingScreen.jsx'
import ScrollToTop from './utils/ScrollToTop.js'
import { MusicProvider } from './contexts/MusicContext.jsx'

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const [showContent, setShowContent] = useState(false);

  const onNavigate = (path) => {
    navigate(path);
  }

  return (
    <MusicProvider>
      <NavigateContext.Provider value={onNavigate}>
        {!showContent ? (
          <MainLoadingScreen onCompleteAnim={() => setShowContent(true)} />
        ) : (
          <AnimatePresence mode='wait'>
            <ScrollToTop />

            <Routes location={location} key={location.pathname}>
              <Route path='/' element={<HomeMediator />} />
              <Route path='/explore' element={<ExploreMediator />} />
              <Route path='/watch/:mediaType/:mediaId' element={<WatchMediator />} />
              <Route path='/auth' element={<AuthMediator />} />
              <Route path='/favorites' element={<BookmarkMediator />} />
              <Route path='*' element={<PageNotFound />} />
            </Routes>
          </AnimatePresence>
        )}
      </NavigateContext.Provider>
    </MusicProvider>
  )
}

export default App
