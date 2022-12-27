import { useState } from 'react';
import { useConnectionEvents } from './hooks/events/useConnectionEvents';
import { socket, SocketContext } from './socket-context';
import ChatRoom from './views/ChatRoom';
import SetName from './views/SetName';

const App = () => {
  const [name, setName] = useState('');
  const [connected, setConnected] = useState(false);

  useConnectionEvents({ socket, setConnected });

  function handleUpdateName(name: string) {
    setName(name);
  }

  if (!socket.connected) {
    return;
  }

  return (
    <section className="hero is-fullheight">
      <div className="hero-body is-justify-content-center">
        {!connected && (
          <>
            <div className="block">
              <div
                className="loader-big mx-auto mb-5"
                aria-label="Currently loading"
              ></div>
              <p>Connecting to server</p>
            </div>
          </>
        )}

        {connected && (
          <SocketContext.Provider value={socket}>
            {name ? <ChatRoom /> : <SetName updateName={handleUpdateName} />}
          </SocketContext.Provider>
        )}
      </div>
    </section>
  );
};

export default App;
