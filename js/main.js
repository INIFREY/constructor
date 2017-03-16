/**
 * Created by Валерий on 05.03.2017.
 */

$( document ).ready(function() {

    $('#firstPage').show();

    $('.showPage').on('click', function(){
        $('.switchPage').fadeOut(400);
        var page = $(this).data('show');
        $('#'+page).fadeIn(200);
    });

    $('#logo').on('click', function(){
        $('.switchPage').fadeOut(400);
        $('#firstPage').fadeIn(200);
    });

    $('.service-box ').click(function () {
        $('.service-box').removeClass('active');
        $(this).addClass('active');
    });
});