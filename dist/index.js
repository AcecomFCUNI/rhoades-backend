(()=>{"use strict";var e={891:function(e,t,r){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}u((n=n.apply(e,t||[])).next())}))},s=this&&this.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.List=void 0;var a=i(r(908)),u=r(736),c=r(732),l=r(189),f=process.env.KEY_JSON,d=function(){function e(e){this._args=e,this._listRef=global.firestoreDB.collection("lists")}return e.prototype.process=function(e){switch(e){case"createList":return this._createList();default:return}},e.prototype._createList=function(){return o(this,void 0,void 0,(function(){var e,t,r,o;return s(this,(function(s){switch(s.label){case 0:return s.trys.push([0,3,,4]),[4,this._listRef.add({applicants:[],owner:this._args.owner,type:this._args.type})];case 1:return e=s.sent(),r=[{}],[4,e.get()];case 2:return t=n.apply(void 0,[n.apply(void 0,r.concat([s.sent().data()])),{id:e.id}]),[2,l.encryptMessage(JSON.stringify(t),f)];case 3:throw o=s.sent(),console.error(o),new Error(u.EFL.errorCreating);case 4:return[2]}}))}))},e.prototype.enroll=function(e,t){return o(this,void 0,void 0,(function(){var r;return s(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,this._listRef.doc(this._args.id).update({applicants:a.default.FieldValue.arrayUnion(e)})];case 1:return n.sent(),[3,3];case 2:throw r=n.sent(),console.error(r),"teacher"===t?new Error(""+u.EFL.errorEnrolling+c.CFU.pTeacher):new Error(""+u.EFL.errorEnrolling+c.CFU.pStudent);case 3:return[2]}}))}))},e}();t.List=d},28:function(e,t,r){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}u((n=n.apply(e,t||[])).next())}))},s=this&&this.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.User=void 0;var i=r(891),a=r(732),u=r(189),c=r(378),l=r(819),f=process.env.KEY_PASSWORD,d=process.env.KEY_JSON,p=function(){function e(e){this._args=e,this._studentsRef=global.firestoreDB.collection("students"),this._teachersRef=global.firestoreDB.collection("teachers"),this._result=[]}return e.prototype.process=function(e,t){switch(e){case"enrollStudent":return this._enroll("student",t);case"enrollTeacher":return this._enroll("teacher",t);case"notifyStudent":return this._notify("student");case"notifyTeacher":return this._notify("teacher");case"verifyStudent":return this._verifyUser("student");case"verifyTeacher":return this._verifyUser("teacher");default:return}},e.prototype._enroll=function(e,t){var r,c,l;return o(this,void 0,void 0,(function(){var o,f,p,h;return s(this,(function(s){switch(s.label){case 0:o="0"===(null===(r=this._args)||void 0===r?void 0:r.documentType)?"documentNumber":"UNICode",s.label=1;case 1:return s.trys.push([1,11,,12]),"teacher"!==e?[3,3]:[4,this._teachersRef.where(o,"==",""+(null===(c=this._args)||void 0===c?void 0:c.documentNumber)).get()];case 2:return f=s.sent(),[3,5];case 3:return[4,this._studentsRef.where(o,"==",""+(null===(l=this._args)||void 0===l?void 0:l.documentNumber)).get()];case 4:f=s.sent(),s.label=5;case 5:if("postulating"in(p=f.docs.map((function(e){return n(n({},e.data()),{id:e.id})}))[0])&&p.postulating)throw"teacher"===e?new Error(""+a.CFU.article+a.CFU.teacher+a.EFU.errorEnrolling1):new Error(""+a.CFU.article+a.CFU.student+a.EFU.errorEnrolling1);if("password"in p&&p.password)throw"teacher"===e?new Error(""+a.CFU.article+a.CFU.teacher+a.EFU.errorEnrolling2):new Error(""+a.CFU.article+a.CFU.student+a.EFU.errorEnrolling2);return"teacher"!==e?[3,7]:[4,this._teachersRef.doc(p.id).update({list:t,postulating:!0})];case 6:return s.sent(),[3,9];case 7:return[4,this._studentsRef.doc(p.id).update({list:t,postulating:!0})];case 8:s.sent(),s.label=9;case 9:return[4,new i.List({id:t,owner:p.id,type:e}).enroll(p.id,e)];case 10:return s.sent(),[2,u.encryptMessage(JSON.stringify(p),d)];case 11:if(h=s.sent(),console.error(h),h.message===""+a.CFU.article+a.CFU.teacher+a.EFU.errorEnrolling1||h.message===""+a.CFU.article+a.CFU.student+a.EFU.errorEnrolling1)throw h;throw"teacher"===e?new Error(""+a.EFU.errorEnrolling+a.CFU.pTeacher):new Error(""+a.EFU.errorEnrolling+a.CFU.pStudent);case 12:return[2]}}))}))},e.prototype._notify=function(e){return o(this,void 0,void 0,(function(){var t,r,o,i;return s(this,(function(s){switch(s.label){case 0:return s.trys.push([0,14,,15]),r=u.generatePassword(f),"teacher"!==e?[3,2]:[4,this._teachersRef.doc(this._args.id).get()];case 1:return t=s.sent(),[3,4];case 2:return[4,this._studentsRef.doc(this._args.id).get()];case 3:t=s.sent(),s.label=4;case 4:return"mail"in(o=n(n({},t.data()),{id:this._args.id}))&&""!==o.mail?[4,c.mail(o.mail,r.password)]:[3,6];case 5:return s.sent(),[3,9];case 6:return"optionalMail"in o&&""!==o.optionalMail?[4,c.mail(o.optionalMail,r.password)]:[3,8];case 7:return s.sent(),[3,9];case 8:throw new Error(a.EFU.userHasNotMail);case 9:return"teacher"!==e?[3,11]:[4,this._teachersRef.doc(o.id).update({password:r.ePassword})];case 10:return s.sent(),[3,13];case 11:return[4,this._studentsRef.doc(o.id).update({password:r.ePassword})];case 12:s.sent(),s.label=13;case 13:return[2,u.encryptMessage(a.MFU.updateAndNotifySuccess,d)];case 14:if(i=s.sent(),console.log(i),i.message===l.MFME.generic)throw i;throw new Error(a.EFU.errorNotifying);case 15:return[2]}}))}))},e.prototype._verifyUser=function(e){var t,r,i;return o(this,void 0,void 0,(function(){var o,c,l,f=this;return s(this,(function(s){switch(s.label){case 0:o="0"===(null===(t=this._args)||void 0===t?void 0:t.documentType)?"documentNumber":"UNICode",s.label=1;case 1:return s.trys.push([1,6,,7]),"teacher"!==e?[3,3]:[4,this._teachersRef.where(o,"==",""+(null===(r=this._args)||void 0===r?void 0:r.documentNumber)).get()];case 2:return c=s.sent(),[3,5];case 3:return[4,this._studentsRef.where(o,"==",""+(null===(i=this._args)||void 0===i?void 0:i.documentNumber)).get()];case 4:c=s.sent(),s.label=5;case 5:if(0===c.docs.length)throw"teacher"===e?new Error(a.EFU.teacherNotFound):new Error(a.EFU.studentNotFound);return c.docs.forEach((function(e){f._result.push(n(n({},e.data()),{id:e.id}))})),[2,u.encryptMessage(JSON.stringify(this._result[0]),d)];case 6:if(l=s.sent(),console.error(l),l.message===a.EFU.teacherNotFound||l.message===a.EFU.studentNotFound)throw l;throw"teacher"===e?new Error(""+a.EFU.errorVerifying+a.CFU.pTeacher):new Error(""+a.EFU.errorVerifying+a.CFU.pStudent);case 7:return[2]}}))}))},e}();t.User=p},736:(e,t)=>{var r,n;Object.defineProperty(t,"__esModule",{value:!0}),t.MFL=t.EFL=void 0,function(e){e.errorCreating="Hubo un error creando la lista.",e.errorEnrolling="Hubo un problema inscribiendo al "}(r||(r={})),t.EFL=r,function(e){e.success="Su lista fue creada exitosamente."}(n||(n={})),t.MFL=n},732:(e,t)=>{var r,n,o;Object.defineProperty(t,"__esModule",{value:!0}),t.MFU=t.EFU=t.CFU=void 0,function(e){e.article="El ",e.pStudent="estudiante.",e.pTeacher="docente.",e.student="estudiante",e.teacher="docente"}(r||(r={})),t.CFU=r,function(e){e.errorEnrolling="Hubo un error inscribiendo al ",e.errorEnrolling1=" ya se encuentra postulando.",e.errorEnrolling2=" es personero y por lo tanto no puede postular.",e.errorNotifying="Hubo un error generando la contraseña del usuario.",e.errorVerifying="Hubo un error mientras se intentaba verificar el ",e.generic="Hubo un error intentando inscribir al usuario",e.studentNotFound="El estudiante no se encuentra registrado en el padrón.",e.teacherNotFound="El docente no se encuentra registrado en el padrón.",e.userHasNotMail="Ud. no tiene un correo registrado en el padrón electoral.\n Se ha notificado al CEUNI, se comunicarán con Ud. lo antes posible. Disculpe las molestias."}(n||(n={})),t.EFU=n,function(e){e.enrollSuccess="Se ha registrado correctamente al ",e.updateAndNotifySuccess="Se ha generado su contraseña correctamente y ha sido enviada a su correo."}(o||(o={})),t.MFU=o},280:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.firebaseConnection=void 0;var i=s(r(54)),a=r(96),u={auth_provider_x509_cert_url:process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,auth_uri:process.env.FIREBASE_AUTH_URI,client_email:process.env.FIREBASE_CLIENT_EMAIL,client_id:process.env.FIREBASE_CLIENT_ID,client_x509_cert_url:process.env.FIREBASE_X509_CERT,private_key:process.env.FIREBASE_PRIVATE_KEY,private_key_id:process.env.FIREBASE_PRIVATE_KEY_ID,project_id:process.env.FIREBASE_PROJECT_ID,token_uri:process.env.FIREBASE_TOKEN_URI,type:process.env.FIREBASE_TYPE};t.firebaseConnection=function(){return n(void 0,void 0,void 0,(function(){var e;return o(this,(function(t){switch(t.label){case 0:return[4,a.writeJson(process.env.GOOGLE_APPLICATION_CREDENTIALS,JSON.stringify(u).replace(/\\\\/g,"\\"),"utf8")];case 1:return t.sent(),e=i.default.initializeApp({credential:i.default.credential.applicationDefault(),databaseURL:process.env.FIREBASE_URL}),[4,a.deleteFile(process.env.GOOGLE_APPLICATION_CREDENTIALS)];case 2:return t.sent(),global.firestoreDB=i.default.firestore(e),console.log("Firebase connection established."),[2]}}))}))}},607:(e,t,r)=>{r(122).Server.start()},237:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.response=void 0,t.response=function(e,t,r,n){r.status(n).send({error:e,message:t})}},149:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.applyRoutes=void 0;var n=r(479),o=[n.List,n.User];t.applyRoutes=function(e){e.use("/",n.Home),o.forEach((function(t){return e.use("/api",t)}))}},122:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Server=void 0;var o=n(r(127)),s=n(r(150)),i=r(149),a=r(280),u=new(function(){function e(){this.app=o.default(),this._config()}return e.prototype._config=function(){this.app.set("port",process.env.PORT||"3000"),this.app.use(s.default("dev")),this.app.use(o.default.json()),this.app.use(o.default.urlencoded({extended:!1})),this.app.use((function(e,t,r){t.header("Access-Control-Allow-Origin","*"),t.header("Access-Control-Allow-Headers","Authorization, Content-Type"),t.header("Access-Control-Allow-Methods","GET, PATCH, POST"),r()})),i.applyRoutes(this.app)},e.prototype._firebase=function(){this._firebaseConnection=a.firebaseConnection,this._firebaseConnection()},e.prototype.start=function(){var e=this;this.app.listen(this.app.get("port"),(function(){return console.log("Server running at port "+e.app.get("port")+".")}));try{this._firebase()}catch(e){console.error(e)}},e}());t.Server=u},333:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Home=void 0;var n=r(127),o=r(237),s=n.Router();t.Home=s,s.route("").get((function(e,t){o.response(!1,"Welcome to Rhoades's backend!",t,200)}))},479:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.User=t.List=t.Home=void 0;var n=r(333);Object.defineProperty(t,"Home",{enumerable:!0,get:function(){return n.Home}});var o=r(847);Object.defineProperty(t,"List",{enumerable:!0,get:function(){return o.List}});var s=r(166);Object.defineProperty(t,"User",{enumerable:!0,get:function(){return s.User}})},847:function(e,t,r){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}u((n=n.apply(e,t||[])).next())}))},s=this&&this.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.List=void 0;var i=r(127),a=r(237),u=r(891),c=i.Router();t.List=c,c.route("/list/createList").post((function(e,t){return o(void 0,void 0,void 0,(function(){var r,o,i,c,l;return s(this,(function(s){switch(s.label){case 0:r=e.body.args,o=e.query.condition,i=new u.List(n(n({},r),{type:o})),s.label=1;case 1:return s.trys.push([1,3,,4]),[4,i.process("createList")];case 2:return c=s.sent(),a.response(!1,c,t,200),[3,4];case 3:return l=s.sent(),a.response(!0,l.message,t,500),[3,4];case 4:return[2]}}))}))}))},166:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.User=void 0;var s=r(127),i=r(28),a=r(237),u=s.Router();t.User=u,u.route("/user/verify/:code").get((function(e,t){return n(void 0,void 0,void 0,(function(){var r,n,s,u,c,l,f,d;return o(this,(function(o){switch(o.label){case 0:r=e.params.code,n=e.query,s=n.condition,u=n.documentType,c=new i.User({documentNumber:r,documentType:u}),l="student"===s?"verifyStudent":"verifyTeacher",o.label=1;case 1:return o.trys.push([1,3,,4]),[4,c.process(l)];case 2:return f=o.sent(),a.response(!1,f,t,200),[3,4];case 3:return d=o.sent(),console.log(d),a.response(!0,d.message,t,500),[3,4];case 4:return[2]}}))}))})),u.route("/user/notify").patch((function(e,t){return n(void 0,void 0,void 0,(function(){var r,n,s,u,c,l;return o(this,(function(o){switch(o.label){case 0:r=e.body.args,n=e.query.condition,s=new i.User(r),u="student"===n?"notifyStudent":"notifyTeacher",o.label=1;case 1:return o.trys.push([1,3,,4]),[4,s.process(u)];case 2:return c=o.sent(),a.response(!1,c,t,200),[3,4];case 3:return l=o.sent(),a.response(!0,l.message,t,500),[3,4];case 4:return[2]}}))}))})),u.route("/user/enroll/:code").post((function(e,t){return n(void 0,void 0,void 0,(function(){var r,n,s,u,c,l,f,d,p,h;return o(this,(function(o){switch(o.label){case 0:r=e.body.args,n=e.params.code,s=e.query,u=s.condition,c=s.documentType,l=new i.User({documentNumber:n,documentType:c}),f=r.id,d="teacher"===u?"enrollTeacher":"enrollStudent",o.label=1;case 1:return o.trys.push([1,3,,4]),[4,l.process(d,f)];case 2:return p=o.sent(),a.response(!0,{result:p},t,200),[3,4];case 3:return h=o.sent(),a.response(!0,h.message,t,500),[3,4];case 4:return[2]}}))}))}))},96:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.writeJson=t.deleteFile=void 0;var o=n(r(747));t.writeJson=function(e,t,r){return new Promise((function(n,s){o.default.writeFile(e,t,r,(function(e){e?s(e):n("Success")}))}))},t.deleteFile=function(e){return new Promise((function(t,r){o.default.unlink(e,(function(e){e?r(e):t("Success")}))}))}},378:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.mail=void 0;var i=s(r(123)),a=r(819),u=process.env.EMAIL_SENDER,c=process.env.EMAIL_PASSWORD;t.mail=function(e,t,r){return n(void 0,void 0,void 0,(function(){var n,s,l;return o(this,(function(o){switch(o.label){case 0:n=i.default.createTransport({auth:{pass:c,user:u},service:"Gmail"}),s={from:"ACECOM <"+u+">",html:r||"",sender:u,subject:a.MFE.subject,text:""+a.MFE.password+t+a.MFE.farewell,to:e},o.label=1;case 1:return o.trys.push([1,3,,4]),[4,n.sendMail(s)];case 2:return[2,o.sent()];case 3:throw l=o.sent(),console.log(l),new Error(a.MFME.generic);case 4:return[2]}}))}))}},819:(e,t)=>{var r,n;Object.defineProperty(t,"__esModule",{value:!0}),t.MFME=t.MFE=void 0,function(e){e.farewell="\n\nSaludos cordiales.",e.password="Su contraseña ha sido creada exitosamente, por favor recuerde que esta contraseña es única e intrasferible.\nEn caso de perderla, debe ponerse en contacto con el CEUNI para que autorice la creación de una nueva.\n\nContraseña: ",e.subject="Proceso Electoral UNI 2020 - Contraseña generada con éxito"}(r||(r={})),t.MFE=r,function(e){e.generic="Hubo un problema enviando el email."}(n||(n={})),t.MFME=n},189:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.generatePassword=t.encryptMessage=t.decryptMessage=void 0;var o=n(r(417)),s=n(r(724)),i=process.env.ALGORITHM,a=process.env.IV,u=process.env.KEY,c=function(e){return o.default.scryptSync(e,u,24)},l=function(e,t){var r=c(t),n=o.default.createCipheriv(i,r,Buffer.from(a,"hex"));return n.update(e,"utf8","hex")+n.final("hex")};t.encryptMessage=l,t.decryptMessage=function(e,t){var r=c(t),n=o.default.createDecipheriv(i,r,Buffer.from(a,"hex"));return n.update(e,"hex","utf8")+n.final("utf8")},t.generatePassword=function(e){var t=s.default.generate({length:16,lowercase:!0,numbers:!0,strict:!0,symbols:!0,uppercase:!0});return{ePassword:l(t,e),password:t}}},908:e=>{e.exports=require("@google-cloud/firestore")},417:e=>{e.exports=require("crypto")},127:e=>{e.exports=require("express")},54:e=>{e.exports=require("firebase-admin")},747:e=>{e.exports=require("fs")},724:e=>{e.exports=require("generate-password")},150:e=>{e.exports=require("morgan")},123:e=>{e.exports=require("nodemailer")}},t={};!function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}(607)})();