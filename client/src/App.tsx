import { useState } from 'react';
import { socket, SocketContext } from './socket-context';
import ChatRoom from './views/ChatRoom';
import SetName from './views/SetName';

const App = () => {
  const [name, setName] = useState('');

  function handleUpdateName(name: string) {
    setName(name);
  }

  return (
    <section className="hero is-fullheight">
      <div className="hero-body is-justify-content-center">
        <SocketContext.Provider value={socket}>
          {name ? <ChatRoom /> : <SetName updateName={handleUpdateName} />}
        </SocketContext.Provider>
      </div>
    </section>
  );
};

export default App;
