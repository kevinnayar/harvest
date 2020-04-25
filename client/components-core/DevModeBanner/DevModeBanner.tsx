import * as React from 'react';

export default () => {
  const styles: React.CSSProperties = {
    position: 'fixed',
    right: 20,
    bottom: 20,
    height: 50,
    lineHeight: '50px',
    width: 200,
    background: '#353434',
    color: 'white',
    textAlign: 'center',
    fontFamily: `"Courier New", Courier, monospace`,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    zIndex: 1,
    borderRadius: 4,
  };
  return <div style={styles}>🔥 dev mode 🔥</div>;
}

