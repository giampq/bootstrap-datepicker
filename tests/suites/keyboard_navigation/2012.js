module('Keyboard Navigation 2012', {
    setup: function(){
        /*
            Tests start with picker on March 31, 2012.  Fun facts:

            * February 1, 2012 was on a Wednesday
            * February 29, 2012 was on a Wednesday
            * March 1, 2012 was on a Thursday
            * March 31, 2012 was on a Saturday
        */
        this.input = $('<input type="text" value="31-03-2012">')
                        .appendTo('#qunit-fixture')
                        .datepicker({format: "dd-mm-yyyy"})
                        .focus(); // Activate for visibility checks
        this.dp = this.input.data('datepicker')
        this.picker = this.dp.picker;
    },
    teardown: function(){
        this.picker.remove();
    }
});


test('by day (right/left arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 day, left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37
    });
    // Both updated on keyboard navigation
    deepEqual(this.dp.viewDate, new Date(2012, 2, 30),
              'Expected: '+format_date(new Date(2012, 2, 30))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 2, 30),
              'Expected: '+format_date(new Date(2012, 2, 30))+'; Got: '+format_date(this.dp.date));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: +1 day, right arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 39
        });
    deepEqual(this.dp.viewDate, new Date(2012, 3, 1),
              'Expected: '+format_date(new Date(2012, 3, 1))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 3, 1),
              'Expected: '+format_date(new Date(2012, 3, 1))+'; Got: '+format_date(this.dp.date));
    // Month changed: April 1 (this is not a joke!)
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'April 2012', 'Title is "April 2012"');
});

test('by week (up/down arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 week, up arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 38
    });
    // Both updated on keyboard navigation
    deepEqual(this.dp.viewDate, new Date(2012, 2, 24),
              'Expected: '+format_date(new Date(2012, 2, 24))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 2, 24),
              'Expected: '+format_date(new Date(2012, 2, 24))+'; Got: '+format_date(this.dp.date));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: +1 week, down arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 40
        });
    deepEqual(this.dp.viewDate, new Date(2012, 3, 7),
              'Expected: '+format_date(new Date(2012, 3, 7))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 3, 7),
              'Expected: '+format_date(new Date(2012, 3, 7))+'; Got: '+format_date(this.dp.date));
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'April 2012', 'Title is "April 2012"');
});

test('by month, v1 (shift + left/right arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 month, shift + left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37,
        shiftKey: true
    });
    // Both updated on keyboard navigation, w/ graceful date ends
    deepEqual(this.dp.viewDate, new Date(2012, 1, 29),
              'Expected: '+format_date(new Date(2012, 1, 29))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 1, 29),
              'Expected: '+format_date(new Date(2012, 1, 29))+'; Got: '+format_date(this.dp.date));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'February 2012', 'Title is "February 2012"');

    // Navigation: +1 month, shift + right arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 39,
            shiftKey: true
        });
    deepEqual(this.dp.viewDate, new Date(2012, 3, 29),
              'Expected: '+format_date(new Date(2012, 3, 29))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 3, 29),
              'Expected: '+format_date(new Date(2012, 3, 29))+'; Got: '+format_date(this.dp.date));
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'April 2012', 'Title is "April 2012"');
});

test('by month, v2 (shift + up/down arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 month, shift + up arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 38,
        shiftKey: true
    });
    // Both updated on keyboard navigation, w/ graceful date ends
    deepEqual(this.dp.viewDate, new Date(2012, 1, 29),
              'Expected: '+format_date(new Date(2012, 1, 29))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 1, 29),
              'Expected: '+format_date(new Date(2012, 1, 29))+'; Got: '+format_date(this.dp.date));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'February 2012', 'Title is "February 2012"');

    // Navigation: +1 month, shift + down arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 40,
            shiftKey: true
        });
    deepEqual(this.dp.viewDate, new Date(2012, 3, 29),
              'Expected: '+format_date(new Date(2012, 3, 29))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 3, 29),
              'Expected: '+format_date(new Date(2012, 3, 29))+'; Got: '+format_date(this.dp.date));
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'April 2012', 'Title is "April 2012"');
});

test('by year, v1 (ctrl + left/right arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 year, ctrl + left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37,
        ctrlKey: true
    });
    // Both updated on keyboard navigation
    deepEqual(this.dp.viewDate, new Date(2011, 2, 31),
              'Expected: '+format_date(new Date(2011, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2011, 2, 31),
              'Expected: '+format_date(new Date(2011, 2, 31))+'; Got: '+format_date(this.dp.date));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2011', 'Title is "March 2011"');

    // Navigation: +1 year, ctrl + right arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 39,
            ctrlKey: true
        });
    deepEqual(this.dp.viewDate, new Date(2013, 2, 31),
              'Expected: '+format_date(new Date(2013, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2013, 2, 31),
              'Expected: '+format_date(new Date(2013, 2, 31))+'; Got: '+format_date(this.dp.date));
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2013', 'Title is "March 2013"');
});

