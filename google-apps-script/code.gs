/**
 * Ishanka & Bhagya — RSVP receiver
 *
 * Writes every RSVP from the wedding website into the "RSVP" tab of:
 * https://docs.google.com/spreadsheets/d/1kNJgVhyMlTtn5jHsnqIRolKF1qJn-OItq6Q7PINnBIw/edit
 *
 * Setup (see SETUP.md): paste this file into Extensions > Apps Script, run `setupSheet` once,
 * then Deploy > New deployment > Web app (Execute as: Me, Who has access: Anyone).
 */

const SPREADSHEET_ID = '1kNJgVhyMlTtn5jHsnqIRolKF1qJn-OItq6Q7PINnBIw';
const RSVP_SHEET_NAME = 'RSVP';

const RSVP_HEADERS = [
  'Timestamp',
  'Full Name',
  'Attendance',
  'Seats',
  'Message for the Couple',
  'Invited As',
  'Invitation Link',
];

/** Run once from the Apps Script editor: creates the RSVP tab with styled headers. */
function setupSheet() {
  const sheet = getRsvpSheet_();
  formatHeaders_(sheet);
  SpreadsheetApp.flush();
  Logger.log('RSVP sheet is ready: ' + sheet.getParent().getUrl());
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);

    const data = parsePayload_(e);
    const fullName = clean_(data.fullName, 120);
    if (!fullName) {
      return jsonResponse_({ ok: false, error: 'Full name is required.' });
    }

    const attending = String(data.attendance || '').toLowerCase() === 'yes';
    const seats = attending ? Math.max(1, Math.min(50, parseInt(data.guests, 10) || 1)) : 0;

    const sheet = getRsvpSheet_();
    sheet.appendRow([
      new Date(),
      fullName,
      attending ? 'Attending' : 'Not attending',
      seats,
      clean_(data.thoughts, 1000),
      clean_(data.invitedAs, 120),
      clean_(data.link, 500),
    ]);

    const row = sheet.getLastRow();
    sheet.getRange(row, 1).setNumberFormat('yyyy-mm-dd hh:mm');
    sheet.getRange(row, 3).setFontColor(attending ? '#2E7D32' : '#B5806F');

    return jsonResponse_({ ok: true });
  } catch (error) {
    return jsonResponse_({ ok: false, error: String(error && error.message ? error.message : error) });
  } finally {
    lock.releaseLock();
  }
}

/** Visiting the Web App URL in a browser confirms the deployment works. */
function doGet() {
  return jsonResponse_({ ok: true, message: 'Ishanka & Bhagya RSVP endpoint is running.' });
}

function getRsvpSheet_() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(RSVP_SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(RSVP_SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    formatHeaders_(sheet);
  }
  return sheet;
}

function formatHeaders_(sheet) {
  sheet.getRange(1, 1, 1, RSVP_HEADERS.length)
    .setValues([RSVP_HEADERS])
    .setFontWeight('bold')
    .setFontColor('#FFFBF3')
    .setBackground('#B5806F')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setFrozenRows(1);
  sheet.setRowHeight(1, 32);

  const widths = [150, 220, 130, 70, 360, 200, 320];
  widths.forEach(function (width, i) {
    sheet.setColumnWidth(i + 1, width);
  });
  sheet.getRange(2, 5, sheet.getMaxRows() - 1, 1).setWrap(true);
}

function parsePayload_(e) {
  const params = e && e.parameter ? e.parameter : {};
  if (Object.keys(params).length > 0) {
    return params;
  }
  const contents = e && e.postData && e.postData.contents ? e.postData.contents : '';
  try {
    return contents ? JSON.parse(contents) : {};
  } catch (_error) {
    return {};
  }
}

/** Trims, limits length, and stops values being read as spreadsheet formulas. */
function clean_(value, maxLength) {
  let text = String(value == null ? '' : value).trim().slice(0, maxLength);
  if (/^[=+\-@]/.test(text)) {
    text = "'" + text;
  }
  return text;
}

function jsonResponse_(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
