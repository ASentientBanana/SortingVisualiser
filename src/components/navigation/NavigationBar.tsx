import React, { useEffect, createRef, useContext } from 'react'
import './NavigationBar.css'
import M from 'materialize-css';
import { AlogorithmContext } from '../../contexts/algorithmContext/CurrentAlgoritmContext'

function NavigationBar() {
  const navDropdown = createRef<HTMLAnchorElement>();

  return (
    <nav className="nav-wrapper">
      <span className="brand-logo center">Sorting Algorithms</span>
    </nav>
  );
}

export default NavigationBar
