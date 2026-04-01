import { NavLink } from 'react-router-dom';

export default function SlotNav() {
  return (
    <nav className="slot-nav">
      <NavLink
        to="/"
        end
        className={({ isActive }) => `slot-link ${isActive ? 'slot-link-active' : ''}`}
      >
        Dashboard
      </NavLink>
      <NavLink
        to="/wallet"
        className={({ isActive }) => `slot-link ${isActive ? 'slot-link-active' : ''}`}
      >
        Wallet
      </NavLink>
      <NavLink
        to="/markets"
        className={({ isActive }) => `slot-link ${isActive ? 'slot-link-active' : ''}`}
      >
        Markets
      </NavLink>
      <NavLink
        to="/settings"
        className={({ isActive }) => `slot-link ${isActive ? 'slot-link-active' : ''}`}
      >
        Settings
      </NavLink>
      <NavLink
        to="/idee"
        className={({ isActive }) => `slot-link slot-link-ideas ${isActive ? 'slot-link-active' : ''}`}
      >
        Idee
      </NavLink>
    </nav>
  );
}
