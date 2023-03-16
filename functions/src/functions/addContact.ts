import { ContactDao } from "../db/contactDao";
import { Contact } from "../models";
import { https, logError, logSuccess } from "../settings/global";

exports.createContact = https.onRequest(async (req, res) => {
  if (req.method == 'POST') {
    const uid = req.headers['id'];
    if (uid) {
      const { firstName, lastName, email, phone } = req.body;
      if (!firstName || !lastName || !email || !phone) {
        res.status(500).json({ status: 'failed', data: null, message: 'firstName, lastName, email and phone are required' });
        logError({ status: 'failed', data: null, message: 'firstName, lastName, email and phone are required' });
      } else {
        const conntact: Contact = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          phone: phone,
          fullName: `${firstName} ${lastName}`,
          uid: uid.toString()
        }
        const addedContact = await ContactDao.addContact(conntact);
        if (addedContact == undefined) {
          res.status(500).json({ status: 'failed', data: null, message: 'Cannot save contact' });
        } else {
          res.status(201).json({ status: 'sucess', data: addedContact, message: 'Contact added successfully' });
          logSuccess({ status: 'sucess', data: addedContact, message: 'Contact added successfully' })
        }
      }
    } else {
      res.status(500).json({ status: 'failed', data: null, message: 'uid is required' });
      logError({ status: 'failed', data: null, message: "uid is required" })
    }
  } else {
    res.status(405).json({ status: 'failed', data: null, message: 'Method not allowed' });
    logError({ status: 'failed', data: null, message: "Method not allowed" })
  }
});