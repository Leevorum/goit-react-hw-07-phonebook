import { useSelector } from 'react-redux';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactList from 'components/ContactList/ContactList';
import Section from 'components/Section/Section';
import {
  useGetAllContactsQuery,
  useAddContactMutation,
} from '../../redux/contacts-api';
import { getFilter } from 'redux/phoneBookSelectors';
import { useMemo } from 'react';

import toast, { Toaster } from 'react-hot-toast';

export function App() {
  const filteredState = useSelector(getFilter);

  const { data } = useGetAllContactsQuery();
  const [addContact] = useAddContactMutation();

  //Filter contacts + useMemo
  const filteredContacts = useMemo(() => {
    const contacts = data;
    const filter = filteredState;

    const toLowerCaseFilter = filter.toLowerCase();
    return contacts?.filter(contact => {
      return contact.name.toLowerCase().includes(toLowerCaseFilter);
    });
  }, [filteredState, data]);

  //Add contacts
  const handleAddContact = formData => {
    const existContact = data.filter(contact => {
      return contact.name.toLowerCase().includes(formData.name.toLowerCase());
    });
    // If the name is in the contact list, throw a notification and cancel the code execution
    if (existContact.length > 0) {
      const existNotification = () => {
        toast.error(`${formData.name}, is already in your contacts`, {
          position: 'top-left',
        });
      };
      existNotification();
      return;
    }
    addContact({ name: formData.name, phone: formData.number });
    const successNotification = () =>
      toast.success(`Succes! ${formData.name} was added`, {
        position: 'top-left',
      });
    successNotification();
  };

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm onSubmit={handleAddContact} />
      </Section>
      <Toaster />
      <Section title="Contacts">
        <Filter />
        {data && <ContactList data={filteredContacts} />}
      </Section>
    </div>
  );
}