/* eslint-disable */
moment.locale('en-us');

//滚动header添加阴影
var $headerOfPage = $('.header-of-page');
$(window).scroll(function () {
  var top = $(window).scrollTop();
  if (top >= 1) {
    $headerOfPage.css({ boxShadow: 'rgb(220, 220, 220) 0 2px 10px' });
  } else {
    $headerOfPage.css({ boxShadow: 'none' });
  }
});

// 分类下拉
$('.cate-name').click(function () {
  var cateName = $(this).text();
  $('.select-menu').hide();
  var $val = $(this).parents('.select-menu').siblings('.selected-box').find('.selected-val');
  $val.text(cateName);
  if ($(this).attr('data-filter')) {
    var filter = $(this).attr('data-filter');
    $val.attr('data-filter', filter);
  }
});

//下拉框显示隐藏
function showbox(ul) {
  if (ul.css('display') === 'none') {
    $('.select-menu').hide();
    ul.show();
  } else {
    ul.hide();
  }
}

$('body').click(function (e) {
  $('.select-menu').hide();
  e.stopPropagation();
});

// 选择分类
$('.cate-select').click(function (e) {
  var $selectMenu = $(this).siblings('.select-menu');
  showbox($selectMenu);
  e.stopPropagation();
});

//类型选择
$('.filter-select').click(function (e) {
  var $selectMenu = $(this).siblings('.select-menu');
  showbox($selectMenu);
  e.stopPropagation();
});

//    搜索
if (localStorage.search) {
  searchArr = localStorage.search.split(',');
} else {
  searchArr = [];
}

$('.toSearch').click(function () {
  Search();
});

function onKeyPress(e) {
  var keyCode = null;
  if (e.which) {
    keyCode = e.which;
  } else if (e.keyCode) {
    keyCode = e.keyCode;
  }
  if (keyCode === 13) {
    Search();
    return false;
  }
  return true;
}

function Search() {
  var keyword = $('.search .text').val().trim();
  if (!keyword) {
    showMessage('Search query cannot be empty.');
    return;
  }
  if (keyword) {
    KillRepeat(keyword);
    localStorage.search = searchArr;
  }
  window.location.href = '/community/search/post/?q=' + keyword;
}

//去重
function KillRepeat(val, arr) {
  for (var i = 0; i < searchArr.length; i++) {
    if (val === searchArr[i]) {
      searchArr.splice(i, 1);
    }
  }
  searchArr.unshift(val);
}

// 右侧跟随
var recommendFlex = $('.right-fixed');
var winWidth = $(window).width();
function controlFlex() {
  var height = recommendFlex.height();
  var scroll = $(window).scrollTop();
  var leftHeight = $('.win').height();
  if (height + 400 < scroll) {
    recommendFlex.addClass('flex');
    if (scroll > leftHeight - 400) {
      recommendFlex.removeClass('flex');
    }
  } else {
    recommendFlex.removeClass('flex');
  }
}

if (winWidth > 999) {
  $(window).scroll(function () {
    controlFlex();
  });
  $(window).resize(function () {
    controlFlex();
  });
}

/*
 *验证演示链接
 * */
var $prototypeURL = $('.prototype-url');
var isOk = true;
function checkURL() {
  var reg = /^https:\/\/app.mockplus.com\/run\//;
  var reg1 = /^http:\/\/run.mockplus.com\//;
  var prototypeURL = $prototypeURL.val().trim();
  if (prototypeURL.length > 0) {
    if (reg.test(prototypeURL) || reg1.test(prototypeURL)) {
      isOk = true;
    } else {
      showMessage('Please enter a valid URL.');
      isOk = false;
    }
  }
}

$prototypeURL.blur(function () {
  checkURL();
});

/*
 * 上传文件
 * */
