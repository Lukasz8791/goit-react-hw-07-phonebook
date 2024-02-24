import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsActions } from '../redux/contactsSlice';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

const App = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.contacts.filter);

  const handleBeforeUnload = useCallback(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    const storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
      dispatch(contactsActions.fetchContacts(JSON.parse(storedContacts)));
    } else {
      dispatch(contactsActions.fetchContacts());
    }
  }, [dispatch]);

  useEffect(() => {
    const handleUnload = () => handleBeforeUnload();

    window.addEventListener('beforeunload', handleUnload);

    return () => {
      window.removeEventListener('beforeunload', handleUnload);
    };
  }, [handleBeforeUnload]);

  const handleAddContact = newContact => {
    dispatch(contactsActions.addContactAsync(newContact));
  };

  const handleDeleteContact = id => {
    dispatch(contactsActions.deleteContactAsync(id));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm addContact={handleAddContact} />
      <h2>Contacts</h2>
      <Filter
        filter={filter}
        setFilter={value => dispatch(contactsActions.setFilter(value))}
      />
      <ContactList
        contacts={contacts}
        filter={filter}
        onDelete={handleDeleteContact}
      />
    </div>
  );
};

export default App;
