var wrapUl = $('.wrapUl');
// Ul的宽高
var wrapW = parseInt(wrapUl.css('width'));
var wrapH = parseInt(wrapUl.css('height'));
// li:每单张照片的宽高
var liW = wrapW / 5;
var liH = wrapH / 5;

createDom();

function createDom() {
    // 行
    for (var i = 0; i < 5; i++) {
        // 列
        for (var j = 0; j < 5; j++) {
            $('<li><div class="box"><img src="" /></div></li>')
                .css({
                    'width': liW + "px",
                    'height': liH + "px",
                    'left': j * liW,
                    'top': i * liH,
                    'transform': 'scale(0.9) rotate(' + (Math.random() * 40 - 20) + 'deg)' + 'translateX(' + (30 * j - 60) + 'px)' + 'translateY(' + (30 * i - 60) + 'px)' + 'translateZ(-' + (Math.random() * 400) + 'px)'
                })
                .find('img').attr('src', './img/' + (5 * i + j) + '.JPG')
                .end()
                .appendTo(wrapUl);
        }
    }
    // 生成完结构后，点击进入小图功能
    bindEvent();
};

function bindEvent() {
    var change = true;
    $('li').on('click', function () {
        if (change) {
            // 小图 --> 大图
            var bgImg = $(this).find('img').attr('src');
            var bgLetf = 0,
                bgTop = 0;
            $('li').each(function (index) {
                var $this = $(this);
                $this.delay(10 * index).animate({
                    'opacity': 0
                }, 200, function () {
                    $this.css({
                        'transform': 'rotate(0deg)' +
                            'translateX(0px)' +
                            'translateY(0px)' +
                            'translateZ(0px)',
                    });
                    $this.find('.box').css({
                        'transform': 'scale(1)',
                    });
                    $this.find('img').attr('src', bgImg).css({
                        'position': 'absolute',
                        'width': wrapW + 'px',
                        'height': wrapH + 'px',
                        'left': -bgLetf,
                        'top': -bgTop
                    });
                    bgLetf += liW;
                    if (bgLetf >= wrapW) {
                        bgTop += liH;
                        bgLetf = 0;
                    }
                    $this.animate({
                        'opacity': 1
                    }, 200);
                })
            })
            change = false;
        } else {
            // 大图 --> 小图
            change = true;
            // index = i*5+j
            $('li').each(function (index) {
                j = index % 5;
                i = Math.floor(index / 5);
                var $this = $(this);
                $this.animate({
                    'opacity': 0
                }, 200, function () {
                    $this.find('img').css({
                        'position': 'absolute',
                        'width': '100%',
                        'height': '100%',
                        'left': 0,
                        'top': 0
                    })
                    .attr('src', './img/' + index + '.JPG');
                    $this.find('.box').css({
                        'transform': 'scale(0.9)',
                    });
                    $this.css({
                        'width': liW + "px",
                        'height': liH + "px",
                        'transform': 'scale(0.9) rotate(' + (Math.random() * 40 - 20) + 'deg)' + 'translateX(' + (30 * j - 60) + 'px)' + 'translateY(' + (30 * i - 60) + 'px)' + 'translateZ(-' + (Math.random() * 400) + 'px)'
                    });
                    $this.animate({
                        'opacity': 1
                    }, 200);
                })
            })
        }
    })
}