import { Contact } from "../models";
import { db } from "../settings/global";

export class ContactDao {
    constructor() { }
    static async addContact(contact: Contact): Promise<Contact | undefined> {
        try {
            await db.collection('contacts').add(contact);
            return contact;
        } catch (error) {
            return undefined;
        }
    }

    static async getAllContact(): Promise<Contact[] | undefined> {
        try {
            let contacts: Contact[] = [];
            const allContacts = (await db.collection('contacts').get()).docs;
            allContacts.forEach(contact => {
                let singleContact: Contact = {
                    firstName: contact.data()['firstName'],
                    lastName: contact.data()['lastName'],
                    email: contact.data()['email'],
                    phone: contact.data()['phone'],
                    fullName: contact.data()['fullName'],
                    uid: contact.data()['uid']
                }
                contacts.push(singleContact);
            });
            return contacts;
        } catch (error) {
            return undefined;
        }
    }

    static async getAllUserContact(id: string): Promise<Contact[] | undefined> {
        try {
            let contacts: Contact[] = [];
            const allContacts = (await db.collection('contacts').where('uid', "==", id).get()).docs;
            allContacts.forEach(contact => {
                let singleContact: Contact = {
                    firstName: contact.data()['firstName'],
                    lastName: contact.data()['lastName'],
                    email: contact.data()['email'],
                    phone: contact.data()['phone'],
                    fullName: contact.data()['fullName'],
                    uid: contact.data()['uid']
                }
                contacts.push(singleContact);
            });
            return contacts;
        } catch (error) {
            return undefined;
        }
    }

    static async getOneContact(id: string): Promise<Contact | undefined> {
        try {
            const singleContact = await db.collection('contacts').doc(id).get();
            let contact: Contact = {
                firstName: singleContact.data()!['firstName'],
                lastName: singleContact.data()!['lastName'],
                email: singleContact.data()!['email'],
                phone: singleContact.data()!['phone'],
                fullName: singleContact.data()!['fullName'],
                uid:  singleContact.data()!['uid']
            }
            return contact;
        } catch (error) {
            return undefined;
        }
    }

    static async deleteContact(id: string): Promise<Contact | undefined> {
        try {
            const singleContact = await db.collection('contacts').doc(id).get();
            let contact: Contact = {
                firstName: singleContact.data()!['firstName'],
                lastName: singleContact.data()!['lastName'],
                email: singleContact.data()!['email'],
                phone: singleContact.data()!['phone'],
                fullName: singleContact.data()!['fullName'],
                uid:  singleContact.data()!['uid'],
            }
            await db.collection('contacts').doc(id).delete();
            return contact;
        } catch (error) {
            return undefined;
        }
    }
}