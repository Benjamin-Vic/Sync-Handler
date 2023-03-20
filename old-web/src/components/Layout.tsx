import './Layout.css'

import { Outlet } from 'react-router-dom';
import { useState } from 'react';
// import { Transition } from 'react-transition-group';

const Layout = () => {
    const [sidenav, setSidenav] = useState(false);
    // const nodeRef = useRef(null);

    const nav: any = [
        { name: "Rank", href: "/rank" },
        { name: "Player", href: "/player" },
        { name: "Permission", href: "/permission" },
        { name: "User", href: "/user" },
    ]

    const toggleSidenav = () => {
        setSidenav(!sidenav)
    }

    const compileNav = () => {
        return nav.map((item: any, index: number) => (
            <a href={item.href} key={index}>
                {item.name}
            </a>
        ));
    }

    const compileSidenav = () => {
        return (
            <div className="sidenav">
                {compileNav()}
            </div>
        );
    }

    return (
        <>
            <div className="Layout">
                <div className="container app">
                    <a href="/">Sync-Handler</a>
                </div>
                <div className="container desktop">
                    {compileNav()}
                </div>
                <div className="container mobile">
                    <button onClick={toggleSidenav}>
                        <img src="/icon/menu.svg" alt="menu" />
                    </button>
                </div>
                {/* <Transition nodeRef={nodeRef} in={sidenav} timeout={300}>
                    {(state) => (
                        <div className={`sidenav ${state}`} ref={nodeRef}>
                            {compileNav()}
                        </div>
                    )}
                </Transition> */}

                {/* {sidenav ? compileSidenav() : null} */}
            </div>
            <div className='Content'>
                <Outlet />
            </div>
        </>
    )
}

export default Layout;
