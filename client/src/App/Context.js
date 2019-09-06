import { Toaster } from '@blueprintjs/core';
import React from 'react';
import { ThemeProvider } from 'styled-components';

export const AppContext = React.createContext();

const themes = {
  light: {
    name: 'light',
    appBgColor: '#f9fafa',
    appFgColor: '#111',
    bodyBgColor: '#fff',
    textMutedColor: '#9f9a9c',
  },
  dark: { name: 'dark', appBgColor: '#2f404d' },
};

class Context extends React.Component {
  state = { theme: 'light', token: null, user: null };

  toaster = null;
  toasterRef = ref => (this.toaster = ref);

  componentDidMount() {
    const storedState = localStorage.getItem('appContext');
    if (storedState) {
      this.setState(JSON.parse(storedState));
    }
  }

  componentWillUnmount() {
    this.persist();
  }

  isAuthenticated = () => {
    return this.state.user !== null; // TODO: Check token expiration
  };

  logout = () => {
    localStorage.removeItem('appContext');
    this.setState({ user: null, token: null });
  };

  setToken = ({ user, ...token }) => {
    this.setState({ user, token });
    this.persist();
  };

  toggleTheme = () =>
    this.setState({
      theme: this.state.theme.name === 'dark' ? 'light' : 'dark',
    });

  persist = () => {
    localStorage.setItem('appContext', JSON.stringify(this.state));
  };

  notify = (message, intent = 'success') =>
    this.toaster.show({ message, intent });

  render() {
    const { login, router } = this.props;

    return (
      <AppContext.Provider
        value={{
          isAuthenticated: this.isAuthenticated,
          logout: this.logout,
          notify: this.notify,
          setToken: this.setToken,
          theme: this.state.theme,
          toggleTheme: this.toggleTheme,
          user: this.state.user,
        }}
      >
        <ThemeProvider theme={themes[this.state.theme]}>
          <>
            <Toaster ref={this.toasterRef} />
            {this.isAuthenticated() ? router() : login()}
          </>
        </ThemeProvider>
      </AppContext.Provider>
    );
  }
}

export default Context;
