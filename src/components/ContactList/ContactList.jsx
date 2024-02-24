import React from 'react';
import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

const ContactList = ({ contacts, filter, onDelete }) => {
  const filteredContacts =
    filter &&
    contacts &&
    contacts.filter(
      contact =>
        contact &&
        contact.name &&
        contact.name.toLowerCase().includes(filter.toLowerCase()) &&
        contact.number
    );

  const displayedContacts = filter ? filteredContacts : contacts;

  return (
    <ul className={styles.ul}>
      {displayedContacts &&
        displayedContacts.map(contact => (
          <li key={contact.id} className={styles.li}>
            {contact && contact.name} - {contact && contact.number}
            <button
              type="button"
              className={styles['delete-button']}
              onClick={() => onDelete(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
  onDelete: PropTypes.func,
};

export default ContactList;
