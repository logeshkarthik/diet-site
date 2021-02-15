/* eslint-disable */

var $list1 = $('#phone-banner-list1 .list1');
var $list2 = $('#phone-banner-list1 .list2');
var $listHover = $('#phone-banner-list1 .hover');
var $picture = $('.phone-banner-list2 li');
var $lastList = $('.down-mock-phone-red .con-list li');
var $lastPicture = $('.down-mock-phone-red .picture-list li');
var $freeDownload = $('.freeDownload');

$list1.click(function () {
  if (!$(this).hasClass('active')) {
    $(this).addClass('active');
    $list2.removeClass('active');
    $listHover.css('left', '4px');
    $picture.removeClass('active');
    $picture.eq(0).addClass('active');
  }
});

$list2.click(function () {
  if (!$(this).hasClass('active')) {
    $(this).addClass('active');
    $list1.removeClass('active');
    $listHover.css('left', '50%');
    $picture.removeClass('active');
    $picture.eq(1).addClass('active');
  }
});

// 底部按钮切换
$lastList.click(function () {
  $lastList.removeClass('active');
  $(this).addClass('active');
  $lastPicture.removeClass('active');
  $lastPicture.eq($(this).index()).addClass('active');
});

// 按钮默认状态
var u = navigator.userAgent;
var isPhone = u.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i) !== null;
if (isPhone) {
  $listHover.addClass('on');
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    $list2.addClass('active');
    $list1.removeClass('active');
    $listHover.css('left', '50%');
    $picture.eq(1).addClass('active');
    $lastPicture.eq(1).addClass('active');
    $lastList.eq(1).addClass('active');
  } else if (u.indexOf('iPhone') > -1) {
    $list1.addClass('active');
    $list2.removeClass('active');
    $listHover.css('left', '4px');
    $picture.eq(0).addClass('active');
    $lastPicture.eq(0).addClass('active');
    $lastList.eq(0).addClass('active');
  }
} else {
  $listHover.addClass('on');
  var isMac = u.match(/macintosh|mac os x/i) !== null;
  if (isMac) {
    $list1.addClass('active');
    $list2.removeClass('active');
    $listHover.css('left', '4px');
    $picture.eq(0).addClass('active');
    $lastPicture.eq(0).addClass('active');
    $lastList.eq(0).addClass('active');
  } else {
    $list2.addClass('active');
    $list1.removeClass('active');
    $listHover.css('left', '50%');
    $picture.eq(1).addClass('active');
    $lastPicture.eq(1).addClass('active');
    $lastList.eq(1).addClass('active');
  }
}
$(function () {
  $listHover.addClass('time');
  $list1.addClass('time');
  $list2.addClass('time');

  function getCookie(name) {
    var arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if ((arr = document.cookie.match(reg))) {
      return unescape(arr[2]);
    } else {
      return null;
    }
  }

  $freeDownload.click(function () {
    var ua = window.navigator.userAgent.toLowerCase();
    var downloadURL = $(this).attr('href');
    $.post(
      '/download/addDownloadLog',
      {
        ua: ua,
        product: 'mockplus',
        downloadURL: downloadURL,
      },
      function (res) {
        console.log(res);
      },
    );
  });
});
