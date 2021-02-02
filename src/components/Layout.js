import React from 'react'
import { Link } from 'react-router-dom';
import '../scss/layout.scss';

function Layout({ children, sectionClass }) {
    return (
        <>
            <header className="header">
                <div className="wrapper">
                    <Link to="/">
                        <div className="header__logo">
                            <img src="https://img.icons8.com/fluent/50/000000/front-sorting.png" alt="logo" />
                            <span className="title">Editor</span>
                        </div>
                    </Link>
                </div>
            </header>

            <main>
                <div className="wrapper">
                    <section className={sectionClass}>
                        {children}
                    </section>
                </div>
            </main>
        </>
    )
}

export default Layout
