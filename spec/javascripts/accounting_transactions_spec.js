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
    expect($(".accounting_transaction[data-id='new']")).toExist();

    // shows the single existing accounting transaction
    expect($('li[data-id=' + this.accounting_transaction.id + ']')).toExist();
  }),


  it('sends new Accounting Transaction entry to server', function() {
    accounting_transaction = fixtures.accounting_transactions.two;

    // new transaction should not already exist on page
    expect($('li[data-id=' + fixtures.accounting_transactions.two.id + ']')).not.toExist();

    // set values
    new_accounting_transaction = fixtures.accounting_transactions.two;
    accounting_transaction_context = ".accounting_transaction[data-id='new'] ";
    $(accounting_transaction_context + '#t_datetime').val(new_accounting_transaction.t_datetime);
    $(accounting_transaction_context + '#t_type_id').html(new_accounting_transaction.t_type_id);
    $(accounting_transaction_context + '#amount').val(new_accounting_transaction.amount);
    $(accounting_transaction_context + '#category_id').val(new_accounting_transaction.category_id);
    $(accounting_transaction_context + '#account_id').val(new_accounting_transaction.account_id);
    $(accounting_transaction_context + '#note').val(new_accounting_transaction.note);

    this.server.respondWith("POST", "/api/accounting_transactions",
                                    [201, { "Content-Type": "application/json" },
                                    JSON.stringify(fixtures.accounting_transactions.two)]);

    sinon.spy(jQuery, 'ajax');
    $(accounting_transaction_context + '#save').click();

    // sends request to server
    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    _.each(result, function(value,key) {
      expect(value).toEqual(accounting_transaction[key].toString());
    })

    // updates list
    this.server.respond();


    expect($('li[data-id=' + fixtures.accounting_transactions.two.id + ']')).toExist();

    // clears the entry form upon success
    accounting_transaction_context = ".accounting_transaction[data-id='new'] ";
    expect($(accounting_transaction_context + '#t_datetime').val()).toEqual('');
    expect($(accounting_transaction_context + '#t_type_id').html()).toEqual('');
    expect($(accounting_transaction_context + '#amount').val()).toEqual('');
    expect($(accounting_transaction_context + '#category_id').val()).toEqual('');
    expect($(accounting_transaction_context + '#account_id').val()).toEqual('');
    expect($(accounting_transaction_context + '#note').val()).toEqual('');

    jQuery.ajax.restore();
  }),


  it('can edit and delete an existing accounting transaction', function() {
    updated_note_value = 'this is an updated note';

    accounting_transaction_context = ".accounting_transaction[data-id='" + this.accounting_transaction.id + "'] ";

    expect($(accounting_transaction_context + "#note[value='" + updated_note_value + "']")).not.toExist();

    expect($(accounting_transaction_context)).toBeVisible();

    // verify initial form values
    expect($(accounting_transaction_context + '#t_datetime').val()).toEqual(this.accounting_transaction.t_datetime.toString());
    expect($(accounting_transaction_context + '#t_type_id').html()).toEqual(this.accounting_transaction.t_type_id.toString());
    expect($(accounting_transaction_context + '#amount').val()).toEqual(this.accounting_transaction.amount.toString());
    expect($(accounting_transaction_context + '#category_id').val()).toEqual(this.accounting_transaction.category_id.toString());
    expect($(accounting_transaction_context + '#account_id').val()).toEqual(this.accounting_transaction.account_id.toString());
    expect($(accounting_transaction_context + '#note').val()).toEqual(this.accounting_transaction.note.toString());

    // update a field
    $(accounting_transaction_context + '#note').val(updated_note_value);

    // submit and verify data sent to server
    this.server.respondWith("PUT", "/api/accounting_transactions/" + this.accounting_transaction.id,
                                    [204, { "Content-Type": "application/json" },
                                     '{}']);
    sinon.spy(jQuery, 'ajax');
    $(accounting_transaction_context + '#save').click();

    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    expect(result.note).toEqual(updated_note_value);

    this.server.respond();

    // field shows value
    expect($(accounting_transaction_context + "e[value='" + updated_note_value + "']")).not.toExist();

    expect($('#notices').html()).toEqual('Accounting Transaction updated by server!');

    // can delete the transaction
    this.server.respondWith("DELETE", "/api/accounting_transactions/" + this.accounting_transaction.id,
                                    [204, { "Content-Type": "application/json" },
                                     '{}']);
    $(accounting_transaction_context + ' #delete').click();

    this.server.respond();

    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    expect(result.id).toEqual(this.accounting_transaction.id);

    // section turns back to a line item with updated data correctly there
    expect($(accounting_transaction_context)).not.toExist();

    expect($('#notices').html()).toEqual('Accounting Transaction deleted by server!');

    jQuery.ajax.restore();
  }),


  it('should handle error responses', function() {
    // send an empty create which will cause validation errors
    this.server.respondWith("POST", "/api/accounting_transactions",
                                    [422, { "Content-Type": "application/json" },
                                     fixtures.accounting_transactions.errors]);
    sinon.spy(jQuery, 'ajax');

    accounting_transaction_context = ".accounting_transaction[data-id='new'] ";
    $(accounting_transaction_context + '#save').click();

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
