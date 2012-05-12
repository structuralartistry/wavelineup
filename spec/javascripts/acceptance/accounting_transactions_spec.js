describe('accounting transactions', function() {

  beforeEach(function() {
    setFixtures("<div id='container'>Loading...</div>");
    expect($('#container')).toHaveText('Loading...');

    this.server = sinon.fakeServer.create();

    this.accounting_transaction = fixtures.accounting_transactions.one;

    this.server.respondWith("GET", "/api/accounting_transactions",
                                    [200, { "Content-Type": "application/json" },
                                    JSON.stringify(this.accounting_transaction)]);

    // set data that loads on app load via the main rails index
    Wavelineup.set_base_data = function() {
      Wavelineup.instance.collections.option_selectors = new Wavelineup.Collections.OptionSelectors();
      Wavelineup.instance.collections.option_selectors.reset(fixtures.option_selectors);

      Wavelineup.instance.collections.option_selector_options = new Wavelineup.Collections.OptionSelectorOptions();
      Wavelineup.instance.collections.option_selector_options.reset(fixtures.option_selector_options);
    }

    // turn off the router
    if( (typeof Backbone.history == 'object') && (typeof Backbone.history.stop == 'function') ) Backbone.history.stop();

    Wavelineup.init();

    Wavelineup.instance.routers.main.navigate('accounting_transactions', true);
    current_url = Backbone.history.getHash();
    expect(current_url).toEqual('accounting_transactions')

    this.server.respond();
  }),


  afterEach(function() {
    this.server.restore();
    setFixtures('');
    if(typeof jQuery.ajax.restore == 'function') jQuery.ajax.restore();
  }),


  it('loads the index page with correct content', function() {
    expect($('#content h1')).toHaveText('Hello World Index View from Backbone!!!');

    expect($('.new_accounting_transaction.expense')).toExist();
    expect($('.new_accounting_transaction.income')).toExist();

    expect($('#' + this.accounting_transaction.id)).toExist();
  }),

  it('shows new Expense transaction modal if New Expense is clicked', function () {
    $('.new_accounting_transaction.expense').mousedown();

    expect($('#accounting_transaction_new_edit')).toBeVisible();

    current_url = Backbone.history.getHash();
    expect(current_url).toEqual('accounting_transactions/new/expense')

    // the Category selector
    expect($('#category_key.option_selector.target').data('option_selector_name')).toEqual('accounting_category_expense');
  }),

  it('shows new Income transaction modal if New Income is clicked', function () {
    $('.new_accounting_transaction.income').mousedown();

    expect($('#accounting_transaction_new_edit')).toBeVisible();

    current_url = Backbone.history.getHash();
    expect(current_url).toEqual('accounting_transactions/new/income')

    // the Category selector
    expect($('#category_key.option_selector.target').data('option_selector_name')).toEqual('accounting_category_income');
  }),

  it('creates a new Accounting Transaction', function() {
    new_accounting_transaction = fixtures.accounting_transactions.two;
    expect($('#accounting_transaction_' + new_accounting_transaction.id)).not.toExist();

    $('.new_accounting_transaction.expense').mousedown();

    // shows new form and index hidden
    expect($('ul#accounting_transaction_new_edit')).toBeVisible();

    // under modal layer
    expect($('#accounting_transactions #' + this.accounting_transaction.id)).toExist();

    // modal layer
    expect($('input#date_time')).toBeVisible();
    expect($('input#amount')).toBeVisible();
    expect($('#category_key.option_selector.target')).toBeVisible();
    expect($('#account_key.option_selector.target')).toBeVisible();
    expect($('input#note')).toBeVisible();

    // set standard form values (these will go away as implement selectors)
    $('input#date_time').val(new_accounting_transaction.date_time);
    $('input#amount').val(new_accounting_transaction.amount);
    $('input#note').val(new_accounting_transaction.note);

    // selector fields

    // category
    expect($('#option_selector_container')).not.toExist();
    expect($('#category_key.option_selector.target').html()).toEqual('');

    $('#category_key.option_selector.target').mousedown();
    expect($('#option_selector_container')).toBeVisible();

    $('#option_selector_container .option_selector.option:contains(Office Supplies)').mousedown()
    expect($('#category_key.option_selector.target').html()).toEqual('Office Supplies');

    category_expected_key = Wavelineup.instance.collections.option_selector_options.get_key_by_value('accounting_category_expense','Office Supplies');
    expect($('#category_key.option_selector.target').data('set_key')==category_expected_key).toBeTruthy();

    // account
    expect($('#option_selector_container')).not.toExist();
    expect($('#account_key.option_selector.target').html()).toEqual('');

    $('#account_key.option_selector.target').mousedown();
    expect($('#option_selector_container')).toBeVisible();

    $('#option_selector_container .option_selector.option:contains(Business Checking)').mousedown()
    expect($('#account_key.option_selector.target').html()).toEqual('Business Checking');

    account_expected_key = Wavelineup.instance.collections.option_selector_options.get_key_by_value('accounting_account','Business Checking');
    expect($('#account_key.option_selector.target').data('set_key')==account_expected_key).toBeTruthy();


    created_accounting_transaction = fixtures.accounting_transactions.two;
    this.server.respondWith("POST", "/api/accounting_transactions",
                                    [201, { "Content-Type": "application/json" },
                                    JSON.stringify(created_accounting_transaction)]);

    sinon.spy(jQuery, 'ajax');
    $('input.save').mousedown();

    // sends request to server
    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);

    expect(result['account_key']).toEqual(account_expected_key);
    expect(result['amount']).toEqual('2.22');
    expect(result['category_key']).toEqual(category_expected_key);
    expect(result['income_expense']).toEqual('expense');
    expect(result['date_time']).toEqual('2012-02-22T22:22:22Z');
    expect(result['note']).toEqual('accounting transaction two');

    // updates list
    this.server.respond();

    // index view should be visible with newly created transaction
    expect($('#notices').html()).toEqual('Accounting Transaction accepted by server!');

    expect($('#accounting_transactions #' + this.accounting_transaction.id)).toExist();

    expect($('#accounting_transactions #' + created_accounting_transaction.id)).toExist();

    expect($('#date_time')).not.toBeVisible();
    expect($('#income_expense')).not.toBeVisible();
    expect($('#amount')).not.toBeVisible();
    expect($('#category_key')).not.toBeVisible();
    expect($('#account_key')).not.toBeVisible();
    expect($('#note')).not.toBeVisible();

    // verify that when accessed the new form again it is cleared
    $('.new_accounting_transaction.expense').mousedown();
    //expect($('#date_time').val()).toEqual('');
    expect($('#amount').val()).toEqual('');
    expect($('#category_key').val()).toEqual('');
    expect($('#account_key').val()).toEqual('');
    expect($('#note').val()).toEqual('');

  }),

  it('can edit and delete an existing accounting transaction', function() {
    updated_note_value = 'this is an updated note';

    accounting_transaction_id = this.accounting_transaction.id

    // verify existing accounting transaction row
    expect($('#accounting_transactions #' + this.accounting_transaction.id)).toExist();

    expect($('#accounting_transaction__note__' + accounting_transaction_id).val()).not.toEqual(updated_note_value);

    // edit the transaction
    $('#accounting_transactions #' + this.accounting_transaction.id + ' .edit').mousedown();

    // verify initial form values
    expect($('input#date_time').val()).toEqual(this.accounting_transaction.date_time);

    expect($('#income_expense').html()).toEqual('expense');
    expect($('input#amount').val()).toEqual(this.accounting_transaction.amount.toString());
    expect($('#category_key.option_selector.target').html()).toEqual('Advertising');
    account_expected_value = Wavelineup.instance.collections.option_selector_options.get_value_by_key('accounting_account',this.accounting_transaction.account_key);
    expect($('#account_key.option_selector.target').html()).toEqual(account_expected_value);
    expect($('input#note').val()).toEqual(this.accounting_transaction.note);

    // update fields
    $('input#note').val(updated_note_value);

    $('#category_key.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Office Supplies)').mousedown()

    $('#account_key.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Business Checking)').mousedown()

    // submit and verify data sent to server
    this.server.respondWith("PUT", "/api/accounting_transactions/" + this.accounting_transaction.id,
                                    [204, { "Content-Type": "application/json" },
                                     '{}']);
    sinon.spy(jQuery, 'ajax');

    $('.save').mousedown();

    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    expect(result.note).toEqual(updated_note_value);

    this.server.respond();

    // verify field shows value
    expect($('#accounting_transactions').find('td:contains(' + updated_note_value + ')')).toExist();
    expect($('#accounting_transactions').find('td:contains(expense)')).toExist();
    expect($('#accounting_transactions').find('td:contains(Office Supplies)')).toExist();
    expect($('#accounting_transactions').find('td:contains(Business Checking)')).toExist();
    expect($('#notices').html()).toEqual('Accounting Transaction updated by server!');


    // delete the transaction
    expect($('#accounting_transactions #' + this.accounting_transaction.id)).toExist();

    // go to edit screen
    $('#accounting_transactions #' + this.accounting_transaction.id + ' .edit').mousedown();

    // can delete the transaction
    this.server.respondWith("DELETE", "/api/accounting_transactions/" + this.accounting_transaction.id,
                                    [204, { "Content-Type": "application/json" },
                                     '{}']);
    $('.delete').mousedown();

    this.server.respond();

    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    expect(result.id).toEqual(this.accounting_transaction.id);

    expect($('#accounting_transactions #' + this.accounting_transaction_id)).not.toExist();

    expect($('#notices').html()).toEqual('Accounting Transaction deleted by server!');
  }),

  it('should handle error responses', function() {
    // send an empty create which will cause validation errors
    this.server.respondWith("POST", "/api/accounting_transactions",
                                    [422, { "Content-Type": "application/json" },
                                     fixtures.accounting_transactions.errors]);
    sinon.spy(jQuery, 'ajax');

    // new accounting transaction form
    $('.new_accounting_transaction.expense').mousedown();

    // attempt to save empty form
    $('input.save').mousedown();

    // sends request to server
    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    expect(result.note).toEqual('');

    // updates list
    this.server.respond();
    errors = JSON.parse(fixtures.accounting_transactions.errors);
    for (attribute in errors) {
      messages = errors[attribute];
      for (_i = 0, _len = messages.length; _i < _len; _i++) {
        message = messages[_i];
        expect($('#notices:contains(' + value + ')')).toExist();
      }
    }
  })

//  describe('direct routing', function() {

  it('successfully routes to the new form', function() {
    Wavelineup.instance.routers.main.navigate('accounting_transactions/new/expense', true);

    expect($('ul#accounting_transaction_new_edit')).toBeVisible();

    // this is on the layer under the modal layer
    expect($('#accounting_transactions #' + this.accounting_transaction.id)).toExist();

    // modal layer
    expect($('input#date_time')).toBeVisible();
    expect($('input#amount')).toBeVisible();
    expect($('#category_key.option_selector.target')).toBeVisible();
    expect($('#account_key.option_selector.target')).toBeVisible();
    expect($('input#note')).toBeVisible();
  }),

  it('successfully routes to the edit form', function() {
    Wavelineup.instance.routers.main.navigate('accounting_transactions/' + this.accounting_transaction.id, true);

    expect($('ul#accounting_transaction_new_edit')).toBeVisible();
  }),

  it('successfully handles non-existant edit or slow loading collection temporary loading message', function() {
    // come in on new instance of app
    Backbone.history.stop();
    Wavelineup.init();
    Wavelineup.instance.routers.main.navigate('accounting_transactions/' + this.accounting_transaction.id, true);
    // note: no loading of collection via server.respond()
    expect($('#modal_content :contains(requested record does not exist or could not be loaded, or the current internet connection is slow)')).toExist();
  })

//  });

});


