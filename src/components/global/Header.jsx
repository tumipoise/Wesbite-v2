import React, { useState } from "react"
import { Link } from "gatsby"
import { useTransition, animated } from "react-spring"
import ClickAwayListener from "react-click-away-listener"

function Header() {
  const [mobileNav, setMobileNav] = useState(false)
  const [navHiddenClass, setNavHiddenClass] = useState("")
  const [closeButton, setCloseButton] = useState(false)
  const [dropDown, setDropdown] = useState(false)
  const transitions = useTransition(dropDown, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const showDropdown = e => {
    e.preventDefault()
    setDropdown(!dropDown)
  }

  const dropdownComponent = transitions.map(
    ({ item, key, props }) =>
      item && (
        <animated.div key={key} style={props} className="nav-link__dropdown">
          <ClickAwayListener onClickAway={() => setDropdown(false)}>
            <div className="nav-link__dropdown-list">
              <Link to="/project">Projects</Link>
            </div>
            <div className="nav-link__dropdown-list">
              <Link to="http://blog.devcareer.io/">Blogs</Link>
            </div>
          </ClickAwayListener>
        </animated.div>
      )
  )

  return (
    <nav>
      <div className="header-content">
        <Link to="/">
          <img
            src="https://res.cloudinary.com/dctmgu7mb/image/upload/v1601332391/devLogo_ocngza.png"
            alt="DevCareer_Logo"
            className="header-content__image"
          />
        </Link>

        <ul className="nav-link__desktop">
          <li>
            <Link to="/" activeClassName="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about-us" activeClassName="active">
              About
            </Link>
          </li>
          <li>
            <Link to="/gallery" activeClassName="active">
              Gallery
            </Link>
          </li>
          <li style={{ position: "relative" }}>
            <Link to="#" activeClassName="active" onClick={showDropdown}>
              Resources
            </Link>

            {dropdownComponent}
          </li>
          <li>
            <Link to="/talent" activeClassName="active">
              Talents
            </Link>
          </li>
          <li>
            <Link to="/support-us" activeClassName="active">
              <button className="button button--outline">Support Us</button>
            </Link>
          </li>
        </ul>

        <div
          onClick={() => {
            setMobileNav(!mobileNav)
            if (!closeButton)
              setTimeout(() => setCloseButton(!closeButton), 400)
            else setCloseButton(!closeButton)
            if (mobileNav) {
              setNavHiddenClass("slide-out-left")
              document.body.style.position = ""
            } else {
              document.body.style.position = "fixed"
            }
          }}
          onKeyDown={() => {
            setMobileNav(!mobileNav)
            if (!closeButton)
              setTimeout(() => setCloseButton(!closeButton), 400)
            else setCloseButton(!closeButton)
            if (mobileNav) {
              setNavHiddenClass("slide-out-left")
              document.body.style.position = ""
            } else {
              document.body.style.position = "fixed"
            }
          }}
          className="mobile-nav-toggle"
          role="button"
          tabIndex={0}
        >
          {!closeButton ? (
            <img
              src="https://res.cloudinary.com/drqltx8ye/image/upload/v1601483589/menu_1_l4desc.svg"
              alt="Hamburger icon"
              className="mobile-nav-toggle__open"
            />
          ) : (
            <img
              src="https://res.cloudinary.com/drqltx8ye/image/upload/v1601644095/close_2_vluprf.svg"
              alt="Close icon"
              className="mobile-nav-toggle__close"
            />
          )}
        </div>

        <div
          className={`mobile-nav ${
            mobileNav ? "mobile-nav--visible slide-in-left" : navHiddenClass
          }`}
        >
          <ul className="mobile-nav__links">
            <li>
              <Link to="/" activeClassName="active">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about-us" activeClassName="active">
                About
              </Link>
            </li>
            <li>
              <Link to="/gallery" activeClassName="active">
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/project" activeClassName="active">
                Projects
              </Link>
            </li>
            <li>
              <Link to="http://blog.devcareer.io/" activeClassName="active">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/talent" activeClassName="active">
                Talents
              </Link>
            </li>
            <li>
              <Link
                className="support-link"
                to="/support-us"
                activeClassName="active"
              >
                <button className="button button--outline">Support Us</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
export default Header
