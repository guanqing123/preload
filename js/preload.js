// 图片预加载 使用闭包的形式来模拟局部作用域
(function ($) {

    function PreLoad(imgs, options) {
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({}, PreLoad.DEFAULTS, options);    // 用 options 覆盖 PreLoad.DEFAULTS 组成新的 对象 赋值给 opts

        this._unordered(); // 加下下划线的目的,表明这个方法只在这里调用,不再外部调用
    }
    PreLoad.DEFAULTS = {
        each : null, // 每一张图片加载完毕后执行
        all : null  // 所有图片加载完毕后执行
    };
    PreLoad.prototype._unordered = function () {   // 无序加载
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;

        $.each(imgs, function (i, src) {
            if (typeof src != 'string') return;

            var imgObj = new Image();

            $(imgObj).on('load error', function () {
                opts.each && opts.each(count);

                if (count >= len - 1){
                    opts.all && opts.all();
                }

                count++;
            });

            imgObj.src = src;
        });
    };

   $.extend({
       preload : function (imgs, opts) {
           new PreLoad(imgs, opts);
       }
   });

})(jQuery);
