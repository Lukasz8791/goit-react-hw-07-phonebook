import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsActions } from '../../redux/contactsSlice';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);

  const [formData, setFormData] = useState({
    name: '',
    number: '',
    nameError: '',
    numberError: '',
  });

  const { name, number, nameError, numberError } = formData;

  const handleSubmit = e => {
    e.preventDefault();

    const phoneRegExp = /^\+?[0-9\s()-]{7,}$/;

    if (!phoneRegExp.test(number)) {
      setFormData({
        ...formData,
        numberError: 'Insert correct number',
      });
      return;
    }

    const existingContactWithNumber = contacts.find(
      contact => contact.number === number
    );

    if (existingContactWithNumber) {
      setFormData({
        ...formData,
        nameError: `This number is assigned to the contact ${existingContactWithNumber.name}`,
      });
      return;
    }

    const isNameAlreadyExists = contacts.some(
      contact =>
        contact.name && contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isNameAlreadyExists) {
      setFormData({
        ...formData,
        nameError: 'Contact with this name already exists',
      });
      return;
    }

    const newContact = {
      id: nanoid(),
      name: name,
      number: number,
    };

    dispatch(contactsActions.addContactAsync(newContact));
    setFormData({
      name: '',
      number: '',
      nameError: '',
      numberError: '',
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label>
        <span>Name:</span>
        <input
          className={styles.input}
          type="text"
          name="name"
          pattern="^[^\d]+$"
          required
          value={name}
          onChange={e => {
            setFormData({ ...formData, name: e.target.value, nameError: '' });
          }}
        />
        {nameError && <p className={styles['error-message']}>{nameError}</p>}
      </label>
      <label>
        <span>Phone:</span>
        <input
          className={styles.input}
          type="tel"
          name="number"
          required
          value={number}
          onChange={e => {
            setFormData({
              ...formData,
              number: e.target.value,
              numberError: '',
            });
          }}
        />
        {numberError && (
          <p className={styles['error-message']}>{numberError}</p>
        )}
      </label>
      <button className={styles.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
