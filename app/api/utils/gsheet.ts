import { google } from "googleapis";
import { memoize } from "./memoize";

export const getAuthorizedHostsInner = async () => {
  console.log("preparing gsheet authentication");
  const auth = new google.auth.JWT(
    process.env.CLIENT_EMAIL,
    process.env.CLIENT_ID,
    process.env.PRIVATE_KEY,
    ["https://www.googleapis.com/auth/spreadsheets"]
  );

  try {
    await auth.authorize();

    console.log("gsheet authentication succeed");

    const sheets = google.sheets({
      auth,
      version: "v4",
    });

    const response = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId: process.env.HOSTS_SHEET,
      range: "hosts!A2:A",
    });

    console.log("gsheet response", response.data.values);

    const nonUniqueHosts = response.data.values?.map((vals) => vals[0]) || [];
    const hosts = new Set(nonUniqueHosts);
    console.log("gsheet unique hosts", hosts);
    return hosts;
  } catch (err) {
    console.error("gsheet unhandled error", err);
    return new Set([]);
  }
};

export const getAuthorizedHosts = memoize(
  getAuthorizedHostsInner,
  1000 * 60 * 5
);
