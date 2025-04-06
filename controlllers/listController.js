const db = require('../config/db');

exports.addTask = (req, res) =>{

    const {task} = req.body;

    if(!task){
        return res.status(400).json({error:'Task is req'});
    }

    const query = 'INSERT INTO listentries (Entry) VALUES (?)';

    db.query(query, [task], (err, result)=>{
        if(err){
            console.error('Error inserting task: ',err);
            return res.status(500).json({error:'DB error'});
        }
        res.status(201).json({msg:'Task updated', id: result.insertId});
        console.log(result.insertId);
    })

}