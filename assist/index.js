//當整份文字中的標籤元素ready好(讀取完畢)
//$(Document).ready();
//如果JS程式放在最下方</body>之前, 那麼上方這個事件可以不寫
//可省略的寫法 $();
$(function(){

    $('#sec3 .tab-pane .col-12').hover(
      function () {
        //滑入==>自己套用scale-b==>其他兄弟套用scale-s
        //方法2: 所有的.col-12套用scale-s==>自己移除scale-s再套用scale-b
        $(this).addClass('scale-b');
        $(this).siblings().addClass('scale-s');
      },
      function () {
        //滑出==>所有相關位置, 相關縮放的class皆移除
        $('#sec3 .tab-pane .col-12').removeClass('scale-b').removeClass('scale-s');
      }
    );

    $('#sec3 .tab-pane .col-12').click(function () {
      //取得資訊
      var setname = $(this).parent().attr('data-set');
      var prodname = $(this).children('span').text();
      var desc = $(this).children('.desc').html();
      var imgb = $(this).children('img').attr('data-img-b');

      // console.log(setname);
      // console.log(prodname);
      // console.log(desc);
      // console.log(imgb);

      //放到Modal中的指定
      $('#showProdInfo .modal-header h2').text(setname);
      $('#showProdInfo .modal-body h3').text(prodname);
      $('#showProdInfo .modal-body .desc').html(desc);
      $('#showProdInfo .modal-body .prod-b').attr('src', './img/' + imgb);
    });



    //導覽列桌機版的效果：判斷header是否已滑出
    //(1)判斷是不是桌機版
    //(2)判斷整份文件html/document滑出的距離是否大於header的高度
    //(3)讓header加上有動畫的class名稱並且設定成fixed
    //(4)是不是要移除？什麼時候要移除class名稱？
    //   當畫面停在整頁最上方, header 移除class回到absolute
    function chkHeader_d() {
      if ($('.navbar-toggler').is(':hidden')) {
        if ($(document).scrollTop() > $('header').innerHeight()) {
          $('header').addClass('fixed');
        }
        if ($(document).scrollTop() == 0) {
          $('header').removeClass('fixed');
        }
      }
    }

    chkHeader_d();

    $(window).scroll(function () {
      chkHeader_d();
    });



    //導覽列手機版時, 點選按鈕(會滑動頁面)後關閉導覽列選單區域
    //(1)判斷是不是手機版
    //(2)當按鈕click時(這是事件的註冊)
    //(3)關閉導覽列選單區域？

    var isnavclick = false;  //是否已註冊
    var isoffclick = false;  //是否已註冊

    function chkHeader_m() {
      if ($('.navbar-toggler').is(':visible')) {

        if (!isnavclick) {
          $('.navbar-dark .navbar-nav .nav-link').click(function () {
            $('.navbar-collapse').removeClass('show');
            console.log('nav-----click');
          });
          isnavclick = true;
        }

        if (!isoffclick) {
          $('.offcanvas .navbar-nav .nav-link').click(function () {
            /*
            $('.offcanvas').removeClass('show');
            $('.offcanvas-backdrop').remove();
            $('.offcanvas').removeAttr('role');
            $('.offcanvas').removeAttr('style');
            以上沒有全部改到, 無法解決
            */

            setTimeout(function () {
              $('.showoffcanvas').trigger('click');
            }, 400);

            //$('.offcanvas-header .btn-close').trigger('click');

            console.log('offcanvas-----click');
          });
          isoffclick = true;
        }
      }
    }

    chkHeader_m();  //呼叫function執行一次

    //當視窗調整大小時...
    $(window).resize(function () {
      console.log('resize');
      chkHeader_m();
    });

});
