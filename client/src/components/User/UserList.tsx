import { FaCircle } from 'react-icons/fa';
import HorizontalBreak from '../HorizontalBreak';

export default function UserList({ names }: { names: string[] }) {
  return (
    <section>
      <div>
        <h3 className="is-size-6 has-text-weight-bold">
          <span className="icon-text">
            <span className="icon is-size-7">
              <FaCircle style={{ color: '#4fcc49' }} />
            </span>
            <span>Users online ({names.length}) </span>
          </span>
        </h3>
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
