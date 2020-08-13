import React from 'react';
import { Link } from 'react-router-dom';
import Button from './Button';

class Navbar extends React.Component {
  state = {
    isFixed: false,
    navHeight: 0
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

  render() {
    const { isFixed, navHeight } = this.state;
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
                    src="../../searchbox/images/RSlogo.svg"
                    alt="Workflow"
                  />
                  <span className="ml-2 text-xl text-gray-800">Searchbox</span>
                </Link>
              </div>
              <div className="md:flex items-center justify-end space-x-8 md:flex-1">
                <span className="inline-flex rounded-md shadow-sm">
                  <Button href="https://appbase.io/#support">Support</Button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Navbar;
