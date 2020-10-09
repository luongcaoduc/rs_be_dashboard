const XLSX = require('xlsx');
const Report = require('../models/report');

module.exports = {
  async getAllGame(req, res) {
    try {
      const game = await Report.find().select('Game').distinct('Game');

      res.status(200).send(game);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  async importData(req, res) {
    try {
      const workbook = XLSX.readFile('report2.xlsx', { cellDates: true });
      // eslint-disable-next-line camelcase
      const sheet_name_list = workbook.SheetNames;
      let reports = [];
      sheet_name_list.forEach(async (y) => {
        const worksheet = workbook.Sheets[y];
        const headers = {};
        const data = [];
        // eslint-disable-next-line no-restricted-syntax
        // eslint-disable-next-line guard-for-in
        // eslint-disable-next-line no-restricted-syntax
        for (const z in worksheet) {
          // eslint-disable-next-line no-continue
          if (z[0] === '!') continue;
          // parse out the column, row, and value
          let tt = 0;
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < z.length; i++) {
            // eslint-disable-next-line no-restricted-globals
            if (!isNaN(z[i])) {
              z[i] = 0;
              tt = i;
              break;
            }
          }
          const col = z.substring(0, tt);
          // eslint-disable-next-line radix
          const row = parseInt(z.substring(tt));
          const value = worksheet[z].v || 0;

          // store header names
          // eslint-disable-next-line eqeqeq
          if (row == 1 && value) {
            headers[col] = value;
            // eslint-disable-next-line no-continue
            continue;
          }

          if (!data[row]) data[row] = {};
          data[row][headers[col]] = value;
        }
        // drop those first two rows which are empty
        data.shift();
        data.shift();
        // data = data.forEach((r, i) => {
        //   if (i === 6701) {
        //     console.log(r);
        //   }
        //   console.log(i);
        // });
        reports = data;
      });
      // eslint-disable-next-line no-restricted-globals

      // eslint-disable-next-line array-callback-return
      reports.map((r) => {
        // eslint-disable-next-line no-param-reassign
        r.Date = new Date(r.Date).getTime() + 86400000;
      });
      // eslint-disable-next-line no-restricted-globals
      reports = reports.filter((r) => !isNaN(r.Date));
      // console.log(reports[6702]);
      // eslint-disable-next-line no-plusplus
      // for (let i = 0; i < reports.length; i++) {
      //   // eslint-disable-next-line no-await-in-loop
      //   await Report.create(reports[i]);
      // }
      await Report.insertMany(reports);
      console.log(reports);
      res.status(200).send(reports);
    } catch (error) {
      console.log(error);
    }
  },
};
