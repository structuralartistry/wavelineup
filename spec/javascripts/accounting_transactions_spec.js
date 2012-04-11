// todo improvements
// - some sort of factory system for models/json to avoid entering hard data in respond with and forms, etc
// - abstration to fill in forms? (maybe later once implement selectors)
// - abstract groups of checks so that tests are more readable and understanding what getting at to an outsider
//     for example: expect(h.accounting_transactions.index_page_loaded()).toBeTruthy()
//                  see if can hold in same test suite perhaps???
// - dont use literal string for testing - create/parse json back and forth
describe('accounting transactions', function() {

  beforeEach(function() {
    setFixtures("<div id='container'>Loading...</div>");
    expect($('#container')).toHaveText('Loading...');
    expect($('form')).not.toExist();
    this.server = sinon.fakeServer.create();

    this.accounting_transaction_initial_seed = fixtures.accounting_transactions.one;
    this.server.respondWith("GET", "/api/accounting_transactions",
                                    [200, { "Content-Type": "application/json" },
                                    JSON.stringify(this.accounting_transaction_initial_seed)]);

    Wavelineup.init();

    this.server.respond();
  }),

  afterEach(function() {
    this.server.restore();
  }),

  it('loads the index page with correct content', function() {
    expect($('#container h1')).toHaveText('Hello World Index View from Backbone!!!');
    expect($('li:contains(' + fixtures.accounting_transactions.one['note'] + ')')).toExist();
    expect($('form')).toExist();
  }),

  it('sends new Accounting Transaction entry to server', function() {
    accounting_transaction = fixtures.accounting_transactions.two;

    expect($('li:contains(' + fixtures.accounting_transactions.two['note'] + ')')).not.toExist();

    // verify form values
    _.each(fixtures.accounting_transactions.two, function(value,key) {
      $('#accounting_transaction_' + key).val(value);
    });

    this.server.respondWith("POST", "/api/accounting_transactions",
                                    [201, { "Content-Type": "application/json" },
                                    JSON.stringify(fixtures.accounting_transactions.two)]);

    sinon.spy(jQuery, 'ajax');
    $('#accounting_transaction_save').click();

    // sends request to server
    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    _.each(result, function(value,key) {
      expect(value).toEqual(accounting_transaction[key].toString());
    })

    // updates list
    this.server.respond();

    expect($('li:contains(' + fixtures.accounting_transactions.two['note'] + ')')).toExist();

    // clears the entry form upon success
    _.each(fixtures.accounting_transactions.attributes, function(attribute) {
      expect($('#accounting_transaction_' + attribute).val()).toEqual('');
    });

    jQuery.ajax.restore();
  }),

  it('can edit and delete an existing accounting transaction', function() {
    accounting_transaction_wrapper = ".accounting_transaction_wrapper[data-id='" + this.accounting_transaction_initial_seed.id + "']";
    expect($(accounting_transaction_wrapper + ' li:contains(this is an updated note)')).not.toExist();

    expect($(accounting_transaction_wrapper + ' .detail')).toBeVisible();
    expect($(accounting_transaction_wrapper + ' div.edit form')).not.toBeVisible();
    expect($('#new_accounting_transaction')).toBeVisible();

    $(accounting_transaction_wrapper + ' .detail .edit').click();

    // hides new transaction
    expect($('#new_accounting_transaction')).not.toBeVisible();

    // shows edit form in place of the detail
    expect($(accounting_transaction_wrapper + ' .detail')).not.toBeVisible();
    expect($(accounting_transaction_wrapper + ' .edit')).toBeVisible();

    // verify initial form values
    _.each(this.accounting_transaction_initial_seed, function(value,key) {
      if(fixtures.accounting_transactions.attributes.indexOf(key) != -1) {
        expect($(accounting_transaction_wrapper + ' .edit form #accounting_transaction_' + key).val()).toEqual(value.toString());
      }
    });

    // update a field
    this.accounting_transaction_initial_seed.note = 'this is an updated note';
    $(accounting_transaction_wrapper + ' .edit form #accounting_transaction_note').val(this.accounting_transaction_initial_seed.note);

    // submit and verify data sent to server
    this.server.respondWith("PUT", "/api/accounting_transactions/" + this.accounting_transaction_initial_seed.id,
                                    [204, { "Content-Type": "application/json" },
                                     '{}']);
    sinon.spy(jQuery, 'ajax');
    $(accounting_transaction_wrapper + ' .edit form #accounting_transaction_save').click();


    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    expect(result.note).toEqual(this.accounting_transaction_initial_seed.note);

    this.server.respond();

    // section turns back to a line item with updated data correctly there
    expect($(accounting_transaction_wrapper + ' .detail:contains(this is an updated note)').length).toEqual(1);

    expect($('#notices').html()).toEqual('Accounting Transaction updated by server!');


    // can delete the transaction
    this.server.respondWith("DELETE", "/api/accounting_transactions/" + this.accounting_transaction_initial_seed.id,
                                    [204, { "Content-Type": "application/json" },
                                     '{}']);
    $(accounting_transaction_wrapper + ' .delete').click();

    this.server.respond();

    result = JSON.parse(jQuery.ajax.getCall(0).args[0].data);
    expect(result.id).toEqual(this.accounting_transaction_initial_seed.id);
    expect(result.note).toEqual(this.accounting_transaction_initial_seed.note);

    // section turns back to a line item with updated data correctly there
    expect($(accounting_transaction_wrapper)).not.toExist();

    expect($('#notices').html()).toEqual('Accounting Transaction deleted by server!');

    jQuery.ajax.restore();
  }),

  it('should handle error responses', function() {
    // send an empty create which will cause validation errors
    this.server.respondWith("POST", "/api/accounting_transactions",
                                    [422, { "Content-Type": "application/json" },
                                     fixtures.accounting_transactions.errors]);
    sinon.spy(jQuery, 'ajax');
    $('#accounting_transaction_save').click();

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