var filesArr = [];
var $file = $('#addFile');
var $lists = $('.files');
function uploadAttachment(e) {
  var theFile = {};
  var fileVal = $('.choose-file').val();
  var file = e.target.files[0];
  var fileType = e.target.value.substring(e.target.value.lastIndexOf('.'));
  if (!fileType.match(/.zip|.mp|.pdf/i)) {
    showMessage('Only mp, rar and pdf format files are supported here.');
    return;
  }
  if (fileVal) {
    theFile.name = file.name;
    var $fileList =
      "<li><i class='iconfont icon_icon_delete remove'></i><span class='filename'>" + file.name + '</span></li>';
    $lists.append($fileList).show();
  } else {
    $lists.empty().hide();
  }
  var formData = new FormData();
  formData.append('file', file);
  $.ajax({
    url: '/api/community/uploadFile',
    type: 'POST',
    processData: false,
    contentType: false,
    data: formData,
    success: function (res) {
      if (res.code === 0) {
        theFile.url = res.payload.url;
        filesArr.push(theFile);
      }
    },
    error: function (err) {
      showMessage(err);
    },
  });
}

$file.change(function (e) {
  uploadAttachment(e);
});

/*
 * 删除已上传文件
 * */
$lists.on('click', '.remove', function () {
  var name = $(this).parents('li').find('.filename').text();
  $(this).parents('li').hide();
  for (var j = 0; j < filesArr.length; j++) {
    if (filesArr[j].name === name) {
      filesArr.splice(j, 1);
    }
  }
});

/*
 * 添加帖子
 * */
var $title = $('#title');
$('#addPost').click(function () {
  var title = $title.val().trim();
  var type = $('#filter').attr('data-filter');
  var category = $('#category').text();
  var content = $contents.froalaEditor('html.get', true);
  var prototypeURL = $prototypeURL.val().trim();
  var attachmentArr = filesArr;
  if (!title) {
    isOk = false;
    showMessage('Please enter a title.');
    $title.css({ borderColor: '#fe4066' });
    return;
  } else {
    isOk = true;
    $title.css({ borderColor: '#ebedee' });
  }

  if (!content) {
    isOk = false;
    showMessage('Please enter your content.');
    return;
  }

  if (prototypeURL) {
    checkURL();
  }

  if (!attachmentArr) {
    attachmentArr = [];
  }

  if (isOk) {
    $.post(
      '/api/community/post/add',
      {
        title: title,
        type: type,
        category: category,
        content: content,
        prototypeURL: prototypeURL,
        attachmentArr: attachmentArr,
      },
      function (res) {
        if (res.code === 0) {
          window.location.href = '/community/thread/' + res.payload.id;
        } else {
          showMessage(res.message);
        }
      },
    );
  }
});

/*
 * 点赞（列表内点赞按钮）
 * */
var $liked = $('.tolike');
$liked.click(function () {
  var arr = $(this).text().split(' ');
  var count = arr[1];
  count = parseInt(count);
  var postID = $(this).data('id');
  if ($(this).hasClass('liked')) {
    $(this).removeClass('liked');
    count = parseInt(count);
    count--;
    $(this).html('<i class="iconfont icon_icon_like"></i>' + ' ' + count);
  } else {
    $(this).addClass('liked');
    count++;
    $(this).html('<i class="iconfont icon_icon_like"></i>' + ' ' + count);
  }
  $.post(
    '/api/community/liked',
    {
      threadID: postID,
    },
    function (res) {
      if (res.code !== 0) {
        showMessage(res.message);
      }
    },
  );
});

/*
 * 消息盒子
 * */
var $bell = $('.message');
var $infoList = $('.info-list');
var $messagePop = $('.message-pops');
var noMes = "<li class='noMes' id='noMesNode'><p>No new notification</p></li>";
function showMesLimit() {
  var winWidth = $(window).width();
  if (winWidth > 999) {
    $bell.addClass('show-mes-pop');
    $bell.removeClass('toMorepage');
  } else {
    $bell.removeClass('show-mes-pop');
    $bell.addClass('toMorepage');
  }
}
showMesLimit();

$(window).resize(function () {
  showMesLimit();
});

//点击空白关闭弹窗
$('body').click(function (e) {
  $messagePop.hide();
  e.stopPropagation();
});

