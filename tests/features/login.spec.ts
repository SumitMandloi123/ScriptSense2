// import { test, expect } from "@playwright/test";
// import { decode, JwtPayload } from "jsonwebtoken";

// import * as fs from "fs";

// const config = JSON.parse(
//   fs.readFileSync("/Users/usl-sz-1892/Neblar/frontend/qa1/playwright/creds.json", "utf8")
// );
// const username = config.AZB2C_USERNAME;
// const password = config.AZB2C_PASSWORD;
// const clientId = config.CYPRESS_AZB2C_CLIENT_ID;
// const userflow = config.CYPRESS_AZB2C_AUTHFLOW;
// const authority = config.CYPRESS_AZB2C_AUTHORITY;
// const apiScope = config.CYPRESS_AZB2C_SCOPE;
// // const storage = globalThis.sessionStorage;
// const apiUrl = `${config.CYPRESS_WEB_API_URL}/graphql`;
// test.only("Login Test", async ({ page, context }) => {
//   await page.goto("https://stg.scriptsense.co.nz/");
//   // await page.pause()
//   // await login(page);
//   // console.log(apiUrl);
//   const formData = new URLSearchParams();
//   formData.append("grant_type", "password");
//   formData.append("client_id", clientId);
//   formData.append("username", username);
//   formData.append("password", password);
//   formData.append("scope", `${apiScope} openid profile offline_access`);
//   // console.log(formData)
//   console.log(`${authority}/oauth2/v2.0/token`)
//   const response = await page.request.post(`${authority}/oauth2/v2.0/token`, {
//     data: formData.toString(),
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//   });

//   const responseBody = await response.json();
//   console.log("responseBody: ", responseBody);
//   // If status is not 200, we can log more details
//   if (response.status() !== 200) {
//     console.error(
//       "Error: ",
//       responseBody.error_description || responseBody.error
//     );
//   }
//   expect(response.status()).toBe(200); // Assert successful login

//   const { access_token, refresh_token, expires_in } = await response.json();

//   const idTokenClaims = decode(access_token) as JwtPayload;
//   const localAccountId = idTokenClaims.sub!!;
//   const [, b2cDomain, tenantId] = idTokenClaims.iss!!.match(
//     new RegExp("https://(.*)/(.*)/v2.0/")
//   )!!;
//   const environment = b2cDomain;
//   const realm = tenantId;
//   const homeAccountId = `${localAccountId}-${userflow}.${realm}`;
//   const accessTokenKey = `${homeAccountId}-${environment}-`;
//   const accessTokenEntity = {
//     authorityType: "MSSTS",
//     clientInfo: "",
//     homeAccountId,
//     environment,
//     realm: "",
//     idTokenClaims,
//     localAccountId,
//     username,
//   };
//   const cachedAt = Math.floor(Date.now() / 1000);
//   const expiresOn = cachedAt + parseFloat(expires_in);
//   const apiTokenKey = `${homeAccountId}-${environment}-accesstoken-${clientId}--${apiScope}--`;
//   const apiTokenEntity = {
//     cachedAt: cachedAt.toString(),
//     clientId,
//     credentialType: "AccessToken",
//     environment,
//     expiresOn: expiresOn.toString(),
//     extendedExpiresOn: expiresOn.toString(),
//     homeAccountId,
//     realm: "",
//     secret: access_token,
//     target: apiScope,
//     tokenType: "Bearer",
//   };
//   const refreshTokenKey = `${homeAccountId}-${environment}-refreshtoken-${clientId}----`;
//   const refreshTokenEntity = {
//     clientId,
//     credentialType: "RefreshToken",
//     environment,
//     homeAccountId,
//     secret: refresh_token,
//   };


//   await page.evaluate(
//     ({
//       apiTokenKey,
//       apiTokenEntity,
//       accessTokenKey,
//       accessTokenEntity,
//       refreshTokenKey,
//       refreshTokenEntity,
//       clientId,
//       localAccountId,
//     }) => {
//       window.localStorage.setItem(apiTokenKey, JSON.stringify(apiTokenEntity));
//       window.localStorage.setItem(accessTokenKey, JSON.stringify(accessTokenEntity));
//       window.localStorage.setItem(refreshTokenKey, JSON.stringify(refreshTokenEntity));
//       window.localStorage.setItem(
//         `msal.token.keys.${clientId}`,
//         JSON.stringify({
//           idToken: [],
//           accessToken: [apiTokenKey],
//           refreshToken: [refreshTokenKey],
//         })
//       );
//       window.localStorage.setItem(
//         "msal.account.keys",
//         JSON.stringify([accessTokenKey])
//       );
//       window.localStorage.setItem(`msal.${clientId}.active-account`, localAccountId);
//     },
//     {
//       apiTokenKey,
//       apiTokenEntity,
//       accessTokenKey,
//       accessTokenEntity,
//       refreshTokenKey,
//       refreshTokenEntity,
//       clientId,
//       localAccountId,
//     }
//   );

//   console.log(apiUrl);
//   // await page.route(apiUrl, async (route) => {
//   //   await route.fulfill({
//   //     status: 200,
//   //     contentType: "application/json",
//   //   });
//   // });
// await context.storageState({ path: "state.json" });
// // await page.context().storageState({
// //   path: 'state.json',
// // })
// //   // await page.reload()
// //   await page.goto("https://stg.scriptsense.co.nz/prescription/inbox");
// //   console.log("Session state saved.");
// await page.pause();

//   await page.locator("//input[@name='Email Address']").fill("hello")
// });
