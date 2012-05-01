describe('option selector', function() {

  beforeEach(function() {
    setFixtures("<a id='test_option_selector_target' class='btn option_selector_target' data-option_selector_name='test_option_selector' data-set_key='' data-set_value=''></a> \
                 <div id='option_selector_container'></div>");

    Wavelineup.instance = {collections: {}};

    Wavelineup.instance.collections.option_selectors = new Wavelineup.Collections.OptionSelectors();
    Wavelineup.instance.collections.option_selectors.reset([{"id":1,"name":"test_option_selector"}]);

    Wavelineup.instance.collections.option_selector_options = new Wavelineup.Collections.OptionSelectorOptions();
    Wavelineup.instance.collections.option_selector_options.reset([
      {"id":1,"key":"1","option_selector_id":1,"value":"Income"},
      {"id":2,"key":"2","option_selector_id":1,"value":"Expense"},
      {"id":3,"key":"blank","option_selector_id":1,"value":""},
      {"id":4,"key":"cancel","option_selector_id":1,"value":"Cancel"}
    ]);
  }),

  it('renders and shows as expected', function() {

    // renders and shows in the option selector container
    expect($('#option_selector_container')).toExist();
    expect($('#option_selector_container')).not.toBeVisible();
    view = new Wavelineup.Views.OptionSelector($('#test_option_selector_target'));
    expect($('#option_selector_container')).toBeVisible();

    // contains the expected elements
    expect($('#option_selector_container').find('a:contains(Income)')).toExist();
    expect($('#option_selector_container').find('a:contains(Expense)')).toExist();
    expect($('#option_selector_container').find("[data-key='blank']")).toExist();
    expect($('#option_selector_container').find('a:contains(Cancel)')).toExist();

  }),

  it('selected option with the key of cancel maintaines the current set value', function() {
    expect($('#option_selector_container')).toExist();
    expect($('#option_selector_container')).not.toBeVisible();

    // set a current value
    var existing_value = 'an existing value';
    $('#test_option_selector_target').html(existing_value)

    // renders and shows in the option selector container
    view = new Wavelineup.Views.OptionSelector($('#test_option_selector_target'));

    $cancel_button = $('#option_selector_container').find("[data-key='cancel']");
    expect($cancel_button).toExist();


    // click hides the selector and does not set the value
    $cancel_button.mousedown();
    expect($('#option_selector_container')).not.toBeVisible();
    expect($('#test_option_selector_target').html()).toEqual(existing_value);
  })

  /* forseen future needs
    * can edit/add/delete selector items
    * flag for allowing/diabling the edit/add/modify of seletor items
    * be able to perform a function/callback after set, i.e. on visit trigger special logic for show, save value to server
    * we may be able to merge OptionSelector and OptionSelectorOptions to single model if dont end up using custom config settings for the selector in the db...
    * be able to specify if value sent to server would be the key or the value of the option
  */
});
