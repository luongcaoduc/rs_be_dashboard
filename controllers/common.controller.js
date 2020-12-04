/* eslint-disable operator-assignment */
// const XLSX = require('xlsx');
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const exceljs = require('exceljs');
const day = require('dayjs');
const axios = require('axios');
const Report = require('../models/report');

const workbookExjs = new exceljs.Workbook();
function isValidDate(d) {
  // eslint-disable-next-line no-restricted-globals
  return d instanceof Date && !isNaN(d);
}

module.exports = {
  async getAllGame(req, res) {
    try {
      const findObject = {};
      if (req.user.role !== 'admin') {
        const findConditions = [];
        req.user.permissions.forEach((r) => {
          findConditions.push({ Game: r });
        });
        Object.assign(findObject, {
          $or: findConditions,
        });
      }

      const game = await Report.find(findObject).select('Game').distinct('Game');

      res.status(200).send(game);
    } catch (error) {
      res.status(404).send(error);
    }
  },
  // async importData(req, res) {
  //   try {
  //     const workbook = XLSX.readFile('report2.xlsx', { cellDates: true });
  //     // eslint-disable-next-line camelcase
  //     const sheet_name_list = workbook.SheetNames;
  //     let reports = [];
  //     sheet_name_list.forEach(async (y) => {
  //       const worksheet = workbook.Sheets[y];
  //       const headers = {};
  //       const data = [];
  //       // eslint-disable-next-line no-restricted-syntax
  //       // eslint-disable-next-line guard-for-in
  //       // eslint-disable-next-line no-restricted-syntax
  //       for (const z in worksheet) {
  //         // eslint-disable-next-line no-continue
  //         if (z[0] === '!') continue;
  //         // parse out the column, row, and value
  //         let tt = 0;
  //         // eslint-disable-next-line no-plusplus
  //         for (let i = 0; i < z.length; i++) {
  //           // eslint-disable-next-line no-restricted-globals
  //           if (!isNaN(z[i])) {
  //             z[i] = 0;
  //             tt = i;
  //             break;
  //           }
  //         }
  //         const col = z.substring(0, tt);
  //         // eslint-disable-next-line radix
  //         const row = parseInt(z.substring(tt));
  //         const value = worksheet[z].v || 0;

  //         // store header names
  //         // eslint-disable-next-line eqeqeq
  //         if (row == 1 && value) {
  //           headers[col] = value;
  //           // eslint-disable-next-line no-continue
  //           continue;
  //         }

  //         if (!data[row]) data[row] = {};
  //         data[row][headers[col]] = value;
  //       }
  //       // drop those first two rows which are empty
  //       data.shift();
  //       data.shift();
  //       // data = data.forEach((r, i) => {
  //       //   if (i === 6701) {
  //       //     console.log(r);
  //       //   }
  //       //   console.log(i);
  //       // });
  //       reports = data;
  //     });
  //     // eslint-disable-next-line no-restricted-globals

  //     // eslint-disable-next-line array-callback-return
  //     reports.map((r) => {
  //       // eslint-disable-next-line no-param-reassign
  //       r.Date = new Date(r.Date).getTime() + 86400000;
  //     });
  //     // eslint-disable-next-line no-restricted-globals
  //     reports = reports.filter((r) => !isNaN(r.Date));
  //     // console.log(reports[6702]);
  //     // eslint-disable-next-line no-plusplus
  //     // for (let i = 0; i < reports.length; i++) {
  //     //   // eslint-disable-next-line no-await-in-loop
  //     //   await Report.create(reports[i]);
  //     // }
  //     await Report.insertMany(reports);
  //     console.log(reports);
  //     res.status(200).send(reports);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  async importData2(req, res) {
    try {
      const data = excelToJson({
        sourceFile: 'uploads/datafile.xlsx',
        header: {
          rows: 2,
        },
        columnToKey: {
          A: 'Game',
          B: 'Date',
          C: 'Device',
          D: 'cost1',
          E: 'cost2',
          F: 'cost3',
          G: 'cost4',
          H: 'cost5',
          I: 'cost6',
          J: 'cost7',
          K: 'cost25',
          L: 'cost8',
          M: 'cost9',
          N: 'cost10',
          O: 'cost11',
          P: 'cost12',
          Q: 'cost13',
          R: 'rev1',
          S: 'rev13',
          T: 'rev2',
          U: 'rev14',
          V: 'rev3',
          W: 'rev15',
          X: 'rev4',
          Y: 'rev16',
          Z: 'rev5',
          AA: 'rev17',
          AB: 'rev6',
          AC: 'rev18',
          AD: 'rev7',
          AE: 'rev19',
          AF: 'rev25',
          AG: 'rev26',
        },
      });
      if (data['Game ROAS'][0].rev26) {
        return res.status(409).send();
      }
      data['Game ROAS'] = data['Game ROAS'].filter((r) => isValidDate(r.Date));
      data['Game ROAS'].forEach((r) => {
        Object.keys(r).slice(2, Object.keys(r).length).forEach((item) => {
          // eslint-disable-next-line no-restricted-globals
          if (!isNaN(r[item]) && r[item]) {
            // eslint-disable-next-line no-param-reassign
            r[item] = Math.round((r[item] / 23000) * 100000) / 100000;
          }
        });
      });
      await Report.insertMany(data['Game ROAS']);
      fs.unlinkSync('uploads/datafile.xlsx');
      return res.status(200).send();
    } catch (error) {
      return res.status(404).send(error);
    }
  },
  async  importData(req, res) {
    try {
      const data = excelToJson({
        sourceFile: 'uploads/datafile.xlsx',
        header: {
          rows: 2,
        },
        columnToKey: {
          A: 'Game',
          B: 'Date',
          C: 'Device',
          D: 'cost1',
          E: 'cost2',
          F: 'cost3',
          G: 'cost4',
          H: 'cost5',
          I: 'cost6',
          J: 'cost7',
          K: 'cost8',
          L: 'cost9',
          M: 'cost10',
          N: 'cost11',
          O: 'cost12',
          P: 'cost13',
          Q: 'cost14',
          R: 'cost15',
          S: 'cost16',
          T: 'cost17',
          U: 'cost18',
          V: 'cost19',
          W: 'cost20',
          X: 'cost21',
          Y: 'cost22',
          Z: 'cost23',
          AA: 'cost24',
          AB: 'cost25',
          AC: 'rev1',
          AD: 'rev2',
          AE: 'rev3',
          AF: 'rev4',
          AG: 'rev5',
          AH: 'rev6',
          AI: 'rev7',
          AJ: 'rev8',
          AK: 'rev9',
          AL: 'rev10',
          AM: 'rev11',
          AN: 'rev12',
          AO: 'rev13',
          AP: 'rev14',
          AQ: 'rev15',
          AR: 'rev16',
          AS: 'rev17',
          AT: 'rev18',
          AU: 'rev19',
          AV: 'rev20',
          AW: 'rev21',
          AX: 'rev22',
          AY: 'rev23',
          AZ: 'rev24',
          BA: 'rev25',
        },
      });
      data['Game ROAS'] = data['Game ROAS'].filter((r) => isValidDate(r.Date) && !Object.values(r).includes('#REF!'));
      await Report.insertMany(data['Game ROAS']);
      fs.unlinkSync('uploads/datafile.xlsx');
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  },
  async exportData(req, res) {
    try {
      // const data = await Report.find().sort({ Date: 1 });
      // console.log(req.body);
      const { data } = req.body;
      // console.log(data);
      fs.copyFileSync(`${__dirname}/excel_form.xlsx`, `${__dirname}/data.xlsx`);
      const result = await workbookExjs.xlsx.readFile(`${__dirname}/data.xlsx`);
      const worksheet = result.getWorksheet('Game ROAS');
      data.forEach((item) => {
        worksheet.addRow([
          item.Game,
          day(item.Date).format('MM/DD/YYYY'),
          item.cost1,
          item.cost2,
          item.cost3,
          item.cost4,
          item.cost5,
          item.cost6,
          item.cost7,
          item.cost8,
          item.cost9,
          item.cost10,
          item.cost11,
          item.cost12,
          item.cost13,
          item.cost14,
          item.cost15,
          item.cost16,
          item.cost17,
          item.cost18,
          item.cost19,
          item.cost20,
          item.cost21,
          item.cost22,
          item.cost23,
          item.cost24,
          item.rev1,
          item.rev2,
          item.rev3,
          item.rev4,
          item.rev5,
          item.rev6,
          item.rev7,
          item.rev8,
          item.rev9,
          item.rev10,
          item.rev11,
          item.rev12,
          item.rev13,
          item.rev14,
          item.rev15,
          item.rev16,
          item.rev17,
          item.rev18,
          item.rev19,
          item.rev20,
          item.rev21,
          item.rev22,
          item.rev23,
          item.rev24,
          item.rev25,
        ]);
      });
      await workbookExjs.xlsx.writeFile(`${__dirname}/data.xlsx`);
      res.status(200).sendFile(`${__dirname}/data.xlsx`);
    } catch (error) {
      console.log(error);
      res.status(404).send(error);
    }
  },
  async crawData(req, res) {
    try {
      await axios.default.get(`${process.env.CRAW_URL}/get-data`, {
        headers: {
          app_key: process.env.APP_KEY,
        },
        timeout: 20000,
      });
      res.status(200).send();
    } catch (error) {
      console.log(error);
      res.status(404).send();
    }
  },
};
