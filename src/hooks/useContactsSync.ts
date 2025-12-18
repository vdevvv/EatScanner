import {useState, useEffect} from 'react';
import * as Contacts from 'expo-contacts';
import {Alert} from 'react-native';

export const useContactsSync = () => {
  const [contactsRaw, setContactsRaw] = useState<Contacts.Contact[]>([]);
  const [isLoadingContacts, setIsLoadingContacts] = useState(true);

  useEffect(() => {
    void loadContacts();
  }, []);

  const loadContacts = async () => {
    try {
      const {status} = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const {data} = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name],
        });

        if (data.length > 0) {
          setContactsRaw(data);
        }
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Error', 'Failed to load contacts');
    } finally {
      setIsLoadingContacts(false);
    }
  };

  return {contactsRaw, isLoadingContacts};
};