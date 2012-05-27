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
});
