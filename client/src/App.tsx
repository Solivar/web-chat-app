import { useState } from 'react';
import SetName from './views/SetName';

const App = () => {
  const [name, setName] = useState('');

  function handleUpdateName(name: string) {
    setName(name);
  }

  return (
    <section className="hero is-fullheight">
      <div className="hero-body is-justify-content-center">
        <SetName updateName={handleUpdateName} />
      </div>
    </section>
  );
};

export default App;
