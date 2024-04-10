import React from 'react';

const Menu = () => {
    return(
        <nav id='navbar' className="menu menu-navbar gridrowfull">
            <div className="menu-left col-d-2 col-12">
                <a href="/">Store</a>
            </div>
            <div className="menu-right col-d-10 col-10">
                <ul className="col-12 gridrow">
                    <li>
                        <a href="#">About Us</a>
                    </li>
                    <li>
                        <a href="#">Store</a>
                    </li>
                    <li>
                        <a href="#">Contact Us</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Menu;
