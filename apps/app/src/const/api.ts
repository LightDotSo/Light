import { ApiLinks } from "@lightdotso/const";

import { isProduction } from "@lightdotso/app/utils/isProduction";

// export const LIGHT_API_URL = isProduction ? ApiLinks.API : ApiLinks.API_STAGING;
// TODO: change to production url
export const LIGHT_API_URL = isProduction
  ? ApiLinks.API
  : "https://api-mi990595y-lightdotso.vercel.app";
