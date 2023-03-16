import { ContactDao } from "../db/contactDao";
import { https } from "../settings/global";

export const deleteContact = https.onRequest( async (req, res) => {
    if(req.method == 'DELETE'){
        const id = req.query.id;
        if(id){
            const contact = await ContactDao.deleteContact(id.toString());
            if(contact == undefined){
                res.status(500).json({status: 'failed', data: null, message: 'Cannot delete contact'});
            }else{
                res.status(200).json({status: 'sucess', data: contact, message: 'Contact deleted successfully'});
            }
        }else{
            res.status(500).json({status: 'failed', data: null, message: 'id is required'});
        }
    }else{
      res.status(405).json({status: 'failed', data: null, message: 'Method not allowed'});
    }
});