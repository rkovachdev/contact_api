import { ContactDao } from "../db/contactDao";
import { getCustomClaim } from "../helpers";
import { https, logError, logSuccess } from "../settings/global";

export const getContacts = https.onRequest(async (req, res) => {
  if (req.method == 'GET') {
    const uid = req.headers['id'];
    if (uid) {
      const claim = await getCustomClaim(uid.toString());
      if (claim == undefined || claim != 'admin') {
        res.status(401).json({ status: 'failed', data: null, message: 'You are not authorized to perform this operation' });
        logError({ status: 'failed', data: null, message: 'You are not authorized to perform this operation' })
      } else {
        const contacts = await ContactDao.getAllContact();
        if (contacts == undefined) {
          res.status(500).json({ status: 'failed', data: null, message: 'Cannot get all contacts' });
          logError({ status: 'failed', data: null, message: 'Cannot get all contacts' });
        } else {
          res.status(200).json({ status: 'sucess', data: contacts, message: 'All contacts fetched successfully' });
          logSuccess({ status: 'sucess', data: contacts, message: 'All contacts fetched successfully' })
        }
      }
    } else {
      res.status(500).json({ status: 'failed', data: null, message: 'uid is required' });
      logError({ status: 'failed', data: null, message: 'uid is required' })
    }
  } else {
    res.status(405).json({ status: 'failed', data: null, message: 'Method not allowed' });
    logError({ status: 'failed', data: null, message: 'Method not allowed' });
  }
});

export const getContact = https.onRequest(async (req, res) => {
  if (req.method == 'GET') {
    const id = req.query.id;
    if (id) {
      const contact = await ContactDao.getOneContact(id.toString());
      if (contact == undefined) {
        res.status(500).json({ status: 'failed', data: null, message: 'Cannot get single contact' });
      } else {
        res.status(200).json({ status: 'sucess', data: contact, message: 'Contact fetched successfully' });
      }
    } else {
      res.status(500).json({ status: 'failed', data: null, message: 'id is required' });
    }
  } else {
    res.status(405).json({ status: 'failed', data: null, message: 'Method not allowed' });
  }
});

export const getUserContacts = https.onRequest(async (req, res) => {
  if (req.method == 'GET') {
    const uid = req.headers['id'];
    if (uid) {
      const claim = await getCustomClaim(uid.toString());
      if (claim == undefined) {
        res.status(401).json({ status: 'failed', data: null, message: 'You are not authorized to perform this operation' });
        logError({ status: 'failed', data: null, message: 'You are not authorized to perform this operation' });
      } else {
        const contacts = await ContactDao.getAllUserContact(uid.toString());
        if (contacts == undefined) {
          res.status(500).json({ status: 'failed', data: null, message: 'Cannot get all contacts' });
          logError({ status: 'failed', data: null, message: 'Cannot get all contacts' })
        } else {
          res.status(200).json({ status: 'sucess', data: contacts, message: 'All contacts fetched successfully' });
          logSuccess({ status: 'sucess', data: contacts, message: 'All contacts fetched successfully' });
        }
      }
    } else {
      res.status(500).json({ status: 'failed', data: null, message: 'uid is required' });
      logError({ status: 'failed', data: null, message: 'uid is required' });
    }
  } else {
    res.status(405).json({ status: 'failed', data: null, message: 'Method not allowed' });
    logError({ status: 'failed', data: null, message: 'Method not allowed' });
  }
});

