/**
 * Created by Валерий on 05.03.2017.
 */

var $settings = {}; // Глобальные настройки
var $servicesList = {  // Список доступных виджетов
    header: ['logo', 'topMenu'],
    content: ['text'],
    footer: ['copyright']
};

$( document ).ready(function() {

    // Показывает первую страницу
    $('#firstPage').show();

    // Переключатель страниц по кнопкам
    $('.showPage').on('click', function(){
        $('.switchPage').fadeOut(400);
        var page = $(this).data('show');
        $('#'+page).fadeIn(200);
    });

    // Показывает первую страницу при клике на логотип
    $('#logo').on('click', function(){
        $('.switchPage').fadeOut(400);
        $('#firstPage').fadeIn(200);
    });

    // Переключатель класса на странице выбора макета
    $('.service-box ').click(function () {
        $('.service-box').removeClass('active');
        $(this).addClass('active');
    });

    // Валидация названия проекта
    $('#projectName').on('input', function(){
        var text = $(this).val();
        if (text.replace(/\s/g,'').length>3) $('#secondPage button').attr('disabled', false);
        else $('#secondPage button').attr('disabled', true);
    });

    // Сохраняет имя проекта в глобальный конфиг
    $('#secondPage .showPage').on('click', function(){
        $settings.name = $('#projectName').val();
    });

    // Валидация выбора шаблона
    $('#services .service-box').on('click', function(){
        $('#servicesNextBtn').attr('disabled', false);
        $settings.layout = $(this).data('layout');
        $('.stuct-box>div').hide();
        $('.service-block').hide();
        $('#layout-'+$settings.layout).show();
    });

    // Отображение доступных виджетов при клике
    $('#configPage .stuct-box>div>div').on('click', function(){
        $('.service-block').hide();
        var block = $(this).attr('class');
        $servicesList[block].forEach(function(item) {
         $('#service-'+item).show(200);
        });
    });
});