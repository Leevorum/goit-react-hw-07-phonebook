import { createSelector } from '@reduxjs/toolkit';

export const getItems = state => state.contacts.items;
export const getFilter = state => state.contacts.filter;

// export const filteredContacts = state => {
//   const contacts = getItems(state);
//   const filter = getFilter(state);

//   const toLowerCaseFilter = filter.toLowerCase();
//   return contacts.filter(contact => {
//     return contact.name.toLowerCase().includes(toLowerCaseFilter);
//   });
// };

//  Filtered contacts
export const filteredContacts = createSelector(
  getItems,
  getFilter,
  (contacts, filter) => {
    return contacts.filter(contact => {
      return contact.name.toLowerCase().includes(filter.toLowerCase());
    });
  },
);
