import React, { useState } from 'react';
import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import { useUser } from './User/UserContext';

const NavMenu = () => {
    const [collapsed, setCollapsed] = useState(true);
    const { user, logout } = useUser();

    const toggleNavbar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <header>
            <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" container light>
                <NavbarBrand tag={Link} to="/">ReactClinic</NavbarBrand>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!collapsed} navbar>
                    <ul className="navbar-nav flex-grow">
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/">Home</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/doctors">Doctors</NavLink>
                        </NavItem>
                        {(user && user.isDoctor) && (
                            <NavItem>
                                <NavLink tag={Link} className="text-dark" to="/patients">Patients</NavLink>
                            </NavItem>
                        )}
                        <NavItem>
                            <NavLink tag={Link} className="text-dark" to="/schedules">Schedules</NavLink>
                        </NavItem>
                        {!user && (
                            <>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/login">Login</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/patients/create">Register</NavLink>
                                </NavItem>
                            </>
                        )}
                        {user && (
                            <>
                                {user.isDoctor && (
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/appointments/create">Appointments</NavLink>
                                    </NavItem>
                                )}
                                {!user.isDoctor && (
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/appointments">Appointments</NavLink>
                                    </NavItem>
                                )}
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/profile">Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <button tag={Link} className="text-dark" onClick={logout}>Log out</button>
                                </NavItem>
                            </>
                        )}
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
};

export default NavMenu;
