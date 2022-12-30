import { useContext, useEffect, useRef, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

import styles from './SetName.module.scss';
import { NAME_MAX_LENGTH, NAME_MIN_LENGTH } from '../../../server/src/constants';
import { SocketContext } from '../context/socket-context';
import { useErrorEvents } from '../hooks/events/useErrorEvents';
import { useNameSetupEvents } from '../hooks/events/useNameSetupEvents';
import { NameContext } from '../context/name-context';

export default function SetName() {
  const socket = useContext(SocketContext);
  const nameContext = useContext(NameContext);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const nameRef = useRef('');
  const [name, setName] = useNameSetupEvents({ nameRef, updateName: nameContext.setValue });

  useEffect(() => {
    nameRef.current = name;
  }, [name]);

  useErrorEvents({ setError, setIsLoading });

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError('');
    setName(event.target.value);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (name.length < NAME_MIN_LENGTH || NAME_MAX_LENGTH < name.length) {
      setError(`Name must be ${NAME_MIN_LENGTH} - ${NAME_MAX_LENGTH} characters long.`);

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
