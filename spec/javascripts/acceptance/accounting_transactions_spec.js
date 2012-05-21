describe('accounting transactions', function() {

  beforeEach(function() {
    this.server = sinon.fakeServer.create();

    setFixtures("<div id='container'>Loading...</div>");
    expect($('#container')).toHaveText('Loading...');

    // set data that loads on app load via the main rails index
    Wavelineup.set_base_data = function() {
      Wavelineup.instance.collections.option_selectors = new Wavelineup.Collections.OptionSelectors();
      Wavelineup.instance.collections.option_selectors.reset(fixtures.option_selectors);

      Wavelineup.instance.collections.option_selector_options = new Wavelineup.Collections.OptionSelectorOptions();
      Wavelineup.instance.collections.option_selector_options.reset(fixtures.option_selector_options);

      Wavelineup.instance.collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();
      Wavelineup.instance.collections.accounting_transactions.reset(fixtures.accounting_transactions);
    }

    // turn off the router
    if( (typeof Backbone.history == 'object') && (typeof Backbone.history.stop == 'function') ) Backbone.history.stop();

    Wavelineup.init();

    Wavelineup.instance.routers.main.navigate('accounting_transactions', true);
    current_url = Backbone.history.getHash();
    expect(current_url).toEqual('accounting_transactions')

    // used as one of the existing accounting transactions, as an alias
    this.existing_accounting_transaction = Wavelineup.instance.collections.accounting_transactions.models[2].to_local_json();

    // used when needing to add an accounting transaction not already in existance
    this.new_accounting_transaction = {
      'accounting_account_id': 2,
      'amount':'2.22',
      'accounting_category_id': 2,
      'id':222,
      'note':'new accounting transaction',
      'date_time':'2012-02-22T22:22:22Z',
      'income_expense':'income' }
  }),

  afterEach(function() {
    this.server.restore();
    setFixtures('');
    if(typeof jQuery.ajax.restore == 'function') jQuery.ajax.restore();
  }),

  // index/list
  it('loads the index page with correct content', function() {
    expect($('.new_accounting_transaction.expense')).toExist();
    expect($('.new_accounting_transaction.income')).toExist();

    expect($('#accounting_transactions')).toBeVisible();
    expect(Wavelineup.instance.collections.accounting_transactions.length).toEqual(5);

    _.each(Wavelineup.instance.collections.accounting_transactions.models, function(accounting_transaction) {
      $accounting_transaction = $('.accounting_transaction.' + accounting_transaction.get('id'));

console.log($accounting_transaction);
      expect($accounting_transaction).toBeVisible();
      expect(($accounting_transaction).find('td:contains(' + accounting_transaction.get('accounting_category_value') + ')')).toBeVisible()
      expect(($accounting_transaction).find('td:contains(' + accounting_transaction.get('accounting_account_value') + ')')).toBeVisible()
    });
  }),

  it('shows Edit button and route if no invoice associated, Invoice button and route if invoice associated', function () {

    var accounting_transaction_with_invoice, accounting_transaction_no_invoice;

// is way to find >= or the like in collection?
    Wavelineup.instance.collections.accounting_transactions.each(function (accounting_transaction) {
      if(accounting_transaction.get('invoice_id') != null) {
        accounting_transaction_with_invoice = accounting_transaction;
      } else {
        accounting_transaction_no_invoice = accounting_transaction;
      }
    });

// use to be visible or to exist???
    expect($('.accounting_transaction.' + accounting_transaction_with_invoice.get('id') + ' .view_invoice')).toBeVisible();
    expect($('.accounting_transaction.' + accounting_transaction_with_invoice.get('id') + ' .edit')).not.toExist();


    expect($('.accounting_transaction.' + accounting_transaction_no_invoice.get('id') + ' .view_invoice')).not.toExist();
    expect($('.accounting_transaction.' + accounting_transaction_no_invoice.get('id') + ' .edit')).toBeVisible();
  }),

  it('navigates to the associated invoice when Invoice button is clicked', function () {
    var accounting_transaction_with_invoice;
    Wavelineup.instance.collections.accounting_transactions.each(function (accounting_transaction) {
      if(accounting_transaction.get('invoice_id') != null) accounting_transaction_with_invoice = accounting_transaction;
    });

    $('.accounting_transaction.' + accounting_transaction_with_invoice.get('id') + ' .view_invoice').mousedown();

    current_url = Backbone.history.getHash();
    expect(current_url).toEqual('invoices/' + accounting_transaction_with_invoice.get('invoice_id'));

    expect($('#content:contains(Viewing Invoice id ' + accounting_transaction_with_invoice.get('invoice_id') + ')')).toBeVisible();
  }),

  // child/modify
  it('shows and creates new Expense transaction modal if New Expense is clicked', function () {
    this.new_accounting_transaction.income_expense = 'expense';

    $('.new_accounting_transaction.expense').mousedown();

    expect($('#accounting_transaction_new_edit')).toBeVisible();

    current_url = Backbone.history.getHash();
    expect(current_url).toEqual('accounting_transactions/new/expense')

    // the Category selector is for expenses
    expect($('#accounting_category_id.option_selector.target').data('option_selector_name')).toEqual('accounting_category_expense');

    // set standard form values (these will go away as implement selectors)
    $('input#date_time').val(this.new_accounting_transaction.date_time);
    $('input#amount').val(this.new_accounting_transaction.amount);
    $('input#note').val(this.new_accounting_transaction.note);

    // selector fields

    // category
    $('#accounting_category_id.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Office Supplies)').mousedown()

    // account
    $('#accounting_account_id.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Business Checking)').mousedown()

    this.server.respondWith("POST", "/api/accounting_transactions",
                                    [201, { "Content-Type": "application/json" },
                                    JSON.stringify(this.new_accounting_transaction)]);

    sinon.spy(jQuery, 'ajax');
    $('input.save').mousedown();

    // sends request to server
    this.server.respond();
    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);

    // spot check... values are fudged so no need to verify all
    expect(result['income_expense']).toEqual('expense');

    // index view should be visible with newly created transaction
    expect($('#notices').html()).toEqual('Accounting Transaction accepted by server!');

    expect($('.accounting_transaction.' + this.new_accounting_transaction.id)).toExist();
    expect($('.accounting_transaction.' + this.new_accounting_transaction.id + ':contains(expense)')).toExist();
  }),

  it('shows and creates new Income transaction modal if New Income is clicked', function () {
    this.new_accounting_transaction.income_expense = 'income';

    $('.new_accounting_transaction.income').mousedown();

    expect($('#accounting_transaction_new_edit')).toBeVisible();

    current_url = Backbone.history.getHash();
    expect(current_url).toEqual('accounting_transactions/new/income')

    // the Category selector is for expenses
    expect($('#accounting_category_id.option_selector.target').data('option_selector_name')).toEqual('accounting_category_income');

    // set standard form values (these will go away as implement selectors)
    $('input#date_time').val(this.new_accounting_transaction.date_time);
    $('input#amount').val(this.new_accounting_transaction.amount);
    $('input#note').val(this.new_accounting_transaction.note);

    // selector fields

    // category
    $('#accounting_category_id.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Cash Payment)').mousedown()

    // account
    $('#accounting_account_id.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Business Checking)').mousedown()

    this.server.respondWith("POST", "/api/accounting_transactions",
                                    [201, { "Content-Type": "application/json" },
                                    JSON.stringify(this.new_accounting_transaction)]);

    sinon.spy(jQuery, 'ajax');
    $('input.save').mousedown();

    // sends request to server
    this.server.respond();
    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);

    // spot check... values are fudged so no need to verify all
    expect(result['income_expense']).toEqual('income');

    // index view should be visible with newly created transaction
    expect($('#notices').html()).toEqual('Accounting Transaction accepted by server!');

    expect($('.accounting_transaction.' + this.new_accounting_transaction.id)).toExist();
    expect($('.accounting_transaction.' + this.new_accounting_transaction.id + ':contains(income)')).toExist();
  }),

  it('can edit an existing accounting transaction', function() {
    var $existing_accounting_transaction, updated_note_value = 'this is an updated note';

    // verify existing accounting transaction row
    $existing_accounting_transaction = $('.accounting_transaction.' + this.existing_accounting_transaction.id);

    expect($existing_accounting_transaction).toExist();

    expect($existing_accounting_transaction.find('#note').val()).not.toEqual(updated_note_value);

    // edit the transaction
    $($existing_accounting_transaction.find('.edit')).mousedown();

    // verify initial form values
    expect($('input#date_time').val()).toEqual(this.existing_accounting_transaction.date_time);

    expect($('#income_expense').html()).toEqual('expense');
    expect($('input#amount').val()).toEqual(this.existing_accounting_transaction.amount.toString());
    expect($('#accounting_category_id.option_selector.target').html()).toEqual(this.existing_accounting_transaction.accounting_category_value);
    expect($('#accounting_account_id.option_selector.target').html()).toEqual(this.existing_accounting_transaction.accounting_account_value);
    expect($('input#note').val()).toEqual(this.existing_accounting_transaction.note);

    // update fields
    $('input#note').val(updated_note_value);

    $('#accounting_category_id.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Office Supplies)').mousedown()

    $('#accounting_account_id.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Business Checking)').mousedown()

    // submit and verify data sent to server
    this.server.respondWith("PUT", "/api/accounting_transactions/" + this.existing_accounting_transaction.id,
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
  }),

  it('can delete an existing accounting transaction', function() {
    // delete the transaction
    expect($('.accounting_transaction.' + this.existing_accounting_transaction.id)).toExist();

    // go to edit screen
    $('.accounting_transaction.' + this.existing_accounting_transaction.id + ' .edit').mousedown();

    // can delete the transaction
    this.server.respondWith("DELETE", "/api/accounting_transactions/" + this.existing_accounting_transaction.id,
                                    [204, { "Content-Type": "application/json" },
                                     '{}']);
    sinon.spy(jQuery, 'ajax');

    $('.delete').mousedown();

    this.server.respond();

    expect($('#accounting_transactions #' + this.existing_accounting_transaction_id)).not.toExist();

    expect($('#notices').html()).toEqual('Accounting Transaction deleted by server!');
  }),

  it('compiles and displays expected validation errors on the model form if submit is not valid', function() {
    var errors = '{"errors":{"date_time":["can\'t be blank"],"income_expense":["can\'t be blank"],"amount":["can\'t be blank"],"accounting_category_id":["can\'t be blank"],"accounting_account_id":["can\'t be blank"]}}';

    // send an empty create which will cause validation errors
    this.server.respondWith("POST", "/api/accounting_transactions",
                                    [422, { "Content-Type": "application/json" },
                                     errors]);
    sinon.spy(jQuery, 'ajax');

    // new accounting transaction form
    $('.new_accounting_transaction.expense').mousedown();

    // attempt to save empty form
    $('input.save').mousedown();

    // sends request to server
    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    expect(result.note).toEqual('');

    // shows expected validation errors
    this.server.respond();
    errors = JSON.parse(errors);
    for (attribute in errors) {
      messages = errors[attribute];
      for (_i = 0, _len = messages.length; _i < _len; _i++) {
        message = messages[_i];
        expect($('#notices:contains(' + value + ')')).toExist();
      }
    }

    // the modal form is still showing
    expect($('#accounting_transaction_new_edit')).toBeVisible();
  })


  describe('direct routing', function() {

    it('successfully routes to the new form for Income transaction', function() {
      Wavelineup.instance.routers.main.navigate('accounting_transactions/new/income', true);

      expect($('ul#accounting_transaction_new_edit')).toBeVisible();

      // this is on the layer under the modal layer
      expect($('.accounting_transaction.' + this.existing_accounting_transaction.id)).toExist();

      // modal layer
      expect($('#income_expense:contains(income)')).toBeVisible()
    }),

    it('successfully routes to the new form for Expense transaction', function() {
      Wavelineup.instance.routers.main.navigate('accounting_transactions/new/expense', true);

      expect($('ul#accounting_transaction_new_edit')).toBeVisible();

      // this is on the layer under the modal layer
      expect($('.accounting_transaction.' + this.existing_accounting_transaction.id)).toExist();

      // modal layer
      expect($('#income_expense:contains(expense)')).toBeVisible()
    }),

    it('successfully routes to the edit form', function() {
      Wavelineup.instance.routers.main.navigate('accounting_transactions/' + this.existing_accounting_transaction.id, true);

      expect($('ul#accounting_transaction_new_edit')).toBeVisible();
    }),

    it('successfully handles non-existant edit or slow loading collection temporary loading message', function() {
      // come in on new instance of app
      Backbone.history.stop();
      Wavelineup.init();
      Wavelineup.instance.collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();
      Wavelineup.instance.routers.main.navigate('accounting_transactions/' + this.existing_accounting_transaction.id, true);
      // note: no loading of collection via server.respond()
      expect($('#modal_content :contains(requested record does not exist or could not be loaded, or the current internet connection is slow)')).toExist();
    })

  });

  // this eventually should go into general error handling testing... perhaps!!!
  it('responds correctly to a 500 server error', function () {
    var $existing_accounting_transaction, updated_note_value = 'this is an updated note';
    $existing_accounting_transaction = $('.accounting_transaction.' + this.existing_accounting_transaction.id);

    // edit the transaction
    $($existing_accounting_transaction.find('.edit')).mousedown();

    // submit and verify data sent to server
    this.server.respondWith("PUT", "/api/accounting_transactions/" + this.existing_accounting_transaction.id,
                                    [500, { "Content-Type": "application/json" },
                                     'something bad']);

    $('.save').mousedown();

    this.server.respond();

    expect($('#notices').html()).toEqual('A fatal server error occurred.');
  });

  describe('pagination', function () {

// Wavelineup.instance.collections.accounting_transactions.fetch({data: {page_size: 15, page_number: 12}})

    it('shows the pagination Prev and Next buttons', function () {
expect('todo').toBeFalsy();
    }),

    it('shows pagination Next button if more records than what showing and are not on last page', function () {
expect('todo').toBeFalsy();
    }),

    it('shows pagination Prev if not on first page', function () {
expect('todo').toBeFalsy();
    })

  });
});
