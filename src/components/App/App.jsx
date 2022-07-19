import { useSelector, useDispatch } from 'react-redux';
import { add, remove } from 'redux/phoneBookSlice';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import Section from 'components/Section/Section';
import { getItems } from 'redux/phoneBookSelectors';

export function App() {
  const contacts = useSelector(getItems);
  const dispatch = useDispatch();

  //Add contacts
  const handleAddContact = data => {
    const existContact = contacts.filter(contact => {
      return contact.name.toLowerCase().includes(data.name.toLowerCase());
    });
    // If the name is in the contact list, throw a notification and cancel the code execution
    if (existContact.length > 0) {
      alert(`${data.name}, is already in your contacts`);
      return;
    }
    //Add an ID to a contact
    const id = nanoid();

    dispatch(add({ name: data.name, id: id, number: data.number }));
  };

  // //Delete a contact with ID
  const deleteContact = contactId => {
    //Return a new state without contact
    dispatch(remove(contactId));
  };

  return (
    <div>
      <Section title="Phonebook" border="1px solid">
        <ContactForm onSubmit={handleAddContact} />
      </Section>

      <Section title="Contacts">
        <Filter />
        <ContactList onDelete={deleteContact} />
      </Section>
    </div>
  );
}
