import { useContext, useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import styles from './SetName.module.scss';
import { MAX_NAME_LEN, MIN_NAME_LEN } from '../constants';
import { SocketContext } from '../socket-context';
import { useErrorEvents } from '../hooks/events/useErrorEvents';
import { useNameSetupEvents } from '../hooks/events/useNameSetupEvents';

export default function SetName({ updateName }: { updateName: (name: string) => void }) {
  const socket = useContext(SocketContext);
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef('');

  useEffect(() => {
    nameRef.current = name;
  }, [name]);

  useNameSetupEvents({ nameRef, updateName });
  useErrorEvents({ setError, setIsLoading });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError('');
    setName(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (name.length < MIN_NAME_LEN || MAX_NAME_LEN < name.length) {
      setError(`Name must be ${MIN_NAME_LEN} - ${MAX_NAME_LEN} characters long.`);

      return;
    }

    socket.emit('join:set_name', name);
    setIsLoading(true);
  }

  return (
    <div className="is-flex is-flex-direction-column is-justify-content-center is-align-items-center">
      <h1 className="is-size-1 has-text-weight-bold mb-5">Web Chat App</h1>
      <div className={`box`}>
        <h2 className="is-size-3 has-text-weight-bold mb-2">Get Started</h2>
        <p className="block">You need to specify a name before you can start chatting.</p>
        <form onSubmit={handleSubmit}>
          <div className="field">
            <label
              className="label"
              htmlFor="name"
            >
              Name
            </label>
            <div className="control">
              <input
                id="name"
                className={`input ${error ? 'is-danger' : ''}`}
                placeholder="Enter your name"
                value={name}
                onChange={handleChange}
                autoFocus
              />
            </div>
            <p className={`help is-danger ${styles.error}`}>{error}</p>
          </div>
          <div className="field mt-5 is-flex is-justify-content-flex-end">
            <div className="control">
              <button
                className={`button is-primary ${isLoading ? 'is-loading' : ''}`}
                disabled={isLoading}
              >
                <span className="is-uppercase has-text-weight-bold ">Start chatting</span>
                <span className="icon is-small">
                  <FaArrowRight />
                </span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