test('by year, v2 (ctrl + up/down arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 year, ctrl + up arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 38,
        ctrlKey: true
    });
    // Both updated on keyboard navigation
    deepEqual(this.dp.viewDate, new Date(2011, 2, 31),
              'Expected: '+format_date(new Date(2011, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2011, 2, 31),
              'Expected: '+format_date(new Date(2011, 2, 31))+'; Got: '+format_date(this.dp.date));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2011', 'Title is "March 2011"');

    // Navigation: +1 year, ctrl + down arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 40,
            ctrlKey: true
        });
    deepEqual(this.dp.viewDate, new Date(2013, 2, 31),
              'Expected: '+format_date(new Date(2013, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2013, 2, 31),
              'Expected: '+format_date(new Date(2013, 2, 31))+'; Got: '+format_date(this.dp.date));
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2013', 'Title is "March 2013"');
});

test('by year, v3 (ctrl + shift + left/right arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 year, ctrl + left arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 37,
        ctrlKey: true,
        shiftKey: true
    });
    // Both updated on keyboard navigation
    deepEqual(this.dp.viewDate, new Date(2011, 2, 31),
              'Expected: '+format_date(new Date(2011, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2011, 2, 31),
              'Expected: '+format_date(new Date(2011, 2, 31))+'; Got: '+format_date(this.dp.date));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2011', 'Title is "March 2011"');

    // Navigation: +1 year, ctrl + right arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 39,
            ctrlKey: true,
            shiftKey: true
        });
    deepEqual(this.dp.viewDate, new Date(2013, 2, 31),
              'Expected: '+format_date(new Date(2013, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2013, 2, 31),
              'Expected: '+format_date(new Date(2013, 2, 31))+'; Got: '+format_date(this.dp.date));
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2013', 'Title is "March 2013"');
});

test('by year, v4 (ctrl + shift + up/down arrows)', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2012', 'Title is "March 2012"');

    // Navigation: -1 year, ctrl + up arrow key
    this.input.trigger({
        type: 'keydown',
        keyCode: 38,
        ctrlKey: true,
        shiftKey: true
    });
    // Both updated on keyboard navigation
    deepEqual(this.dp.viewDate, new Date(2011, 2, 31),
              'Expected: '+format_date(new Date(2011, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2011, 2, 31),
              'Expected: '+format_date(new Date(2011, 2, 31))+'; Got: '+format_date(this.dp.date));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2011', 'Title is "March 2011"');

    // Navigation: +1 year, ctrl + down arrow key
    for (var i=0; i<2; i++)
        this.input.trigger({
            type: 'keydown',
            keyCode: 40,
            ctrlKey: true,
            shiftKey: true
        });
    deepEqual(this.dp.viewDate, new Date(2013, 2, 31),
              'Expected: '+format_date(new Date(2013, 2, 31))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2013, 2, 31),
              'Expected: '+format_date(new Date(2013, 2, 31))+'; Got: '+format_date(this.dp.date));
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'March 2013', 'Title is "March 2013"');
});

test('by year, from leap day', function(){
    var target;

    equal(this.dp.viewMode, 0);
    target = this.picker.find('.datepicker-days thead th.switch');

    this.input.val('29-02-2012').datepicker('update');
    deepEqual(this.dp.viewDate, new Date(2012, 1, 29),
              'Expected: '+format_date(new Date(2012, 1, 29))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 1, 29),
              'Expected: '+format_date(new Date(2012, 1, 29))+'; Got: '+format_date(this.dp.date));
    equal(target.text(), 'February 2012', 'Title is "February 2012"');

    // Navigation: -1 year
    this.input.trigger({
        type: 'keydown',
        keyCode: 37,
        ctrlKey: true
    });
    // Both updated on keyboard navigation; graceful month-end
    deepEqual(this.dp.viewDate, new Date(2011, 1, 28),
              'Expected: '+format_date(new Date(2011, 1, 28))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2011, 1, 28),
              'Expected: '+format_date(new Date(2011, 1, 28))+'; Got: '+format_date(this.dp.date));
    // Month not changed
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'February 2011', 'Title is "February 2011"');

    // Navigation: +1 year, back to leap year
    this.input.trigger({
        type: 'keydown',
        keyCode: 39,
        ctrlKey: true
    });
    // Both updated on keyboard navigation; graceful month-end
    deepEqual(this.dp.viewDate, new Date(2012, 1, 28),
              'Expected: '+format_date(new Date(2012, 1, 28))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2012, 1, 28),
              'Expected: '+format_date(new Date(2012, 1, 28))+'; Got: '+format_date(this.dp.date));
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'February 2012', 'Title is "February 2012"');

    // Navigation: +1 year
    this.input.trigger({
        type: 'keydown',
        keyCode: 39,
        ctrlKey: true
    });
    // Both updated on keyboard navigation; graceful month-end
    deepEqual(this.dp.viewDate, new Date(2013, 1, 28),
              'Expected: '+format_date(new Date(2013, 1, 28))+'; Got: '+format_date(this.dp.viewDate));
    deepEqual(this.dp.date, new Date(2013, 1, 28),
              'Expected: '+format_date(new Date(2013, 1, 28))+'; Got: '+format_date(this.dp.date));
    target = this.picker.find('.datepicker-days thead th.switch');
    equal(target.text(), 'February 2013', 'Title is "February 2013"');
});
