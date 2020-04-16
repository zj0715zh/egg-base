/* eslint valid-jsdoc: "off" */

'use strict';

/**!
 * name - egg-base
 *
 * date - 2020/04/16
 *
 * Authors:
 *   zoujie <364778792@qq.com>
 */
module.exports = appInfo => {

  const config = exports = {};
  // cookie签名
  config.keys = appInfo.name + '_1586832817992_1141';

  config.cacheTick = '5m';//m是分钟，s是秒

  config.middleware = ['notFoundHandler','log','report'];

  //alinode性能监控
  config.alinode = {
    server: 'wss://agentserver.node.aliyun.com:8080',
    appid: '***',  // Node.js 性能平台给您的项目生成的 appid
    secret: '***',  // Node.js 性能平台给您的项目生成的 secret
    logdir: appInfo.baseDir+'/logs/example',
    error_log: [
      appInfo.baseDir+'/logs/example/common-error.log',
      appInfo.baseDir+'/logs/example/egg-agent.log',
      appInfo.baseDir+'/logs/example/egg-schedule.log',
      appInfo.baseDir+'/logs/example/egg-web.log',
      appInfo.baseDir+'/logs/example/example-web.log'
      //'您的应用在业务层面产生的异常日志的路径，数组，可选，可配置多个',
      //'例如：/root/.logs/error.#YYYY#-#MM#-#DD#.log',
      //'不更改 Egg 默认日志输出路径可不配置本项目',
    ],
    agentidMode:'' //'可选，如果设置，则在实例ID中添加部分IP信息，用于多个实例 hostname 相同的场景（以容器为主）'
  };

  config.onerror = {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      ctx.body = 'error';
      ctx.status = 500;
    },
    html(err, ctx) {
      // html hander
      ctx.body = '<h3>error</h3>';
      ctx.status = 500;
    },
    json(err, ctx) {
      // json hander
      ctx.body = { message: 'error' };
      ctx.status = 500;
    },
    jsonp(err, ctx) {
      // 一般来说，不需要特殊针对 jsonp 进行错误定义，jsonp 的错误处理会自动调用 json 错误处理，并包装成 jsonp 的响应格式
    }
  }

  config.view = {
    defaultViewEngine: 'ejs',
    mapping: {
      '.html': 'ejs'
    }
  }

  //自定义配置
  const userConfig = {
    // myAppName: 'test',
  };

  return {
    ...config,
    ...userConfig,
  };
};
