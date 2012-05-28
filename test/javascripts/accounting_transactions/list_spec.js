describe('accounting transactions', function() {

  beforeEach(function() {
    this.server = sinon.fakeServer.create();

    setFixtures("<div id='container'>Loading...</div>");
    expect($('#container')).toHaveText('Loading...');

    Wavelineup.set_base_data = function() {
      Wavelineup.instance.collections.option_selectors = new Wavelineup.Collections.OptionSelectors();

      Wavelineup.instance.collections.option_selectors.reset(all_option_selectors);

      Wavelineup.instance.collections.option_selector_options = new Wavelineup.Collections.OptionSelectorOptions();
      Wavelineup.instance.collections.option_selector_options.reset(all_option_selector_options);

      Wavelineup.instance.collections.accounting_transactions = new Wavelineup.Collections.AccountingTransactions();

      var accounting_transactions = [];
      accounting_transactions.push(BackboneFactory.create('accounting_transaction', function(){return {invoice_id: 1}}));
      _.each([1,2,3,4], function(){
        accounting_transactions.push(BackboneFactory.create('accounting_transaction'));
      });
      var accounting_transactions = simulate_paginated_server_response(accounting_transactions);

      Wavelineup.instance.collections.accounting_transactions.reset(accounting_transactions);
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
  it('loads the index page with correct content showing all items in returned collection', function() {
    expect($('.new_accounting_transaction.expense')).toExist();
    expect($('.new_accounting_transaction.income')).toExist();

    expect($('#accounting_transactions')).toBeVisible();
    expect(Wavelineup.instance.collections.accounting_transactions.length).toEqual(5);

    _.each(Wavelineup.instance.collections.accounting_transactions.models, function(accounting_transaction) {
      $accounting_transaction = $('.accounting_transaction.' + accounting_transaction.get('id'));

      expect($accounting_transaction).toBeVisible();
      expect(($accounting_transaction).find('td:contains(' + accounting_transaction.get('accounting_category_value') + ')')).toBeVisible()
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
  })
});
