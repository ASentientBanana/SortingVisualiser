import React, { useEffect, createRef, useContext } from 'react'
import './NavigationBar.css'
import M from 'materialize-css';
import { AlogorithmContext } from '../../contexts/algorithmContext/CurrentAlgoritmContext'

function NavigationBar() {
    const dropdowns = ["Bubble", "Quick"];
    const navDropdown = createRef<HTMLAnchorElement>();
    const [currentAlgorithm, setCurrentAlgorithm] = useContext<any>(AlogorithmContext);
    const options = {
        inDuration: 300,
        outDuration: 300,
        hover: true, // Activate on hover
        coverTrigger: false, // Displays dropdown below the button
    };
    useEffect(() => {
        // M.AutoInit();
        // if (navDropdown.current != null) {
        //     M.Dropdown.init(navDropdown.current, options)
        // }
    }, []);
    return (
        <div>
            {/* <ul id="dropdown1" className="dropdown-content ">
                {dropdowns.map((alg, index) => (
                    <li key={index} className=' nav-dropdown-elem ' onClick={() => {
                        setCurrentAlgorithm(alg)
                        console.log(currentAlgorithm)
                    }} ><div>{alg} sort</div></li>
                ))}
                 <li><a  className='nav-dropdown-elem' href="#!">three</a></li> 
            </ul> */}
            <nav>
                <div className="nav-wrapper">
                    <a href="#!" className="brand-logo center">Sorting Algorithm</a>
                    <ul className="right hide-on-med-and-down">
                        {/* <li><a href="sass.html">Sass</a></li>
                        <li><a href="badges.html">Components</a></li> */}
                        <li><a className="dropdown-trigger" href="#!" data-target="dropdown1" ref={navDropdown}>Chose an algorithm</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavigationBar
