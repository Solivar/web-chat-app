import { FaCircle } from 'react-icons/fa';
import HorizontalBreak from '../HorizontalBreak';

export default function UserList({ names }: { names: string[] }) {
  return (
    <section>
      <div>
        <strong>
          <span className="icon-text">
            <span className="icon is-size-7">
              <FaCircle style={{ color: '#4fcc49' }} />
            </span>
            <span>Users online ({names.length}) </span>
          </span>
        </strong>
      </div>
      <HorizontalBreak />
      <ul>
        {names.map(name => {
          return <li key={name}>{name}</li>;
        })}
      </ul>
    </section>
  );
}
