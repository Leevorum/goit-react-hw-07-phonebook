import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import { useSelector } from 'react-redux';
import { filteredContacts } from 'redux/phoneBookSelectors';

export default function ContactList({ onDelete }) {
  const filteredState = useSelector(filteredContacts);

  return (
    <ul className={s.list}>
      {filteredState.map(contact => {
        return (
          <li key={contact.id} className={s.listItem}>
            {contact.name} : {contact.number}
            <button onClick={() => onDelete(contact.id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
}

ContactList.propTypes = {
  onDelete: PropTypes.func.isRequired,
};
