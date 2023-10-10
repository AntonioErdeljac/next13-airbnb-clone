import { google } from "googleapis";

export const getAuthorizedHosts = async () => {
  const auth = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    process.env.CLIENT_ID,
    process.env.PRIVATE_KEY,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  try {
    await auth.authorize();
    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: process.env.HOSTS_SHEET,
      range: "hosts!A2:A",
    });
    const nonUniqueHosts = response.data.values?.map((vals) => vals[0]) || [];
    const hosts = new Set(nonUniqueHosts);
    return hosts;
  } catch (err) {
    return new Set([]);
  }
};
