import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Header from './components/layout/Header/Header';
import Home from './pages/Home/Home';
import NotFound from './pages/NotFound/NotFound';

const App = () => {
  const [category, setCategory] = useState<'movie' | 'tv'>('movie');

  console.log('category:', category);

  return (
    <BrowserRouter>
      <Header category={category} setCategory={setCategory} />
      <Routes>
        <Route path='/' element={<Home category={category} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;