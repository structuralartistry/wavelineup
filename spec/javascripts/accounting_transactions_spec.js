describe('accounting transactions', function() {

  beforeEach(function() {
    setFixtures("<div id='container'>Loading...</div>");
    expect($('#container')).toHaveText('Loading...');
    expect($('form')).not.toExist();
    this.server = sinon.fakeServer.create();

    this.accounting_transaction = fixtures.accounting_transactions.one;
    this.server.respondWith("GET", "/api/accounting_transactions",
                                    [200, { "Content-Type": "application/json" },
                                    JSON.stringify(this.accounting_transaction)]);

    Wavelineup.init();

    this.server.respond();
  }),


  afterEach(function() {
    this.server.restore();
  }),


  it('loads the index page with correct content', function() {
    expect($('#container h1')).toHaveText('Hello World Index View from Backbone!!!');

    // has the new accounting transaction form
    expect($('#accounting_transaction__new')).toExist();

    // shows the single existing accounting transaction
    expect($('#accounting_transaction__' + this.accounting_transaction.id)).toExist();
  }),


  it('creates a new Accounting Transaction', function() {
    accounting_transaction = fixtures.accounting_transactions.two;

    // new transaction should not already exist on page
    expect($('#accounting_transaction__' + fixtures.accounting_transactions.two.id)).not.toExist();

    // set standard form values (these will go away as implement selectors)
    new_accounting_transaction = fixtures.accounting_transactions.two;
    $('#accounting_transaction__date_time__new').val(new_accounting_transaction.date_time);
    //$('#accounting_transaction__credit_debit_id__new').html(new_accounting_transaction.credit_debit_id);
    $('#accounting_transaction__amount__new').val(new_accounting_transaction.amount);
    $('#accounting_transaction__category_id__new').val(new_accounting_transaction.category_id);
    $('#accounting_transaction__account_id__new').val(new_accounting_transaction.account_id);
    $('#accounting_transaction__note__new').val(new_accounting_transaction.note);

    // set the credit/debit type using selector cell
    // note: running selector through paces... this will be refactored out at some point
    expect($('#accounting_transaction__credit_debit_id__new').html()).toEqual('');
    expect($('#a_selector')).not.toBeVisible();

    $('#accounting_transaction__credit_debit_id__new').mousedown();
    expect($('#a_selector')).toBeVisible();
    $('#a_selector #button_one').mousedown();
    expect($('#a_selector')).not.toBeVisible();
    expect($('#accounting_transaction__credit_debit_id__new').html()).toEqual('1');

    $('#accounting_transaction__credit_debit_id__new').mousedown();
    expect($('#a_selector')).toBeVisible();
    $('#a_selector #button_two').mousedown();
    expect($('#a_selector')).not.toBeVisible();
    expect($('#accounting_transaction__credit_debit_id__new').html()).toEqual('2');
    // set this value manually for now... since using fixture... kind of gross but so server returns right value expected
    new_accounting_transaction.credit_debit_id = '2'

    created_accounting_transaction = fixtures.accounting_transactions.two;
    this.server.respondWith("POST", "/api/accounting_transactions",
                                    [201, { "Content-Type": "application/json" },
                                    JSON.stringify(created_accounting_transaction)]);

    sinon.spy(jQuery, 'ajax');
    $('#accounting_transaction__save__new').click();

    // sends request to server
    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    _.each(result, function(value,key) {
      expect(value).toEqual(accounting_transaction[key].toString());
    })

    // updates list
    this.server.respond();


    expect($('#accounting_transaction__' + created_accounting_transaction.id)).toExist();

    // clears the entry form upon success
    expect($('#accounting_transaction__date_time__new').val()).toEqual('');
    expect($('#accounting_transaction__credit_debit_id__new').html()).toEqual('');
    expect($('#accounting_transaction__amount__new').val()).toEqual('');
    expect($('#accounting_transaction__category_id__new').val()).toEqual('');
    expect($('#accounting_transaction__account_id__new').val()).toEqual('');
    expect($('#accounting_transaction__note__new').val()).toEqual('');

    jQuery.ajax.restore();
  }),


  it('can edit and delete an existing accounting transaction', function() {
    updated_note_value = 'this is an updated note';

    accounting_transaction_id = this.accounting_transaction.id

    expect($('#accounting_transaction__note__' + accounting_transaction_id).val()).not.toEqual(updated_note_value);

    // verify initial form values
    expect($('#accounting_transaction__date_time__' + accounting_transaction_id).val()).toEqual(this.accounting_transaction.date_time.toString());
    expect($('#accounting_transaction__credit_debit_id__' + accounting_transaction_id).html()).toEqual(this.accounting_transaction.credit_debit_id.toString());
    expect($('#accounting_transaction__amount__' + accounting_transaction_id).val()).toEqual(this.accounting_transaction.amount.toString());
    expect($('#accounting_transaction__category_id__' + accounting_transaction_id).val()).toEqual(this.accounting_transaction.category_id.toString());
    expect($('#accounting_transaction__account_id__' + accounting_transaction_id).val()).toEqual(this.accounting_transaction.account_id.toString());
    expect($('#accounting_transaction__note__' + accounting_transaction_id).val()).toEqual(this.accounting_transaction.note.toString());

    // update a field
    $('#accounting_transaction__note__' + accounting_transaction_id).val(updated_note_value);

    // update the credit/debit type using selector cell
    // note: running selector through paces... this will be refactored out at some point
    expect($('#a_selector')).not.toBeVisible();

    $('#accounting_transaction__credit_debit_id__' + accounting_transaction_id).mousedown();
    expect($('#a_selector')).toBeVisible();
    $('#a_selector #button_one').mousedown();
    expect($('#a_selector')).not.toBeVisible();
    expect($('#accounting_transaction__credit_debit_id__' + accounting_transaction_id).html()).toEqual('1');

    $('#accounting_transaction__credit_debit_id__' + accounting_transaction_id).mousedown();
    expect($('#a_selector')).toBeVisible();
    $('#a_selector #button_two').mousedown();
    expect($('#a_selector')).not.toBeVisible();
    expect($('#accounting_transaction__credit_debit_id__' + accounting_transaction_id).html()).toEqual('2');
    // set this value manually for now... since using fixture... kind of gross but so server returns right value expected
    this.accounting_transaction.credit_debit_id = '2'

    // submit and verify data sent to server
    this.server.respondWith("PUT", "/api/accounting_transactions/" + this.accounting_transaction.id,
                                    [204, { "Content-Type": "application/json" },
                                     '{}']);
    sinon.spy(jQuery, 'ajax');

    $('#accounting_transaction__' + accounting_transaction_id + ' .accounting_transaction__save').click();

    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    expect(result.credit_debit_id).toEqual('2');
    expect(result.note).toEqual(updated_note_value);

    this.server.respond();

    // field shows value
    expect($('#accounting_transaction__credit_debit_id__' + accounting_transaction_id).html()).toEqual('2');
    expect($('#accounting_transaction__note__' + accounting_transaction_id)).toExist();

    expect($('#notices').html()).toEqual('Accounting Transaction updated by server!');

    // can delete the transaction
    this.server.respondWith("DELETE", "/api/accounting_transactions/" + this.accounting_transaction.id,
                                    [204, { "Content-Type": "application/json" },
                                     '{}']);
    $('.accounting_transaction__delete').click();

    this.server.respond();

    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    expect(result.id).toEqual(this.accounting_transaction.id);

    expect($('#accounting_transaction__' + accounting_transaction_id)).not.toExist();

    expect($('#notices').html()).toEqual('Accounting Transaction deleted by server!');

    jQuery.ajax.restore();
  }),


  it('should handle error responses', function() {
    // send an empty create which will cause validation errors
    this.server.respondWith("POST", "/api/accounting_transactions",
                                    [422, { "Content-Type": "application/json" },
                                     fixtures.accounting_transactions.errors]);
    sinon.spy(jQuery, 'ajax');

    $('#accounting_transaction__save__new').click();

    // sends request to server
    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    _.each(result, function(value,key) {
      expect(value).toEqual('');
    })

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

    jQuery.ajax.restore();
  })


});
