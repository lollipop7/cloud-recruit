module.exports = (function(){
    let customLayer = function(){};
    customLayer.prototype.msg = function(txt='') {
        layer.msg(txt,{time:500});
    }
    return new customLayer();
})();