/*
    入口文件
*/
let pages_urlName = localStorage.pages_urlName || '';
let pagesRedirection = localStorage.pagesRedirection || 'N';
let pages_url = location.href || ''
console.log("pages_urlName_vue:", pages_urlName);
console.log("pagesRedirection_vue:", pagesRedirection);
console.log("pages_url_vue:", pages_url);

if (pagesRedirection == 'Y') {
    location.href = pages_url + pages_urlName
}

