import React, { useState } from 'react';
import PropTypes from 'prop-types';
import s from './ContactForm.module.css';

export default function ContactForm({ onSubmit }) {
  const [state, setState] = useState({
    name: '',
    number: '',
  });

  const handleChange = evt => {
    // switch (evt.currentTarget.name) {
    //   case 'name':
    //     setState({ ...state, name: evt.target.value });
    //     break;
    //   case 'number':
    //     setState({ ...state, number: evt.target.value });
    //     break;
    //   default:
    //     return;
    // }
    evt.currentTarget.name === 'name'
      ? setState({ ...state, name: evt.target.value })
      : setState({ ...state, number: evt.target.value });
  };

  const handleAddContact = evt => {
    evt.preventDefault();
    onSubmit(state);
    setState({ name: '', number: '' });
  };

  return (
    <form className={s.contactForm} onSubmit={handleAddContact}>
      <label className={s.formItem}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          value={state.name}
          onChange={handleChange}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

      <label className={s.formItem}>
        Number
        <input
          type="tel"
          name="number"
          value={state.number}
          onChange={handleChange}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>

      <button type="submit" className={s.btn}>
        Add contact
      </button>
    </form>
  );
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
