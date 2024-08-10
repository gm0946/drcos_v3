$(document).ready(function() {
    if (getParamUrl('mode') == 'guest' && getParamUrl('returnUrl')) {
        $('.xans-member-login .login').addClass('displaynone');
        $('.xans-myshop-orderhistorynologin .login').removeClass('displaynone');
        $('.wp-login .menu li:eq(1)').addClass('selected');
        return;
    }

    $('.xans-member-login .login').removeClass('displaynone');
    $('.xans-myshop-orderhistorynologin .login').addClass('displaynone');
    $('.wp-login .menu li:eq(0)').addClass('selected');
});