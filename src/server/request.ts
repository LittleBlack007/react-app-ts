import Qs from 'qs';
const TIME_OUT = 6000; // 超时时间
const TOKEN = 'token'; // 自定义token
export enum ContentType { // ContentType 映射表
  json = 'application/json;charset=UTF-8', // json数据格式
  form = 'application/x-www-form-urlencoded; charset=UTF-8', // 表单数据格式
  download = 'application/octet-stream' // 二进制文件流格式，用于download
}

// 请求方法
export enum HttpMethod {
  get = 'GET',
  post = 'POST',
  post_form = 'POST_FORM',
  put = 'PUT',
  patch = 'PATCH',
  delete = 'DELETE'
}

// 请求头
interface IHeader {
  Accept?: string;
  'Content-Type': string;
  [propName: string]: any;
}

// 请求参数
interface IReqConfig {
  mode?: RequestMode;
  credentials?: RequestCredentials;
  headers?: IHeader;
  [propName: string]: any;
}

// 请求前缀
export const baseUrl = '/api'

/**
 * @name 基础fetch
 * @param {string} url 请求path
 * @param {Object} options feich请求配置
 * @returns 
 */
export async function request(url: string, method?: string, data?:any, config?: IReqConfig){
  let promise: Response;
  let contentType: string;
  if(config && config.headers && config.headers['Content-Type'] !== undefined){
    contentType = config.headers['Content-Type'];
  }else if(method === HttpMethod.post_form){
    contentType = ContentType.form;
  }else {
    contentType = ContentType.json;
  }
  let reqUrl = url.replace('//', '/');

  const headers: Headers = new Headers({
    // 实例配置没传token过来的话，直接是哟红保存在sessionStorage的token
    // 这里假设后端直接读头文件的token字段
    //token: sessionStorage.token,
    'Content-Type': contentType
  })

  if(!method || method === HttpMethod.get){
    if(data){
      reqUrl += '?' + Qs.stringify(data);
    }
    promise = await fetch(reqUrl, {
      ...config
    })
  }else if(method === HttpMethod.post){
    promise = await fetch(reqUrl, {
      body: data,
      method: HttpMethod.post,
      ...config
    })
  }else if(method === HttpMethod.post_form){
    promise = await fetch(reqUrl, {
      body: Qs.stringify(data),
      method: HttpMethod.post,
      ...config
    })
  }else{
    promise = await fetch(reqUrl, {
      body: JSON.stringify(data),
      method: method,
      ...config
    })
  }
  return handleRes(promise)
}

async function handleRes(res: Response){
  let parseRes;
  const contentType = res.headers.get('Content-Type') || '';
  if(contentType.indexOf('json') > -1){
    parseRes = await res.json()
  }else if(contentType.indexOf('form') > -1){
    parseRes = await res.formData();
  }else{
    parseRes = await res.text();
  }
  if(!res.ok){
   throw parseRes; 
  }
  return parseRes;
}