const routes = require('next-routes')();

routes
    .add('/category/doctor','/category/doctor')
    .add('/category/patients','/category/patients')
    .add('/category/:address','/category/detail')
    .add('/category/:address/doctordetail','/category/doctordetail')
    .add('/category/:address/meetings','/category/meetings')
    .add('/category/:address/addform/addmeeting','/category/addform/addmeeting')

module.exports = routes;