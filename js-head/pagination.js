/* eslint-disable */

/**
 * 分页
 * */
function changeURLArg(url, arg, arg_val) {
  var pattern = arg + '=([^&]*)';
  var replaceText = arg + '=' + arg_val;
  if (url.match(pattern)) {
    var tmp = '/(' + arg + '=)([^&]*)/gi';
    tmp = url.replace(eval(tmp), replaceText);
    return tmp;
  } else {
    if (url.match('[?]')) {
      return url + '&' + replaceText;
    } else {
      return url + '?' + replaceText;
    }
  }
}

function removeURLAnchors(url) {
  if (url.indexOf('#') === -1) {
    return url;
  }
  return url.substring(0, url.indexOf('#'));
}

function pagination(pagerInfoDate) {
  var pagerInfo = JSON.parse(pagerInfoDate);
  $('#pagination').jqPaginator({
    totalPages: pagerInfo.totalPages || 1,
    currentPage: parseInt(pagerInfo.pageIndex, 10),
    visiblePages: 5,
    prev: '<li class="prev"><a href="javascript:void(0);" class="iconfont icon_Left"></a></li>',
    next: '<li class="next"><a href="javascript:void(0);" class="iconfont icon_Right"></a></li>',
    page: '<li class="page"><a href="javascript:void(0);">{{page}}</a></li>',
    onPageChange: function (num, type) {
      if (type === 'change') {
        var url = window.location.href;
        window.location.href = changeURLArg(removeURLAnchors(url), 'page', num);
      }
    },
  });
}
