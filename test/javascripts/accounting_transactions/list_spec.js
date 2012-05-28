describe('accounting transactions', function() {

  beforeEach(function() {

// probably should create a safe, segmented test data info... factories right now going to global, should not...
// do Wavelineup.test_suite or something....
// and care for wavelineup_base_data variable among others




    var accounting_transactions = [];
    accounting_transactions.push(BackboneFactory.create('accounting_transaction', function(){return {invoice_id: 1}}));
    _.each([1,2,3,4], function(){
      accounting_transactions.push(BackboneFactory.create('accounting_transaction'));
    });
    accounting_transactions_base_data = accounting_transactions;

    factor_out_before_each();

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
    factor_out_after_each();

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
