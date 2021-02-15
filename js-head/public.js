/*eslint-disable*/

/**
 * 表单验证显示错误
 * */
function setErr(dom, message, errDom) {
  errDom.text(message).css({ opacity: 1 });
  dom.css({ borderColor: '#ec284d' });
}

/**
 * 表单验证清除错误
 * */
function clearErr(dom, errDom) {
  errDom.css({ opacity: 0 });
  dom.css({ borderColor: '#cccccc' });
}

/**
 * 视频弹出与消失
 * */
var myPlayer = $('.global-video-bullet-box #my-video');
$('.play-video').click(function () {
  $('.global-video-bullet-box').fadeIn(500);
  videojs('my-video').ready(function () {
    var myPlayer = this;
    myPlayer.play();
  });
  myPlayer.show();
  $('html').css({ height: '100%', overflow: 'hidden' });
});

$('.video-cancel').click(function () {
  $('.global-video-bullet-box').fadeOut(100);
  myPlayer.hide();
  myPlayer.load();
  $('html').css({ height: 'auto', overflow: 'auto' });
});

/**
 * 滚动固定表头
 * */
function fixedTable() {
  $(window).scroll(function () {
    var sTop = $(this).scrollTop();
    var tableTop = $('#table').offset().top;
    var tableHeight = $('#table').height();
    if (document.documentElement.clientWidth <= 843) {
      $('#thead').hide();
    } else {
      if (sTop >= tableTop && sTop < tableTop + tableHeight) {
        $('#thead').show();
      } else {
        $('#thead').hide();
      }
    }
  });
  $(window).resize(function () {
    if (document.documentElement.clientWidth <= 843) {
      $('#thead').hide();
    } else {
      $('#thead').hide();
    }
  });
  if (document.documentElement.clientWidth <= 843) {
    $('#thead').hide();
  }
  if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
    $('#thead').hide();
  }
}

//常见问题收放
var $question = $('.que-item');
$question.click(function () {
  if ($(this).hasClass('slide-down')) {
    $(this).removeClass('slide-down').find('.answer').slideUp();
    $(this).find('i').removeClass('icon_broad_pre-copy');
  } else {
    $(this).addClass('slide-down').find('.answer').slideDown();
    $(this).find('i').addClass('icon_broad_pre-copy');
  }
});

//常见问题内a标签阻止冒泡
$('.answer a').click(function (e) {
  e.stopPropagation();
});
