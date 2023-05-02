import { setTranslations, setLocale, getTranslations,addLocales } from 'react-i18nify';
import th from "./th.json"
import en from "./en.json"
import mainStorage from "../store/mainStorage";
import helper from "../helper/global"
setTranslations({en, th});
let language = 'th';
console.log(helper.storageGet('language'));
if(helper.storageGet('language')){
    language = helper.storageGet('language');
    helper.storageSave('label',getTranslations()[language]);
}else{
    helper.storageSave('language','th')
    helper.storageSave('label',getTranslations()['th']);
}
setLocale(language);
export default getTranslations()[language];

