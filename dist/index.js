(()=>{"use strict";var e={891:function(e,t,r){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}u((n=n.apply(e,t||[])).next())}))},s=this&&this.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.List=void 0;var a=i(r(908)),u=r(736),c=r(732),l=r(553),p=function(){function e(e){this._args=e,this._listRef=global.firestoreDB.collection("lists")}return e.prototype.process=function(e){switch(e){case"createList":return this._createList();case"getListsOfUser":return this._getListsOfUser();default:return}},e.prototype._createList=function(){return o(this,void 0,void 0,(function(){var e,t,r;return s(this,(function(o){switch(o.label){case 0:return o.trys.push([0,3,,4]),[4,this._listRef.add({applicants:[],owner:this._args.owner,type:this._args.type})];case 1:return e=o.sent(),t=[{}],[4,e.get()];case 2:return[2,n.apply(void 0,[n.apply(void 0,t.concat([o.sent().data()])),{id:e.id}])];case 3:throw r=o.sent(),console.error(r),new Error(u.EFL.errorCreating);case 4:return[2]}}))}))},e.prototype._getListsOfUser=function(){return o(this,void 0,void 0,(function(){var e,t,r,o,i,a,u;return s(this,(function(s){switch(s.label){case 0:return s.trys.push([0,6,,7]),[4,this._listRef.where("owner","==",this._args.owner).get()];case 1:return e=s.sent(),t=e.docs.map((function(e){return n(n({},e.data()),{id:e.id})})),(r=t.filter((function(e){if(e.type===l.PATA.au||e.type===l.PATA.fc||e.type===l.PATA.cu||e.type===l.PATA.d||e.type===l.PATA.r)return e}))).length>0?(o=r[0],[4,this._getDetailUserData("teachers",r[0])]):[3,3];case 2:o.applicants=s.sent(),s.label=3;case 3:return(i=t.filter((function(e){if(e.type===l.PATA.tof||e.type===l.PATA.tua||e.type===l.PATA.tuc)return e}))).length>0?(a=i[0],[4,this._getDetailUserData("students",i[0])]):[3,5];case 4:a.applicants=s.sent(),s.label=5;case 5:return[2,{students:i[0],teachers:r[0]}];case 6:throw u=s.sent(),console.error(u),u;case 7:return[2]}}))}))},e.prototype._getDetailUserData=function(e,t){var r;return o(this,void 0,void 0,(function(){var o,i,a,u,c,l,p;return s(this,(function(s){switch(s.label){case 0:o=global.firestoreDB.collection(e),i=null===(r=null==t?void 0:t.applicants)||void 0===r?void 0:r.length,a=[],s.label=1;case 1:s.trys.push([1,6,,7]),c=0,s.label=2;case 2:return c<i?[4,o.doc((null==t?void 0:t.applicants)[c]).get()]:[3,5];case 3:u=s.sent(),l=n(n({},u.data()),{id:(null==t?void 0:t.applicants)[c]}),a.push(l),s.label=4;case 4:return c++,[3,2];case 5:return[2,a];case 6:throw p=s.sent(),console.error(p),new Error("User does not exists");case 7:return[2]}}))}))},e.prototype.enroll=function(e,t){return o(this,void 0,void 0,(function(){var r;return s(this,(function(n){switch(n.label){case 0:return n.trys.push([0,2,,3]),[4,this._listRef.doc(this._args.id).update({applicants:a.default.FieldValue.arrayUnion(e)})];case 1:return n.sent(),[3,3];case 2:throw r=n.sent(),console.error(r),"teacher"===t?new Error(""+u.EFL.errorEnrolling+c.CFU.pTeacher):new Error(""+u.EFL.errorEnrolling+c.CFU.pStudent);case 3:return[2]}}))}))},e}();t.List=p},28:function(e,t,r){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}u((n=n.apply(e,t||[])).next())}))},s=this&&this.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.User=void 0;var a=i(r(54)),u=r(891),c=r(732),l=r(189),p=r(378),d=r(819),f=process.env.KEY_PASSWORD,h=function(){function e(e){this._args=e,this._usersRef=global.firestoreDB.collection("users"),this._result=[]}return e.prototype.process=function(e,t,r){switch(e){case"enrollStudent":return this._enroll("student",r);case"enrollTeacher":return this._enroll("teacher",r);case"notify":return this._notify();case"verify":return this._verify(t);default:return}},e.prototype._enroll=function(e,t){var r,i;return o(this,void 0,void 0,(function(){var o,a,l,p;return s(this,(function(s){switch(s.label){case 0:o="0"===(null===(r=this._args)||void 0===r?void 0:r.documentType)?"documentNumber":"UNICode",s.label=1;case 1:return s.trys.push([1,5,,6]),[4,this._usersRef.where(o,"==",""+(null===(i=this._args)||void 0===i?void 0:i.documentNumber)).get()];case 2:if(a=s.sent(),"postulating"in(l=a.docs.map((function(e){return n(n({},e.data()),{id:e.id})}))[0])&&l.postulating)throw"teacher"===e?new Error(""+c.CFU.article+c.CFU.teacher+c.EFU.errorEnrolling1):new Error(""+c.CFU.article+c.CFU.student+c.EFU.errorEnrolling1);if("registered"in l&&l.registered)throw"teacher"===e?new Error(""+c.CFU.article+c.CFU.teacher+c.EFU.errorEnrolling2):new Error(""+c.CFU.article+c.CFU.student+c.EFU.errorEnrolling2);return[4,this._usersRef.doc(l.id).update({list:t,postulating:!0})];case 3:return s.sent(),[4,new u.List({id:t,owner:l.id,type:e}).enroll(l.id,e)];case 4:return s.sent(),[2,l];case 5:if(p=s.sent(),console.error(p),p.message===""+c.CFU.article+c.CFU.teacher+c.EFU.errorEnrolling1||p.message===""+c.CFU.article+c.CFU.student+c.EFU.errorEnrolling1)throw p;throw"teacher"===e?new Error(""+c.EFU.errorEnrolling+c.CFU.pTeacher):new Error(""+c.EFU.errorEnrolling+c.CFU.pStudent);case 6:return[2]}}))}))},e.prototype._notify=function(){return o(this,void 0,void 0,(function(){var e,t,r,o,i;return s(this,(function(s){switch(s.label){case 0:t=!1,s.label=1;case 1:return s.trys.push([1,10,,11]),r=l.generatePassword(f),[4,this._usersRef.doc(this._args.id).get()];case 2:return e=s.sent(),"mail"in(o=n(n({},e.data()),{id:this._args.id}))&&""!==o.mail?(t=!0,[4,p.mail(o.mail,r.password)]):[3,4];case 3:return s.sent(),[3,7];case 4:return"optionalMail"in o&&""!==o.optionalMail?[4,p.mail(o.optionalMail,r.password)]:[3,6];case 5:return s.sent(),[3,7];case 6:throw new Error(c.EFU.userHasNotMail);case 7:return[4,this._usersRef.doc(o.id).update({registered:!0})];case 8:return s.sent(),[4,a.default.auth().createUser({email:t?o.mail:o.optionalMail,password:r.password,uid:o.id})];case 9:return s.sent(),[2,c.MFU.updateAndNotifySuccess];case 10:if(i=s.sent(),console.log(i),i.message===d.MFME.generic)throw i;throw new Error(c.EFU.errorNotifying);case 11:return[2]}}))}))},e.prototype._verify=function(e){var t,r;return o(this,void 0,void 0,(function(){var n,o,i,a=this;return s(this,(function(s){switch(s.label){case 0:n="0"===(null===(t=this._args)||void 0===t?void 0:t.documentType)?"documentNumber":"UNICode",s.label=1;case 1:return s.trys.push([1,3,,4]),[4,this._usersRef.where(n,"==",""+(null===(r=this._args)||void 0===r?void 0:r.documentNumber)).get()];case 2:if(0===(o=s.sent()).docs.length)throw"teacher"===e?new Error(c.EFU.teacherNotFound):new Error(c.EFU.studentNotFound);return o.docs.forEach((function(e){a._result.push({id:e.id,lastName:e.data().lastName,mail:e.data().mail||e.data().optionalMail||"",names:e.data().names,registered:void 0!==e.data().registered&&e.data().registered,secondLastName:e.data().secondLastName})})),[2,this._result[0]];case 3:if(i=s.sent(),console.error(i),i.message===c.EFU.teacherNotFound||i.message===c.EFU.studentNotFound)throw i;throw"teacher"===e?new Error(""+c.EFU.errorVerifying+c.CFU.pTeacher):new Error(""+c.EFU.errorVerifying+c.CFU.pStudent);case 4:return[2]}}))}))},e}();t.User=h},736:(e,t)=>{var r,n;Object.defineProperty(t,"__esModule",{value:!0}),t.MFL=t.EFL=void 0,function(e){e.errorCreating="Hubo un error creando la lista.",e.errorEnrolling="Hubo un problema inscribiendo al "}(r||(r={})),t.EFL=r,function(e){e.success="Su lista fue creada exitosamente."}(n||(n={})),t.MFL=n},732:(e,t)=>{var r,n,o;Object.defineProperty(t,"__esModule",{value:!0}),t.MFU=t.EFU=t.CFU=void 0,function(e){e.article="El ",e.pStudent="estudiante.",e.pTeacher="docente.",e.student="estudiante",e.teacher="docente"}(r||(r={})),t.CFU=r,function(e){e.errorEnrolling="Hubo un error inscribiendo al ",e.errorEnrolling1=" ya se encuentra postulando.",e.errorEnrolling2=" es personero y por lo tanto no puede postular.",e.errorNotifying="Hubo un error generando la contraseña del usuario.",e.errorVerifying="Hubo un error mientras se intentaba verificar el ",e.generic="Hubo un error intentando inscribir al usuario",e.studentNotFound="El estudiante no se encuentra registrado en el padrón.",e.teacherNotFound="El docente no se encuentra registrado en el padrón.",e.userHasNotMail="Ud. no tiene un correo registrado en el padrón electoral.\n Se ha notificado al CEUNI, se comunicarán con Ud. lo antes posible. Disculpe las molestias."}(n||(n={})),t.EFU=n,function(e){e.enrollSuccess="Se ha registrado correctamente al ",e.updateAndNotifySuccess="Se ha generado su contraseña correctamente y ha sido enviada a su correo."}(o||(o={})),t.MFU=o},280:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.firebaseConnection=void 0;var i=s(r(54)),a=r(96),u={auth_provider_x509_cert_url:process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,auth_uri:process.env.FIREBASE_AUTH_URI,client_email:process.env.FIREBASE_CLIENT_EMAIL,client_id:process.env.FIREBASE_CLIENT_ID,client_x509_cert_url:process.env.FIREBASE_X509_CERT,private_key:process.env.FIREBASE_PRIVATE_KEY,private_key_id:process.env.FIREBASE_PRIVATE_KEY_ID,project_id:process.env.FIREBASE_PROJECT_ID,token_uri:process.env.FIREBASE_TOKEN_URI,type:process.env.FIREBASE_TYPE};t.firebaseConnection=function(){return n(void 0,void 0,void 0,(function(){var e;return o(this,(function(t){switch(t.label){case 0:return[4,a.writeJson(process.env.GOOGLE_APPLICATION_CREDENTIALS,JSON.stringify(u).replace(/\\\\/g,"\\"),"utf8")];case 1:return t.sent(),e=i.default.initializeApp({credential:i.default.credential.applicationDefault(),databaseURL:process.env.FIREBASE_URL}),[4,a.deleteFile(process.env.GOOGLE_APPLICATION_CREDENTIALS)];case 2:return t.sent(),global.firestoreDB=i.default.firestore(e),console.log("Firebase connection established."),[2]}}))}))}},607:(e,t,r)=>{r(122).Server.start()},237:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.response=void 0,t.response=function(e,t,r,n){r.status(n).send({error:e,message:t})}},149:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.applyRoutes=void 0;var o=n(r(677)),s=n(r(960)),i=n(r(34)),a=r(479),u=r(237),c=[a.List,a.User];t.applyRoutes=function(e){e.use("/",a.Home),e.use("/auth",a.Auth),e.use("/api/docs",o.default.serve,o.default.setup(i.default)),c.forEach((function(t){return e.use("/api",t)})),e.use((function(e,t,r){r(new s.default.NotFound("This route does not exist"))})),e.use((function(e,t,r,n){u.response(!0,e.message,r,e.status),n()}))}},122:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Server=void 0;var o=n(r(127)),s=n(r(150)),i=r(149),a=r(280),u=new(function(){function e(){this.app=o.default(),this._config()}return e.prototype._config=function(){this.app.set("port",process.env.PORT||"3000"),this.app.use(s.default("dev")),this.app.use(o.default.json()),this.app.use(o.default.urlencoded({extended:!1})),this.app.use((function(e,t,r){process.env.MODE&&"dev"===process.env.MODE?t.header("Access-Control-Allow-Origin","*"):t.header("Access-Control-Allow-Origin",process.env.RHOADES_FRONT_URL),t.header("Access-Control-Allow-Headers","Authorization, Content-Type"),t.header("Access-Control-Allow-Methods","GET, PATCH, POST"),r()})),i.applyRoutes(this.app)},e.prototype._firebase=function(){this._firebaseConnection=a.firebaseConnection,this._firebaseConnection()},e.prototype.start=function(){var e=this;this.app.listen(this.app.get("port"),(function(){return console.log("Server running at port "+e.app.get("port")+".")}));try{this._firebase()}catch(e){console.error(e)}},e}());t.Server=u},345:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.Auth=void 0;var i=r(127),a=s(r(960)),u=r(237),c=i.Router();t.Auth=c,c.route("/refresh-token").post((function(e,t,r){return n(void 0,void 0,void 0,(function(){var n,s,i;return o(this,(function(o){try{if(!(n=null===(i=null===(s=e.body)||void 0===s?void 0:s.args)||void 0===i?void 0:i.id))throw new a.default.BadRequest("Missing parameters");u.response(!1,{id:n},t,200)}catch(e){r(e)}return[2]}))}))}))},333:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Home=void 0;var n=r(127),o=r(237),s=n.Router();t.Home=s,s.route("").get((function(e,t){o.response(!1,"Welcome to Rhoades's backend!",t,200)}))},479:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.User=t.List=t.Home=t.Auth=void 0;var n=r(345);Object.defineProperty(t,"Auth",{enumerable:!0,get:function(){return n.Auth}});var o=r(333);Object.defineProperty(t,"Home",{enumerable:!0,get:function(){return o.Home}});var s=r(847);Object.defineProperty(t,"List",{enumerable:!0,get:function(){return s.List}});var i=r(166);Object.defineProperty(t,"User",{enumerable:!0,get:function(){return i.User}})},847:function(e,t,r){var n=this&&this.__assign||function(){return(n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var o in t=arguments[r])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}u((n=n.apply(e,t||[])).next())}))},s=this&&this.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.List=void 0;var i=r(127),a=r(237),u=r(891),c=i.Router();t.List=c,c.route("/list/createList").post((function(e,t){return o(void 0,void 0,void 0,(function(){var r,o,i,c,l;return s(this,(function(s){switch(s.label){case 0:r=e.body.args,o=e.query.condition,i=new u.List(n(n({},r),{type:o})),s.label=1;case 1:return s.trys.push([1,3,,4]),[4,i.process("createList")];case 2:return c=s.sent(),a.response(!1,{result:c},t,200),[3,4];case 3:return l=s.sent(),a.response(!0,{result:l.message},t,500),[3,4];case 4:return[2]}}))}))})),c.route("/list/getListsOfUser/:id").get((function(e,t){return o(void 0,void 0,void 0,(function(){var r,n,o,i;return s(this,(function(s){switch(s.label){case 0:r=e.params.id,n=new u.List({owner:r}),s.label=1;case 1:return s.trys.push([1,3,,4]),[4,n.process("getListsOfUser")];case 2:return o=s.sent(),a.response(!1,{result:o},t,200),[3,4];case 3:return i=s.sent(),a.response(!0,{result:i.message},t,500),[3,4];case 4:return[2]}}))}))}))},166:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}};Object.defineProperty(t,"__esModule",{value:!0}),t.User=void 0;var s=r(127),i=r(28),a=r(237),u=s.Router();t.User=u,u.route("/user/verify/:code").get((function(e,t){return n(void 0,void 0,void 0,(function(){var r,n,s,u,c,l,p;return o(this,(function(o){switch(o.label){case 0:r=e.params.code,n=e.query,s=n.condition,u=n.documentType,c=new i.User({documentNumber:r,documentType:u}),o.label=1;case 1:return o.trys.push([1,3,,4]),[4,c.process("verify",s)];case 2:return l=o.sent(),a.response(!1,{result:l},t,200),[3,4];case 3:return p=o.sent(),console.log(p),a.response(!0,{result:p.message},t,500),[3,4];case 4:return[2]}}))}))})),u.route("/user/notify").patch((function(e,t){return n(void 0,void 0,void 0,(function(){var r,n,s,u;return o(this,(function(o){switch(o.label){case 0:r=e.body.args,n=new i.User(r),o.label=1;case 1:return o.trys.push([1,3,,4]),[4,n.process("notify")];case 2:return s=o.sent(),a.response(!1,{result:s},t,200),[3,4];case 3:return u=o.sent(),a.response(!0,{result:u.message},t,500),[3,4];case 4:return[2]}}))}))})),u.route("/user/enroll/:code").post((function(e,t){return n(void 0,void 0,void 0,(function(){var r,n,s,u,c,l,p,d,f,h;return o(this,(function(o){switch(o.label){case 0:r=e.body.args,n=e.params.code,s=e.query,u=s.condition,c=s.documentType,l=new i.User({documentNumber:n,documentType:c}),p=r.id,d="teacher"===u?"enrollTeacher":"enrollStudent",o.label=1;case 1:return o.trys.push([1,3,,4]),[4,l.process(d,void 0,p)];case 2:return f=o.sent(),a.response(!0,{result:f},t,200),[3,4];case 3:return h=o.sent(),a.response(!0,{result:h.message},t,500),[3,4];case 4:return[2]}}))}))}))},553:(e,t)=>{var r;Object.defineProperty(t,"__esModule",{value:!0}),t.PATA=void 0,function(e){e.au="university-assembly",e.cu="university-council",e.d="dean",e.fc="faculty-council",e.r="rector",e.tof="third-of-faculty",e.tua="university-third-assembly",e.tuc="university-third-council"}(r||(r={})),t.PATA=r},96:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.writeJson=t.deleteFile=void 0;var o=n(r(747));t.writeJson=function(e,t,r){return new Promise((function(n,s){o.default.writeFile(e,t,r,(function(e){e?s(e):n("Success")}))}))},t.deleteFile=function(e){return new Promise((function(t,r){o.default.unlink(e,(function(e){e?r(e):t("Success")}))}))}},378:function(e,t,r){var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(o,s){function i(e){try{u(n.next(e))}catch(e){s(e)}}function a(e){try{u(n.throw(e))}catch(e){s(e)}}function u(e){var t;e.done?o(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(i,a)}u((n=n.apply(e,t||[])).next())}))},o=this&&this.__generator||function(e,t){var r,n,o,s,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return s={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function a(s){return function(a){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,n&&(o=2&s[0]?n.return:s[0]?n.throw||((o=n.return)&&o.call(n),0):n.next)&&!(o=o.call(n,s[1])).done)return o;switch(n=0,o&&(s=[2&s[0],o.value]),s[0]){case 0:case 1:o=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,n=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!((o=(o=i.trys).length>0&&o[o.length-1])||6!==s[0]&&2!==s[0])){i=0;continue}if(3===s[0]&&(!o||s[1]>o[0]&&s[1]<o[3])){i.label=s[1];break}if(6===s[0]&&i.label<o[1]){i.label=o[1],o=s;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(s);break}o[2]&&i.ops.pop(),i.trys.pop();continue}s=t.call(e,i)}catch(e){s=[6,e],n=0}finally{r=o=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,a])}}},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.mail=void 0;var i=s(r(123)),a=r(819),u=process.env.EMAIL_SENDER,c=process.env.EMAIL_PASSWORD;t.mail=function(e,t,r){return n(void 0,void 0,void 0,(function(){var n,s,l;return o(this,(function(o){switch(o.label){case 0:n=i.default.createTransport({auth:{pass:c,user:u},service:"Gmail"}),s={from:"ACECOM <"+u+">",html:r||"",sender:u,subject:a.MFE.subject,text:""+a.MFE.password+t+a.MFE.farewell,to:e},o.label=1;case 1:return o.trys.push([1,3,,4]),[4,n.sendMail(s)];case 2:return[2,o.sent()];case 3:throw l=o.sent(),console.log(l),new Error(a.MFME.generic);case 4:return[2]}}))}))}},819:(e,t)=>{var r,n;Object.defineProperty(t,"__esModule",{value:!0}),t.MFME=t.MFE=void 0,function(e){e.farewell="\n\nSaludos cordiales.",e.password="Su contraseña ha sido creada exitosamente, por favor recuerde que esta contraseña es única e intrasferible.\nEn caso de perderla, debe ponerse en contacto con el CEUNI para que autorice la creación de una nueva.\n\nContraseña: ",e.subject="Proceso Electoral UNI 2020 - Contraseña generada con éxito"}(r||(r={})),t.MFE=r,function(e){e.generic="Hubo un problema enviando el email."}(n||(n={})),t.MFME=n},189:function(e,t,r){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.generatePassword=t.encryptMessage=t.decryptMessage=void 0;var o=n(r(417)),s=n(r(724)),i=process.env.ALGORITHM,a=process.env.IV,u=process.env.KEY,c=function(e){return o.default.scryptSync(e,u,24)},l=function(e,t){var r=c(t),n=o.default.createCipheriv(i,r,Buffer.from(a,"hex"));return n.update(e,"utf8","hex")+n.final("hex")};t.encryptMessage=l,t.decryptMessage=function(e,t){var r=c(t),n=o.default.createDecipheriv(i,r,Buffer.from(a,"hex"));return n.update(e,"hex","utf8")+n.final("utf8")},t.generatePassword=function(e){var t=s.default.generate({length:16,lowercase:!0,numbers:!0,strict:!0,symbols:!0,uppercase:!0});return{ePassword:l(t,e),password:t}}},34:e=>{e.exports=JSON.parse('{"openapi":"3.0.0","info":{"title":"Rhoades backend","description":"This is documentation of Rhoades backend.","contact":{"email":"acecom.soporte@gmail.com"},"license":{"name":"MIT","url":"https://opensource.org/licenses/MIT"},"version":"0.12.0"},"servers":[{"url":"https://acecom-rhoades.herokuapp.com/api/","description":"Rhoades prod API"},{"url":"https://acecom-rhoades-dev.herokuapp.com/","description":"Rhoades dev API"}],"tags":[{"name":"user","description":"Operations about a teacher or student that belongs to the CEUNI\'s pattern"},{"name":"list","description":"Operations about a list performed by a registered user"}],"paths":{"/user/verify/{code}":{"get":{"tags":["user"],"summary":"Create user","operationId":"verifyUser","parameters":[{"name":"code","in":"path","description":"The user code or document number.","required":true,"style":"simple","explode":false,"schema":{"type":"string"}},{"name":"condition","in":"query","description":"Either teacher or student.","required":true,"style":"form","explode":true,"schema":{"type":"string","enum":["teacher","student"]}},{"name":"documentType","in":"query","description":"0 for documentNumber or 1 for UNI code.","required":true,"style":"form","explode":true,"schema":{"type":"integer","enum":[0,1]}}],"responses":{"200":{"description":"Whether the user belongs to the patten.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/VerifyUserResponse"}}}},"500":{"description":"Internal server error.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/DefaultError"}}}}}}},"/user/notify":{"patch":{"tags":["user"],"summary":"Sends the corresponding password to the user that has been registered.","requestBody":{"$ref":"#/components/requestBodies/SimpleDtoUser"},"responses":{"200":{"description":"The user has been successfully registered and notified.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/DefaultSuccess"}}}},"500":{"description":"Internal server error.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/DefaultError"}}}}}}},"/user/enroll/{code}":{"post":{"tags":["user"],"summary":"Enrolls a user into a list.","parameters":[{"name":"code","in":"path","description":"The user code or document number.","required":true,"style":"simple","explode":false,"schema":{"type":"string","example":"20201001A"}},{"name":"condition","in":"query","description":"Either teacher or student.","required":true,"style":"form","explode":true,"schema":{"type":"string","enum":["teacher","student"]}},{"name":"documentType","in":"query","description":"0 for documentNumber or 1 for UNI code.","required":true,"style":"form","explode":true,"schema":{"type":"integer","enum":[0,1]}}],"requestBody":{"$ref":"#/components/requestBodies/SimpleDtoUser"},"responses":{"200":{"description":"The user has been successfully registered and notified.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/User"}}}},"500":{"description":"Internal server error.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/DefaultError"}}}}}}},"/list/createList":{"post":{"tags":["list"],"summary":"Create a list to postulate.","parameters":[{"name":"condition","in":"query","description":"Either teacher or student.","required":true,"style":"form","explode":true,"schema":{"type":"string","enum":["teacher","student"]}}],"requestBody":{"$ref":"#/components/requestBodies/SimpleDtoList"},"responses":{"200":{"description":"The list has been successfully created.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/EmptyList"}}}},"500":{"description":"Internal server error.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/DefaultError"}}}}}}},"/list/getListOfUser/{id}":{"get":{"tags":["list"],"summary":"Get all the list that a user has registered.","parameters":[{"name":"id","in":"path","description":"Firebase user id","required":true,"style":"simple","explode":false,"schema":{"type":"string"}}],"responses":{"200":{"description":"The user has been successfully registered and notified.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/List"}}}},"500":{"description":"Internal server error.","content":{"application/json":{"schema":{"$ref":"#/components/schemas/DefaultError"}}}}}}}},"components":{"schemas":{"User":{"type":"object","properties":{"UNICode":{"type":"string"},"documentNumber":{"type":"string","description":"Number of DNI, CE or others"},"documentType":{"type":"string","description":"DNI, CE or others"},"faculty":{"type":"string"},"id":{"type":"string","description":"Firestore id."},"lastName":{"type":"string"},"mail":{"type":"string","description":"UNI mail registered in the pattern"},"names":{"type":"string"},"optionalMail":{"type":"string"},"postulating":{"type":"boolean"},"registered":{"type":"boolean","description":"Whether the user is registered in the platform.","default":false},"secondLastName":{"type":"string"},"specialty":{"type":"string"}}},"List":{"type":"object","properties":{"id":{"type":"string"},"applicants":{"type":"array","items":{"$ref":"#/components/schemas/User"}},"owner":{"type":"string"},"type":{"type":"string"}}},"EmptyList":{"type":"object","properties":{"id":{"type":"string"},"applicants":{"type":"array","items":{},"default":[]},"owner":{"type":"string"},"type":{"type":"string"}}},"VerifyUserResponse":{"type":"object","properties":{"error":{"type":"boolean","default":false},"message":{"type":"object","properties":{"result":{"type":"object","properties":{"id":{"type":"string","description":"Firestore id."},"lastName":{"type":"string"},"mail":{"type":"string","description":"UNI mail or optional mail registered in the pattern"},"names":{"type":"string"},"registered":{"type":"boolean","description":"Whether the user is registered in the platform.","default":false},"secondLastName":{"type":"string"}}}}}}},"DefaultSuccess":{"type":"object","properties":{"error":{"type":"boolean","default":false},"message":{"type":"object","properties":{"result":{"type":"string"}}}}},"DefaultError":{"type":"object","properties":{"error":{"type":"boolean"},"message":{"type":"object","properties":{"result":{"type":"string"}}}}}},"requestBodies":{"SimpleDtoUser":{"description":"id of users","content":{"application/json":{"schema":{"type":"object","properties":{"args":{"type":"object","properties":{"id":{"type":"string","description":"Firebase id"}}}}}}},"required":true},"SimpleDtoList":{"content":{"application/json":{"schema":{"type":"object","properties":{"args":{"type":"object","properties":{"owner":{"type":"string","description":"Firestore id"}}}}}}}}}}}')},908:e=>{e.exports=require("@google-cloud/firestore")},417:e=>{e.exports=require("crypto")},127:e=>{e.exports=require("express")},54:e=>{e.exports=require("firebase-admin")},747:e=>{e.exports=require("fs")},724:e=>{e.exports=require("generate-password")},960:e=>{e.exports=require("http-errors")},150:e=>{e.exports=require("morgan")},123:e=>{e.exports=require("nodemailer")},677:e=>{e.exports=require("swagger-ui-express")}},t={};!function r(n){if(t[n])return t[n].exports;var o=t[n]={exports:{}};return e[n].call(o.exports,o,o.exports,r),o.exports}(607)})();