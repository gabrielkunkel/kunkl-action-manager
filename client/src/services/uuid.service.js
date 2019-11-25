// todo: switch to https://github.com/daniellmb/perfnow.js performance.now

function generateUUID() { // Public Domain/MIT
    var d = Date.now();
    var d2 = (performance && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;
        if(d > 0){
            // eslint-disable-next-line
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {
            // eslint-disable-next-line
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        // eslint-disable-next-line
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

export {
    generateUUID
}
