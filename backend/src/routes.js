const { Router } = require('express');
const multer = require('multer');

// Config
const uploadConfig = require('./config/upload');

// Controllers
const SessionCtrl = require('./controllers/SessionCtrl');
const SpotCtrl = require('./controllers/SpotCtrl');
const DashboardCtrl = require('./controllers/DashboardCtrl');
const BookingCtrl = require('./controllers/BookingCtrl');
const ApprovalCtrl = require('./controllers/ApprovalCtrl');
const RejectionCtrl = require('./controllers/RejectionCtrl');

const routes = Router();
const upload = multer( uploadConfig );

// All Routes
routes.post( '/sessions', SessionCtrl.store );

// Dashboard
routes.get( '/dashboard', DashboardCtrl.show );

// Spot
routes.get( '/spots', SpotCtrl.index );
routes.post( '/spots', upload.single('thumbnail'), SpotCtrl.store );

// Booking
routes.post( '/spots/:spot_id/bookings', BookingCtrl.store );

routes.post( '/bookings/:booking_id/approvals', ApprovalCtrl.store );
routes.post( '/bookings/:booking_id/rejections', RejectionCtrl.store );

// End Routes

module.exports = routes;