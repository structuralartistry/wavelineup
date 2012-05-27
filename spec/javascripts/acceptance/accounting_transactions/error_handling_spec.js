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
      var accounting_transactions_json = fixtures.accounting_transactions;
      Wavelineup.instance.collections.accounting_transactions.reset(accounting_transactions_json.records);
      Wavelineup.instance.collections.accounting_transactions.total_record_count = accounting_transactions_json.total_record_count;
      Wavelineup.instance.collections.accounting_transactions.page_size = accounting_transactions_json.page_size;
      Wavelineup.instance.collections.accounting_transactions.page_numbeer = accounting_transactions_json.page_number;
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
});
