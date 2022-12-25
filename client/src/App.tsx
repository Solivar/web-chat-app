import { useEffect, useState } from 'react';
import { socket, SocketContext } from './socket-context';
import SetName from './views/SetName';

const App = () => {
  const [name, setName] = useState('');

  useEffect(() => {
    socket.on('join:accept_name', (name: string) => {
      setName(name);
    });

    return () => {
      socket.off('join:accept_name');
    };
  }, []);

  function handleUpdateName(name: string) {
    setName(name);
  }

  return (
    <section className="hero is-fullheight">
      <div className="hero-body is-justify-content-center">
        <SocketContext.Provider value={socket}>
          {name ? 'Logged in' : <SetName updateName={handleUpdateName} />}
        </SocketContext.Provider>
      </div>
    </section>
  );
};

export default App;
