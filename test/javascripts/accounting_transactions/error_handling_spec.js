describe('accounting transactions error handling', function() {

  beforeEach(function() {
// for some reason because this is the second time this initialize_app is called, getting error on uncommented
// will pass for the commented below though
// note that the error on creating factory where the association collection not in existance....
//  what does not make sense though is why works the first time... and why even when run other spec alone, somehow this code screws it up...

//NOTE... may want to revert and start over... look at git hist... this is too weird....
// init_app may never be hit, or if it is, it is always overridden by the before each of another test file...
// so the init_app may never have been working
/*
console.log(Wavelineup.instance.collections.option_selector_options)
    this.accounting_transaction = BackboneFactory.create('accounting_transaction');
    WavelineupTestSuite.data.base.accounting_transactions = [this.accounting_transaction];
    WavelineupTestSuite.initialize_app('accounting_transactions');

so what is going on is a dependency... the list spec is depending on the leftover data that is created (option selector options)
*/
    this.server = sinon.fakeServer.create();

    setFixtures("<div id='container'>Loading...</div>");
    expect($('#container')).toHaveText('Loading...');

    // set data that loads on app load via the main rails index
    Wavelineup.set_base_data = function() {
      Wavelineup.instance.collections.option_selectors = new Wavelineup.Collections.OptionSelectors();
      Wavelineup.instance.collections.option_selectors.reset(fixtures.option_selectors);

      Wavelineup.instance.collections.option_selector_options = new Wavelineup.Collections.OptionSelectorOptions();
      Wavelineup.instance.collections.option_selector_options.reset(fixtures.option_selector_options);

      var accounting_transactions = WavelineupTestSuite.simulate_paginated_server_response([BackboneFactory.create('accounting_transaction')]);
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
    WavelineupTestSuite.clean_up();
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