$messagePop.click(function (e) {
  $messagePop.show();
  e.stopPropagation();
});

$('.toMorepage').click(function () {
  window.location.href = 'community/message';
});

//获取消息数量
var $unRead = $('.mes-count');
var mesCount = 0;
function mesCounts() {
  $.get('/api/community/unReadMessageCount', function (res) {
    if (res.code === 0) {
      mesCount = res.payload;
      if (mesCount > 0 && mesCount <= 99) {
        $unRead.show();
        $unRead.text(mesCount);
      } else if (mesCount > 99) {
        $unRead.show();
        $unRead.text('99+');
      } else {
        $unRead.hide();
      }
    } else {
      $unRead.hide();
    }
  });
}
mesCounts();

//显示消息弹窗
var $showMesPop = $('.show-mes-pop');
var $userMenus = $('.user-menu');
$showMesPop.click(function (e) {
  if ($userMenus.css('display') === 'block') {
    $userMenus.hide();
  }

  if ($messagePop.css('display') === 'none') {
    $messagePop.show();
  } else {
    $messagePop.hide();
  }
  e.stopPropagation();

  var noLi = $('.info-list > li');
  if (noLi.length === 0) {
    $infoList.append(noMes);
    $('#markAll').css('pointerEvents', 'none');
  } else {
    // var noMesNodes = document.getElementById('noMesNode');
    // if(noMesNodes) {
    //   noMesNodes.parentNode.removeChild(noMesNodes);
    // }
  }
});

$.get('/api/community/someMessage', function (res) {
  if (res.code === 0) {
    var mesLi = res.payload;
    for (var i = 0; i < mesLi.length; i++) {
      var li =
        "<li><a class='info-url' href='" +
        mesLi[i].URL +
        "' data-id='" +
        mesLi[i].id +
        "'>" +
        mesLi[i].content +
        '</a>' +
        '<span>' +
        moment(mesLi[i].createdAt).fromNow() +
        '</span>' +
        "<i class='iconfont icon_check_tick markIt' id='" +
        mesLi[i].id +
        "'></i>" +
        '</li>';
      $infoList.append(li);
    }
  }
});

//	标记为已读
$infoList.on('click', '.markIt', function () {
  var messageID = $(this).attr('id');
  var $read = $(this).parent();
  var noLi = $('.info-list > li');
  $.ajax({
    url: '/api/community/changeReadFlag/' + messageID,
    type: 'PATCH',
    processData: false,
    contentType: false,
    data: messageID,
    success: function (res) {
      if (res.code === 0) {
        $read.remove();
        if (noLi.length === 1) {
          $infoList.append(noMes);
        }
      }
    },
    error: function (err) {
      showMessage(err);
    },
  });
});

$infoList.on('click', '.info-url', function () {
  var messageID = $(this).attr('data-id');
  $.ajax({
    url: '/api/community/changeReadFlag/' + messageID,
    type: 'PATCH',
    processData: false,
    contentType: false,
    data: messageID,
    success: function (res) {},
    error: function (err) {
      showMessage(err);
    },
  });
});

//全部标记为已读
$('#markAll').click(function () {
  $.ajax({
    url: '/api/community/changeAllRead/',
    type: 'PATCH',
    processData: false,
    contentType: false,
    success: function (res) {
      if (res.code === 0) {
        $('.info-list li').remove();
        $infoList.append(noMes);
        $('#markAll').css('pointerEvents', 'none');
        $unRead.hide();
      }
    },
    error: function (err) {
      showMessage(err);
    },
  });
});

//随机切换banner图
function bannerImg() {
  var num = Math.floor(Math.random() * 5) + 1;
  $('#noCover').attr('src', '/images/community-banner' + num + '.png');
}

//输入框限制
var $postsTitle = $('.post-title');
$postsTitle.bind('input propertychange', function () {
  var words = $('.post-title').val().length;
  if (words === 80) {
    $postsTitle.css({ borderColor: '#FE4066' });
  } else {
    $postsTitle.css({ borderColor: '#ebedee' });
  }
});
