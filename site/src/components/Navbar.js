import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';
import GithubButton from './GithubButton';
import MobileMenu from './MobileMenu';

class Navbar extends React.Component {
  state = {
    isFixed: false,
    navHeight: 0,
    isMobileMenu: false
  };

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const nav = document.getElementById('navbar');

    const threshold = 100;
    if (window.pageYOffset <= threshold) {
      this.setState({
        isFixed: false
      });
    } else if (!nav.classList.contains('fixed')) {
      this.setState({ isFixed: true, navHeight: nav.clientHeight });
    }
  };

  toggleMobileMenu = () => {
    this.setState(state => ({
      isMobileMenu: !state.isMobileMenu
    }));
  };

  render() {
    const { isFixed, navHeight, isMobileMenu } = this.state;
    return (
      <React.Fragment>
        {isFixed ? <div style={{ height: navHeight }} /> : null}
        <div
          id="navbar"
          className={`${
            isFixed ? 'fixed top-0 left-0 right-0 z-10 shadow-lg' : ''
          } bg-white`}
        >
          <div className="px-4 xs:px-6 lg:px-8">
            <div className="flex max-w-6xl mx-auto justify-between items-center py-6 md:justify-start md:space-x-10">
              <div className="w-0 flex-1 flex">
                <Link to="/" className="flex items-center">
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="/searchbox/images/RSlogo.svg"
                    alt="Workflow"
                  />
                  <span className="ml-2 text-xl text-gray-800">Searchbox</span>
                </Link>
              </div>
              <div className="block xs:hidden">
                <Button theme="gray" asLink onClick={this.toggleMobileMenu}>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>
              </div>

              <div className="hidden items-center justify-end space-x-2 sm:space-x-4 xs:flex  xs:flex-1">
                <GithubButton />
                <Button href="https://appbase.io/#support">
                  <svg
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5 mr-2"
                    fill="none"
                  >
                    <path
                      strokeLinecap="round"
                      className="mr-2"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                  Support
                </Button>
              </div>
              <MobileMenu visible={isMobileMenu} onToggle={this.toggleMobileMenu} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
