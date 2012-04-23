describe('option selector', function() {

  beforeEach(function() {
    setFixtures("<a id='option_selector_field_id' class='btn option_selector_target' data-option_selector_data_json='test_option_selector_data'></a><div id='option_selector_container'></div>");

    Wavelineup.instance = {data: {}};
  }),

  it('renders and shows as expected', function() {
    Wavelineup.instance.data['test_option_selector_data'] = {'values': ['Income', 'Expense', 'Other']};

    // renders and shows in the option selector container
    expect($('#option_selector_container')).toExist();
    expect($('#option_selector_container')).not.toBeVisible();
    view = new Wavelineup.Views.OptionSelector($('#option_selector_field_id'));
    expect($('#option_selector_container')).toBeVisible();

    // contains the expected elements
    expect($('#option_selector_container').find('a:contains(Income)')).toExist();
    expect($('#option_selector_container').find('a:contains(Expense)')).toExist();
    expect($('#option_selector_container').find('a:contains(Other)')).toExist();


    // should not include any options as they are not set
      // include_blank
      expect($('#option_selector_container').find("[data-value='']")).not.toExist();
      // include_cancel
      expect($('#option_selector_container').find("[data-value='']")).not.toExist();
  }),

  it('includes a blank option if requested', function() {
    Wavelineup.instance.data['test_option_selector_data'] = {'values': ['Income', 'Expense', 'Other'], 'config': {'include_blank': true}};

    // renders and shows in the option selector container
    view = new Wavelineup.Views.OptionSelector($('#option_selector_field_id'));

    // verify include_blank
    expect($('#option_selector_container').find("[data-value='']")).toExist();
  }),

  it('includes a cancel option if requested', function() {
    expect($('#option_selector_container')).toExist();
    expect($('#option_selector_container')).not.toBeVisible();

    Wavelineup.instance.data['test_option_selector_data'] = {'values': ['Income', 'Expense', 'Other'], 'config': {'include_cancel': true}};

    // renders and shows in the option selector container
    view = new Wavelineup.Views.OptionSelector($('#option_selector_field_id'));

    // verify include_blank
    $cancel_button = $('#option_selector_container').find("[data-value='cancel']");
    expect($cancel_button).toExist();


    // click hides the selector and does not set the value
    $cancel_button.mousedown();
    expect($('#option_selector_container')).not.toBeVisible();
  })

});
