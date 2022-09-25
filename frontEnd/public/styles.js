function isInclude(name){
    var js= /js$/i.test(name);
    var es=document.getElementsByTagName(js?'script':'link');
    for(var i=0;i<es.length;i++) 
    if(es[i][js?'src':'href'].indexOf(name)!=-1)return true;
    return false;
}
console.log('style.js')
function switchColor  (color) {
    if(isInclude("styles.css")){
        if(domainConfig && domainConfig.themeColor){
            document.documentElement.style.setProperty("--main_bg",color);
        }
    }
}
switchColor('red')
document.getElementById('switchColorbtn').onclick(() => switchColor)