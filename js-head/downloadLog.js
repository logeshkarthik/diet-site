/* eslint-disable */

var $freeDownload = $('.freeDownload');

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
