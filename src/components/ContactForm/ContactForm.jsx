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
    phone: '',
    nameError: '',
    phoneError: '',
  });

  const { name, phone, nameError, phoneError } = formData;

  const handleSubmit = e => {
    e.preventDefault();

    const phoneRegExp = /^\+?[0-9\s()-]{7,}$/;

    if (!phoneRegExp.test(phone)) {
      setFormData({
        ...formData,
        phoneError: 'Insert correct number',
      });
      return;
    }

    const existingContactWithNumber = contacts.find(
      contact => contact.phone === phone
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
      phone: phone,
    };

    dispatch(contactsActions.addContactAsync(newContact));
    setFormData({
      name: '',
      phone: '',
      nameError: '',
      phoneError: '',
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
          name="phone"
          required
          value={phone}
          onChange={e => {
            setFormData({
              ...formData,
              phone: e.target.value,
              phoneError: '',
            });
          }}
        />
        {phoneError && <p className={styles['error-message']}>{phoneError}</p>}
      </label>
      <button className={styles.button} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
