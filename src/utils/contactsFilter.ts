import * as Contacts from 'expo-contacts';
import {CountryCode, parsePhoneNumberFromString} from 'libphonenumber-js';
import {SearchUser} from "../types";

export const getUnregisteredContacts = (
  contactsRaw: Contacts.Contact[],
  registeredUsers: SearchUser[],
  fallbackRegion: CountryCode
): Contacts.Contact[] => {
  if (!registeredUsers || registeredUsers.length === 0) return contactsRaw;

  const registeredPhonesSet = new Set(registeredUsers.map((u) => u.phone));

  return contactsRaw.filter(contact => {
    if (!contact.phoneNumbers || contact.phoneNumbers.length === 0) return false;

    const isRegistered = contact.phoneNumbers.some((ph) => {
      const region = ph.countryCode ? ph.countryCode.toUpperCase() : fallbackRegion;
      const numberToParse = ph.digits || ph.number || '';

      const parsed = parsePhoneNumberFromString(numberToParse, region as CountryCode);
      console.log(parsed)

      return parsed && parsed.isValid() && registeredPhonesSet.has(parsed.format('E.164'));
    });

    return !isRegistered;
  });
};