import React, { useState } from 'react';
import { GlobalStyle } from '../components/styled-components';
import { CenteredContainer } from '../components/styled-components';

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <>
      <GlobalStyle darkMode={darkMode} />
      <button onClick={toggleDarkMode}>
        {darkMode ? 'DarkMode' : 'LightMode'}
      </button>
      <CenteredContainer>
        <Component {...pageProps} />
      </CenteredContainer>
    </>
  );
}
