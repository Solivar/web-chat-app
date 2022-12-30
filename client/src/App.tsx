import { useState } from 'react';
import { useConnectionEvents } from './hooks/events/useConnectionEvents';
import FullHeightLayout from './layouts/FullHeightLayout';
import { NameContext } from './context/name-context';
import { socket, SocketContext } from './context/socket-context';
import ChatRoom from './views/ChatRoom';
import LoadingScreen from './views/LoadingScreen';
import SetName from './views/SetName';

export default function App() {
  const [connected, setConnected] = useState(false);
  const [name, setName] = useState('');

  useConnectionEvents({ socket, setConnected });

  if (!connected) {
    return <LoadingScreen />;
  }

  return (
    <SocketContext.Provider value={socket}>
      <NameContext.Provider value={{ value: name, setValue: setName }}>
        {name ? (
          <ChatRoom />
        ) : (
          <FullHeightLayout>
            <SetName />
          </FullHeightLayout>
        )}
      </NameContext.Provider>
    </SocketContext.Provider>
  );
}
