import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { contactsActions } from '../../redux/contactsSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter);

  return (
    <input
      type="text"
      value={filter}
      onChange={e => dispatch(contactsActions.setFilter(e.target.value))}
      placeholder="Search contacts..."
    />
  );
};

export default Filter;
