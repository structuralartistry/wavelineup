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

      var accounting_transactions = simulate_paginated_server_response([BackboneFactory.create('accounting_transaction')]);
      Wavelineup.instance.collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();
      Wavelineup.instance.collections.accounting_transactions.reset(accounting_transactions);
    }

    // turn off the router
    if( (typeof Backbone.history == 'object') && (typeof Backbone.history.stop == 'function') ) Backbone.history.stop();

    Wavelineup.init();

    Wavelineup.instance.routers.main.navigate('accounting_transactions', true);
    current_url = Backbone.history.getHash();
    expect(current_url).toEqual('accounting_transactions')

    this.accounting_transaction = Wavelineup.instance.collections.accounting_transactions.models[0];
  }),

  afterEach(function() {
    this.server.restore();
    setFixtures('');
    if(typeof jQuery.ajax.restore == 'function') jQuery.ajax.restore();
  }),

  // this eventually should go into general error handling testing... perhaps!!!
  it('responds correctly to a 500 server error', function () {
    var $accounting_transaction, updated_note_value = 'this is an updated note';

    $accounting_transaction = $('.accounting_transaction.' + this.accounting_transaction.id);

    // edit the transaction
    $($accounting_transaction.find('.edit')).mousedown();

    // submit and verify data sent to server
    this.server.respondWith("PUT", "/api/accounting_transactions/" + this.accounting_transaction.id,
                                    [500, { "Content-Type": "application/json" },
                                     'something bad']);

    $('.save').mousedown();

    this.server.respond();

    expect($('#notices').html()).toEqual('A fatal server error occurred.');
  });
});
