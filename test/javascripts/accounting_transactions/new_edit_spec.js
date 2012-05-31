describe('accounting transactions', function() {

  beforeEach(function() {
    this.existing_accounting_transaction = WavelineupTestSuite.factory_data.create_accounting_transaction();

    WavelineupTestSuite.data.base.accounting_transactions = [this.existing_accounting_transaction];

    WavelineupTestSuite.initialize_app({url: 'accounting_transactions'});
  }),

  afterEach(function() {
    WavelineupTestSuite.clean_up();
  }),

  it('shows and creates new Expense transaction modal if New Expense is clicked', function () {
    var new_accounting_transaction = WavelineupTestSuite.factory_data.create_accounting_transaction({income_expense: 'expense'});

    $('.new_accounting_transaction.expense').mousedown();

    expect($('#accounting_transaction_new_edit')).toBeVisible();

    current_url = Backbone.history.getHash();
    expect(current_url).toEqual('accounting_transactions/new/expense')

    // the Category selector is for expenses
    expect($('#accounting_category_id.option_selector.target').data('option_selector_name')).toEqual('accounting_category_expense');

    // set standard form values (these will go away as implement selectors)
    $('input#date_time').val(new_accounting_transaction.date_time);
    $('input#amount').val(new_accounting_transaction.amount);
    $('input#note').val(new_accounting_transaction.note);

    // selector fields

    // category
    $('#accounting_category_id.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Office Supplies)').mousedown()

    // account
    $('#accounting_account_id.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Business Checking)').mousedown()

    WavelineupTestSuite.server.respondWith("POST", "/api/accounting_transactions",
                                    [201, { "Content-Type": "application/json" },
                                    JSON.stringify(new_accounting_transaction)]);

    sinon.spy(jQuery, 'ajax');
    $('input.save').mousedown();

    // sends request to server
    WavelineupTestSuite.server.respond();
    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);

    // spot check... values are fudged so no need to verify all
    expect(result['income_expense']).toEqual('expense');

    // index view should be visible with newly created transaction
    expect($('#notices').html()).toEqual('Accounting Transaction accepted by server!');

    expect($('.accounting_transaction.' + new_accounting_transaction.id)).toExist();
    expect($('.accounting_transaction.' + new_accounting_transaction.id + ':contains(expense)')).toExist();
  }),

  it('shows and creates new Income transaction modal if New Income is clicked', function () {
    var new_accounting_transaction = WavelineupTestSuite.factory_data.create_accounting_transaction({income_expense: 'income'});

    $('.new_accounting_transaction.income').mousedown();

    expect($('#accounting_transaction_new_edit')).toBeVisible();

    current_url = Backbone.history.getHash();
    expect(current_url).toEqual('accounting_transactions/new/income')

    // the Category selector is for expenses
    expect($('#accounting_category_id.option_selector.target').data('option_selector_name')).toEqual('accounting_category_income');

    // set standard form values (these will go away as implement selectors)
    $('input#date_time').val(new_accounting_transaction.date_time);
    $('input#amount').val(new_accounting_transaction.amount);
    $('input#note').val(new_accounting_transaction.note);

    // selector fields

    // category
    $('#accounting_category_id.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Cash Payment)').mousedown()

    // account
    $('#accounting_account_id.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Business Checking)').mousedown()

    WavelineupTestSuite.server.respondWith("POST", "/api/accounting_transactions",
                                    [201, { "Content-Type": "application/json" },
                                    JSON.stringify(new_accounting_transaction)]);

    sinon.spy(jQuery, 'ajax');
    $('input.save').mousedown();

    // sends request to server
    WavelineupTestSuite.server.respond();
    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);

    // spot check... values are fudged so no need to verify all
    expect(result['income_expense']).toEqual('income');

    // index view should be visible with newly created transaction
    expect($('#notices').html()).toEqual('Accounting Transaction accepted by server!');

    expect($('.accounting_transaction.' + new_accounting_transaction.id)).toExist();
    expect($('.accounting_transaction.' + new_accounting_transaction.id + ':contains(income)')).toExist();
  }),

  it('can edit an existing accounting transaction', function() {
    var $existing_accounting_transaction, updated_note_value = 'this is an updated note';

    // verify existing accounting transaction row
    $existing_accounting_transaction = $('.accounting_transaction.' + this.existing_accounting_transaction.get('id'));

    expect($existing_accounting_transaction).toExist();

    expect($existing_accounting_transaction.find('#note').val()).not.toEqual(updated_note_value);

    // edit the transaction
    $($existing_accounting_transaction.find('.edit')).mousedown();

    // verify initial form values
    expect($('input#date_time').val()).toEqual(this.existing_accounting_transaction.get('date_time'));

    expect($('#income_expense').html()).toEqual(this.existing_accounting_transaction.get('income_expense'));
    expect($('input#amount').val()).toEqual(this.existing_accounting_transaction.get('amount').toString());
    expect($('#accounting_category_id.option_selector.target').html()).toEqual(this.existing_accounting_transaction.get('accounting_category_value'));
    expect($('#accounting_account_id.option_selector.target').html()).toEqual(this.existing_accounting_transaction.get('accounting_account_value'));
    expect($('input#note').val()).toEqual(this.existing_accounting_transaction.get('note'));

    // update fields
    $('input#note').val(updated_note_value);

    $('#accounting_category_id.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Office Supplies)').mousedown()

    $('#accounting_account_id.option_selector.target').mousedown();
    $('#option_selector_container .option_selector.option:contains(Business Checking)').mousedown()

    // submit and verify data sent to server
    WavelineupTestSuite.server.respondWith("PUT", "/api/accounting_transactions/" + this.existing_accounting_transaction.get('id'),
                                    [204, { "Content-Type": "application/json" },
                                     '{}']);
    sinon.spy(jQuery, 'ajax');

    $('.save').mousedown();

    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    expect(result.note).toEqual(updated_note_value);

    WavelineupTestSuite.server.respond();

    // verify field shows value
    expect($('#accounting_transactions').find('td:contains(' + updated_note_value + ')')).toExist();
    expect($('#notices').html()).toEqual('Accounting Transaction updated by server!');
  }),

  it('can delete an existing accounting transaction', function() {
    var existing_accounting_transaction_id = this.existing_accounting_transaction.get('id');
    // delete the transaction
    expect($('.accounting_transaction.' + existing_accounting_transaction_id)).toExist();

    // go to edit screen
    $('.accounting_transaction.' + existing_accounting_transaction_id + ' .edit').mousedown();

    // can delete the transaction
    WavelineupTestSuite.server.respondWith("DELETE", "/api/accounting_transactions/" + existing_accounting_transaction_id,
                                    [204, { "Content-Type": "application/json" },
                                     '{}']);
    sinon.spy(jQuery, 'ajax');

    $('.delete').mousedown();

    WavelineupTestSuite.server.respond();

    expect($('#accounting_transactions #' + existing_accounting_transaction_id)).not.toExist();

    expect($('#notices').html()).toEqual('Accounting Transaction deleted by server!');
  }),

  it('compiles and displays expected validation errors on the model form if submit is not valid', function() {
    var errors = '{"errors":{"date_time":["can\'t be blank"],"income_expense":["can\'t be blank"],"amount":["can\'t be blank"],"accounting_category_id":["can\'t be blank"],"accounting_account_id":["can\'t be blank"]}}';

    // send an empty create which will cause validation errors
    WavelineupTestSuite.server.respondWith("POST", "/api/accounting_transactions",
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
    WavelineupTestSuite.server.respond();
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
});
