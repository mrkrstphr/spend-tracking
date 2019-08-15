import React from 'react';
import { Toaster } from '@blueprintjs/core';

export const ToastContext = React.createContext();

class Context extends React.Component {
  state = { toaster: null };

  refHandlers = {
    toaster: toaster => this.setState({ toaster }),
  };

  render() {
    const { children } = this.props;

    return (
      <ToastContext.Provider value={this.state.toaster}>
        <Toaster ref={this.refHandlers.toaster} />
        {children}
      </ToastContext.Provider>
    );
  }
}

export default Context;
