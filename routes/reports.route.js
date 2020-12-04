const router = require('express').Router();
const reportController = require('../controllers/report.controller');

// report
router.post('/', reportController.getReportByDate);
router.get('/get-all-report', reportController.getAllReport);
router.get('/get-report-week', reportController.getReportWeek);
router.post('/get-report-week-by-game', reportController.getReportWeekByGame);
router.get('/get-report-month', reportController.getReportMonth);
router.post('/get-report-month-by-game', reportController.getReportMonthByGame);
router.get('/get-report-quarter', reportController.getReportQuarter);
router.post('/get-report-quarter-by-game', reportController.getReportQuarterByGame);
router.get('/get-all-year', reportController.getAllYear);
router.post('/find-report-by-week', reportController.getReportByWeek);

module.exports = router;
