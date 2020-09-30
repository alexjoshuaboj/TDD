

import connection from './db';

class DeleteController {
  // Get all students
  static getDelete(req, res) {
    res.render('delete', { name: 'ToDos', id: req.query.id });
  }

  static postDelete(req, res) {
    const subject = req.body.subject;
    const description = req.body.description;
    if (req.query.id) {
      console.log('LLEGA', req.query.id);
      connection.query('DELETE FROM todos WHERE id = ?', [req.query.id], function(error, results, fields) {
        console.log('Eliminado ToDo:', results);
        res.redirect('/');
      });
    } else {
      res.render('delete', { name: 'ToDos', id: req.query.id });
    }
  }
}
export default DeleteController;


