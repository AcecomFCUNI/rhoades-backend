(()=>{"use strict";var e={28:function(e,t,r){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{a(n.next(e))}catch(e){i(e)}}function u(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}a((n=n.apply(e,t||[])).next())}))},i=this&&this.__generator||function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.User=void 0;var s=r(521),u=function(){function e(e){this._args=e,this._studentsRef=global.firestoreDB.collection("students"),this._teachersRef=global.firestoreDB.collection("teachers"),this._result=[]}return e.prototype.process=function(e){switch(e){case"verifyStudent":return this._verifyUser("student");case"verifyTeacher":return this._verifyUser("teacher");default:return}},e.prototype._verifyUser=function(e){var t,r,u;return o(this,void 0,void 0,(function(){var o,a,c,l=this;return i(this,(function(i){switch(i.label){case 0:o="0"===(null===(t=this._args)||void 0===t?void 0:t.documentType)?"documentNumber":"UNICode",i.label=1;case 1:return i.trys.push([1,6,,7]),"teacher"!==e?[3,3]:[4,this._teachersRef.where(o,"==",""+(null===(r=this._args)||void 0===r?void 0:r.documentNumber)).get()];case 2:return a=i.sent(),[3,5];case 3:return[4,this._studentsRef.where(o,"==",""+(null===(u=this._args)||void 0===u?void 0:u.documentNumber)).get()];case 4:a=i.sent(),i.label=5;case 5:if(0===a.docs.length)throw"teacher"===e?new Error(s.EFU.teacherNotFound):new Error(s.EFU.studentNotFound);return a.docs.forEach((function(e){l._result.push(n({},e.data()))})),[2,this._result[0]];case 6:if((c=i.sent()).message===s.EFU.teacherNotFound||c.message===s.EFU.studentNotFound)throw c;throw console.error(c),new Error("There was a error verifying the "+e);case 7:return[2]}}))}))},e}();t.User=u},521:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.EFU=void 0,function(e){e.studentNotFound="The requested student does not exist.",e.teacherNotFound="The requested teacher does not exist."}(r||(r={})),t.EFU=r},280:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{a(n.next(e))}catch(e){i(e)}}function u(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}a((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.firebaseConnection=void 0;var s=i(r(54)),u=r(96),a={auth_provider_x509_cert_url:process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,auth_uri:process.env.FIREBASE_AUTH_URI,client_email:process.env.FIREBASE_CLIENT_EMAIL,client_id:process.env.FIREBASE_CLIENT_ID,client_x509_cert_url:process.env.FIREBASE_X509_CERT,private_key:process.env.FIREBASE_PRIVATE_KEY,private_key_id:process.env.FIREBASE_PRIVATE_KEY_ID,project_id:process.env.FIREBASE_PROJECT_ID,token_uri:process.env.FIREBASE_TOKEN_URI,type:process.env.FIREBASE_TYPE};t.firebaseConnection=function(){return n(void 0,void 0,void 0,(function(){var e;return o(this,(function(t){switch(t.label){case 0:return[4,u.writeJson(process.env.GOOGLE_APPLICATION_CREDENTIALS,JSON.stringify(a).replace(/\\\\/g,"\\"),"utf8")];case 1:return t.sent(),e=s.default.initializeApp({credential:s.default.credential.applicationDefault(),databaseURL:process.env.FIREBASE_URL}),[4,u.deleteFile(process.env.GOOGLE_APPLICATION_CREDENTIALS)];case 2:return t.sent(),global.firestoreDB=s.default.firestore(e),console.log("Firebase connection established."),[2]}}))}))}},607:(e,t,r)=>{r(122).Server.start()},237:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.response=void 0,t.response=function(e,t,r,n){r.status(n).send({error:e,message:t})}},149:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.applyRoutes=void 0;var n=r(479),o=[n.User];t.applyRoutes=function(e){e.use("/",n.Home),o.forEach((function(t){return e.use("/api",t)}))}},122:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Server=void 0;var o=n(r(127)),i=n(r(150)),s=r(149),u=r(280),a=new(function(){function e(){this.app=o.default(),this._config()}return e.prototype._config=function(){this.app.set("port",process.env.PORT||"3000"),this.app.use(i.default("dev")),this.app.use(o.default.json()),this.app.use(o.default.urlencoded({extended:!1})),this.app.use((function(e,t,r){t.header("Access-Control-Allow-Origin","*"),t.header("Access-Control-Allow-Headers","Authorization, Content-Type"),r()})),s.applyRoutes(this.app)},e.prototype._firebase=function(){this._firebaseConnection=u.firebaseConnection,this._firebaseConnection()},e.prototype.start=function(){var e=this;this.app.listen(this.app.get("port"),(function(){return console.log("Server running at port "+e.app.get("port")+".")}));try{this._firebase()}catch(e){console.error(e)}},e}());t.Server=a},333:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Home=void 0;var n=r(127),o=r(237),i=n.Router();t.Home=i,i.route("").get((function(e,t){o.response(!1,"Welcome to Rhoades's backend!",t,200)}))},479:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.User=t.Home=void 0;var n=r(333);Object.defineProperty(t,"Home",{enumerable:!0,get:function(){return n.Home}});var o=r(166);Object.defineProperty(t,"User",{enumerable:!0,get:function(){return o.User}})},166:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,i){function s(e){try{a(n.next(e))}catch(e){i(e)}}function u(e){try{a(n.throw(e))}catch(e){i(e)}}function a(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,u)}a((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,i,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(o=2&i[0]?n.return:i[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,i[1])).done)return o;switch(n=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,n=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!((o=(o=s.trys).length>0&&o[o.length-1])||6!==i[0]&&2!==i[0])){s=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){s.label=i[1];break}if(6===i[0]&&s.label<o[1]){s.label=o[1],o=i;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(i);break}o[2]&&s.ops.pop(),s.trys.pop();continue}i=t.call(e,s)}catch(e){i=[6,e],n=0}finally{r=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.User=void 0;var i=r(127),s=r(28),u=r(237),a=i.Router();t.User=a,a.route("/:code").get((function(e,t){return n(void 0,void 0,void 0,(function(){var r,n,i,a,c,l,f,p;return o(this,(function(o){switch(o.label){case 0:r=e.params.code,n=e.query,i=n.condition,a=n.documentType,c=new s.User({documentNumber:r,documentType:a}),l="student"===i?"verifyStudent":"verifyTeacher",o.label=1;case 1:return o.trys.push([1,3,,4]),[4,c.process(l)];case 2:return f=o.sent(),u.response(!1,{result:f},t,200),[3,4];case 3:return p=o.sent(),u.response(!0,p.message,t,500),[3,4];case 4:return[2]}}))}))}))},96:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.writeJson=t.deleteFile=void 0;var o=n(r(747));t.writeJson=function(e,t,r){return new Promise((function(n,i){o.default.writeFile(e,t,r,(function(e){e?i(e):n("Success")}))}))},t.deleteFile=function(e){return new Promise((function(t,r){o.default.unlink(e,(function(e){e?r(e):t("Success")}))}))}},127:e=>{e.exports=require("express")},54:e=>{e.exports=require("firebase-admin")},747:e=>{e.exports=require("fs")},150:e=>{e.exports=require("morgan")}},t={};!function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}(607)})();