import axios, { Method } from "axios";
import * as crypto from "crypto";

interface ReqTuyaOpt {
  path: string;
  method: Method | string;
  body?: Record<string, any>;
  headers?: Record<string, string>;
  query?: Record<string, any>;
}

const config = {
  baseUrl: "https://openapi-cn.wgine.com",
  accessKey: "y8gectnwwquvek3gwd85",
  secretKey: "1500bb6d62914162affb79ed2480fefd",
};

let accessToken = "";

const toJsonObj = (
  params: Record<string, string>,
  arr: string[],
  map: Record<string, string>
) => {
  Object.keys(params).forEach((key) => {
    arr.push(key);
    map[key] = params[key];
  });
};

const stringToSignMap = ({
  query,
  mode,
  method,
  body,
  headers,
  url,
}: {
  query: Record<string, string>;
  mode: string;
  method: Method | string;
  body: Record<string, any>;
  headers: Record<string, string>;
  url: string;
}): {
  signUrl: string;
  url: string;
  bodyStr: string;
} => {
  let params = "";
  let headersStr = "";
  const map: Record<string, string> = {};
  let arr: string[] = [];
  let bodyStr = "";
  if (query) {
    toJsonObj(query, arr, map);
  }
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method) && body) {
    if (mode != "formdata" && mode != "urlencoded") {
      bodyStr = JSON.stringify(body);
    }
  }
  const bodySha = crypto.createHash("sha256").update(bodyStr).digest("hex");
  arr = arr.sort();
  arr.forEach(function (item) {
    params += item + "=" + map[item] + "&";
  });
  if (params.length > 0) {
    params = params.substring(0, params.length - 1);
    url = url + "?" + params;
  }

  if (headers["Signature-Headers"]) {
    const signHeaderStr = headers["Signature-Headers"];
    const signHeaderKeys = signHeaderStr.split(":");
    signHeaderKeys.forEach(function (item) {
      let val = "";
      if (headers[item]) {
        val = headers[item];
      }
      headersStr += item + ":" + val + "\n";
    });
  }

  return {
    url,
    signUrl: method + "\n" + bodySha + "\n" + headersStr + "\n" + url,
    bodyStr,
  };
};

async function encryptStr(str: string, secret: string): Promise<string> {
  return crypto
    .createHmac("sha256", secret)
    .update(str, "utf8")
    .digest("hex")
    .toUpperCase();
}

export const reqSign = async ({
  path,
  method,
  body = {},
  query = {},
}: ReqTuyaOpt) => {
  const timestamp = new Date().getTime();
  const clientId = config.accessKey;
  const secret = config.secretKey;
  const httpMethod = method.toUpperCase();
  const mode = "json";
  const headers = {};

  const signMap = stringToSignMap({
    query,
    mode,
    method: httpMethod,
    body,
    headers,
    url: decodeURI(path),
  });

  const signStr = signMap.signUrl;
  const nonce = "";
  let sign = "";
  const headerExt: Record<string, string> = {
    accept: "application/json",
    lang: "zh",
  };

  if (signMap.bodyStr) {
    Object.assign(headerExt, {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(signMap.bodyStr).toString(),
    });
  }
  if (accessToken) {
    headerExt["access_token"] = accessToken;
  }

  const str = clientId + accessToken + timestamp + nonce + signStr;

  sign = await encryptStr(str, secret);

  return {
    url: `${config.baseUrl}${signMap.url}`,
    bodyString: signMap.bodyStr,
    signStr,
    headers: {
      t: timestamp,
      client_id: clientId,
      sign,
      sign_method: "HMAC-SHA256",
      ...headerExt,
    },
  };
};

export const getToken = async () => {
  const method = "GET";
  const timestamp = Date.now().toString();
  const signUrl = "/v1.0/token?grant_type=1";
  const contentHash = crypto.createHash("sha256").update("").digest("hex");
  const stringToSign = [method, contentHash, "", signUrl].join("\n");
  const signStr = config.accessKey + timestamp + stringToSign;

  const headers = {
    t: timestamp,
    sign_method: "HMAC-SHA256",
    client_id: config.accessKey,
    sign: await crypto
      .createHmac("sha256", config.secretKey)
      .update(signStr, "utf8")
      .digest("hex")
      .toUpperCase(),
  };
  const { data: login } = await axios.get(`${config.baseUrl}/${signUrl}`, {
    headers,
  });
  console.log("token", login);
  accessToken = login.result.access_token;

  if (!login || !login.success) {
    throw Error(`fetch failed: ${login.msg}`);
  }
};
