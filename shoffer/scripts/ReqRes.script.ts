import axios, { AxiosRequestHeaders, Method } from "axios";

export async function ReqRes(
  meth: Method,
  api: string,
  headers?: AxiosRequestHeaders,
  data?: any
): Promise<string> {
  const config = {
    method: meth,
    maxBodyLength: Infinity,
    url: api,
    headers,
    data,
  };

  try {
    const response = await axios.request(config);
    return JSON.stringify(response.data);
  } catch (error: any) {
    console.error("Request failed:", error.message);
    if(error.message.includes("ECONNREFUSED")){
        return "conection refused or service is down"
    }
    return JSON.stringify({ error: error.message });
  }
}
