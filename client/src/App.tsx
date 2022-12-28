import { useState } from 'react';
import { useConnectionEvents } from './hooks/events/useConnectionEvents';
import FullHeightLayout from './layouts/FullHeightLayout';
import { socket, SocketContext } from './socket-context';
import ChatRoom from './views/ChatRoom';
import LoadingScreen from './views/LoadingScreen';
import SetName from './views/SetName';

export default function App() {
  const [name, setName] = useState('');
  const [connected, setConnected] = useState(false);

  useConnectionEvents({ socket, setConnected });

  function handleUpdateName(name: string) {
    setName(name);
  }

  function handleLeaveRoom() {
    setName('');
  }

  if (!connected) {
    return <LoadingScreen />;
  }

  return (
    <SocketContext.Provider value={socket}>
      {name ? (
        <ChatRoom leaveRoom={handleLeaveRoom} />
      ) : (
        <FullHeightLayout>
          <SetName updateName={handleUpdateName} />
        </FullHeightLayout>
      )}
    </SocketContext.Provider>
  );
}
