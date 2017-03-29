/**
 * Created by Валерий on 25.03.2017.
 */

$( document ).ready(function() {
    $.datepicker.regional['ru'] = {
        closeText: 'Закрити',
        prevText: '&#x3c;Назад',
        nextText: 'Далі&#x3e;',
        currentText: 'Сьогодні',
        monthNames: ['Січень','Лютий','Березень','Квітень','Травень','Червень',
            'Липень','Серпень','Вересень','Жовтень','Листопад','Грудень'],
        monthNamesShort: ['Січ','Лют','Бер','Квіт','Трав','Черв',
            'Лип','Серп','Вер','Жовт','Лист','Груд'],
        dayNames: ['Неділя','Понеділок','Вівторок','Середа','Четвер','П`ятниця','Субота'],
        dayNamesShort: ['нд','пн','вт','ср','чт','пт','сб'],
        dayNamesMin: ['Нд','Пн','Вт','Ср','Чт','Пт','Сб'],
        dateFormat: 'dd.mm.yy',
        firstDay: 1,
        isRTL: false
    };

    $( ".calendar" ).datepicker($.datepicker.regional[ "ru" ]);
});