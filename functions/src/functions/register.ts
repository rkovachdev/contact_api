import { createUser } from "../helpers";
import { https } from "../settings/global";

exports.createUser = https.onRequest(async(req, res) => {
    if(req.method == 'POST'){
        const {firstName, lastName, email, phone, password} = req.body;
        if(!firstName || !lastName || !email || !phone || !password){
          res.status(500).json({status: 'failed', data: null, message: 'firstName, lastName, email, password and phone are required'});
        }else{
            const id = await createUser(email, password, firstName, lastName, phone);
            if(id == undefined){
                res.status(500).json({status: 'failed', data: {id: id}, message: 'Cannot create User'});
            }else{
                res.status(201).json({status: 'success', data: {id: id}, message: 'User created successfully'});
        }        
        }
      }else{
        res.status(405).json({status: 'failed', data: null, message: 'Method not allowed'});
      }
});